const { Framework } = require("@superfluid-finance/sdk-core")
const { expect } = require("chai")
const { ethers } = require("hardhat")

const { deployFramework, deployWrapperSuperToken } = require("./util/deploy-sf")

let contractsFramework
let sf
let sobr
let sobrx
let owner
let account1
let account2
let sobrFlow

const tenKEther = ethers.utils.parseEther("10000")

before(async function () {
    //get accounts from hardhat
    [owner, account1, account2] = await ethers.getSigners()

    //deploy the framework
    contractsFramework = await deployFramework(owner)

    const tokenPair = await deployWrapperSuperToken(
        owner,
        contractsFramework.superTokenFactory,
        "SOBR",
        "SOBR"
    )

    sobr = tokenPair.underlyingToken
    sobrx = tokenPair.superToken

    // initialize the superfluid framework...put custom and web3 only bc we are using hardhat locally
    sf = await Framework.create({
        chainId: 31337,
        provider: owner.provider,
        resolverAddress: contractsFramework.resolver, //this is how you get the resolver address
        protocolReleaseVersion: "test"
    })

    let SobrFlow = await ethers.getContractFactory("SobrFlow", owner)

    sobrFlow = await SobrFlow.deploy(
        sf.settings.config.hostAddress,
        owner.address
    )
    await sobrFlow.deployed()
})

beforeEach(async function () {
    await sobr.mint(owner.address, tenKEther)

    await sobr.mint(account1.address, tenKEther)

    await sobr.mint(account2.address, tenKEther)

    await sobr.connect(owner).approve(sobrx.address, tenKEther)
    await sobr.connect(account1).approve(sobrx.address, tenKEther)
    await sobr.connect(account2).approve(sobrx.address, tenKEther)

    await sobrx.upgrade(tenKEther)
    await sobrx.connect(account1).upgrade(tenKEther)
    await sobrx.connect(account2).upgrade(tenKEther)
})

describe("SOBR Flow", function () {
    it("Access Control #1 - Should deploy properly with the correct owner", async function () {
        expect(await sobrFlow.owner()).to.equal(owner.address)
    })
    it("Access Control #2 - Should allow you to add account to account list", async function () {
        await sobrFlow.allowAccount(account1.address)

        expect(await sobrFlow.accountList(account1.address), true)
    })
    it("Access Control #3 - Should allow for removing accounts from whitelist", async function () {
        await sobrFlow.removeAccount(account1.address)

        expect(await sobrFlow.accountList(account1.address), true)
    })
    it("Access Control #4 - Should allow for change in ownership", async function () {
        await sobrFlow.changeOwner(account1.address)

        expect(await sobrFlow.owner(), account1.address)
    })
    it("Contract Receives Funds #1 - lump sum is transferred to contract", async function () {
        //transfer ownership back to real owner...
        await sobrFlow.connect(account1).changeOwner(owner.address)

        await sobrx.approve(sobrFlow.address, ethers.utils.parseEther("100"))
        await sobrFlow.sendLumpSumToContract(
            sobrx.address,
            ethers.utils.parseEther("100")
        )

        let contractDAIxBalance = await sobrx.balanceOf(sobrFlow.address)
        expect(contractDAIxBalance, ethers.utils.parseEther("100"))
    })
    it("Contract Receives Funds #2 - a flow is created into the contract", async function () {
        let authorizeContractOperation = sf.cfaV1.updateFlowOperatorPermissions(
            {
                superToken: sobrx.address,
                flowOperator: sobrFlow.address,
                permissions: "7", //full control
                flowRateAllowance: "1000000000000000" // ~2500 per month
            }
        )
        await authorizeContractOperation.exec(owner)

        await sobrFlow.createFlowIntoContract(
            sobrx.address,
            "100000000000000"
        ) //about 250 sobrx per month

        let ownerContractFlowRate = await sf.cfaV1.getFlow({
            superToken: sobrx.address,
            sender: owner.address,
            receiver: sobrFlow.address,
            providerOrSigner: owner
        })

        expect(ownerContractFlowRate, "100000000000000")
    })
    it("Contract recieves funds #3 - a flow into the contract is updated", async function () {
        await sobrFlow.updateFlowIntoContract(
            sobrx.address,
            "200000000000000"
        ) // about 250 sobrx per month

        let ownerContractFlowRate = await sf.cfaV1.getFlow({
            superToken: sobrx.address,
            sender: owner.address,
            receiver: sobrFlow.address,
            providerOrSigner: owner
        })

        expect(ownerContractFlowRate, "200000000000000")
    })
    it("Contract receives funds #4 - a flow into the contract is deleted", async function () {
        await sobrFlow.deleteFlowIntoContract(sobrx.address)

        let ownerContractFlowRate = await sf.cfaV1.getFlow({
            superToken: sobrx.address,
            sender: owner.address,
            receiver: sobrFlow.address,
            providerOrSigner: owner
        })

        expect(ownerContractFlowRate, "0")
    })
    it("Contract sends funds #1 - withdrawing a lump sum from the contract", async function () {
        let contractStartingBalance = await sobrx.balanceOf(sobrFlow.address)

        await sobrFlow.withdrawFunds(
            sobrx.address,
            ethers.utils.parseEther("10")
        )

        let contractFinishingBalance = await sobrx.balanceOf(sobrFlow.address)

        expect(Number(contractStartingBalance) - 10, contractFinishingBalance)
    })

    it("Contract sends funds #2 - creating a flow from the contract", async function () {
        await sobrFlow.createFlowFromContract(
            sobrx.address,
            account1.address,
            "100000000000000"
        ) //about 250 per month

        let receiverContractFlowRate = await sf.cfaV1.getFlow({
            superToken: sobrx.address,
            sender: account1.address,
            receiver: sobrFlow.address,
            providerOrSigner: owner
        })

        expect(receiverContractFlowRate, "100000000000000")
    })
    it("Contract sends funds #3 - updating a flow from the contract", async function () {
        await sobrFlow.updateFlowFromContract(
            sobrx.address,
            account1.address,
            "200000000000000"
        ) //about 500 per month

        let receiverContractFlowRate = await sf.cfaV1.getFlow({
            superToken: sobrx.address,
            sender: account1.address,
            receiver: sobrFlow.address,
            providerOrSigner: owner
        })

        expect(receiverContractFlowRate, "200000000000000")
    })
    it("Contract sends funds #3 - deleting a flow from the contract", async function () {
        await sobrFlow.deleteFlowFromContract(sobrx.address, account1.address) //about 500 per month

        let receiverContractFlowRate = await sf.cfaV1.getFlow({
            superToken: sobrx.address,
            sender: account1.address,
            receiver: sobrFlow.address,
            providerOrSigner: owner
        })

        expect(receiverContractFlowRate, "0")
    })
})
