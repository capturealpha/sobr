const hre = require("hardhat")
const { Framework } = require("@superfluid-finance/sdk-core")
const { ethers } = require("hardhat")
require("dotenv").config()
const SobrFlowABI =
    require("../artifacts/contracts/SobrFlow.sol/SobrFlow.json").abi

//to run this script:
//1) Make sure you've created your own .env file
//2) Make sure that you have your network and accounts specified in hardhat.config.js
//3) Make sure that you add the address of your own SOBR flow contract
//4) Make sure that you change the params in the deleteFlowFromContract function to reflect the proper values
//3) run: npx hardhat run scripts/deleteFlowFromContract.js --network MUMBAI
async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    //NOTE - make sure you add the address of the previously deployed SOBR flow contract on your network
    const sobrFlowAddress = ""
    //add the address of your intended receiver
    const receiver = ""

    const provider = new hre.ethers.providers.JsonRpcProvider(
        process.env.MUMBAI_URL
    )

    const sf = await Framework.create({
        chainId: (await provider.getNetwork()).chainId,
        provider
    })

    const signers = await hre.ethers.getSigners()

    const sobrFlow = new ethers.Contract(
        sobrFlowAddress,
        SobrFlowABI,
        provider
    )

    const daix = await sf.loadSuperToken("fDAIx")

    //call SOBR flow create flow into contract method from signers[0]
    //this flow rate is ~1000 tokens/month
    await sobrFlow
        .connect(signers[0])
        .deleteFlowFromContract(daix.address, receiver)
        .then(function (tx) {
            console.log(`
        Congrats! You just successfully deleted a flow from the SOBR flow contract.
        Tx Hash: ${tx.hash}
    `)
        })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
