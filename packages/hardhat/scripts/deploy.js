const hre = require("hardhat")
const { Framework } = require("@superfluid-finance/sdk-core")
require("dotenv").config()


const provider = new hre.ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
)

async function deploySobrToken() {
    if(process.env.ERC20_TOKEN_ADDRESS) {
        return process.env.ERC20_TOKEN_ADDRESS;
    }
    const SobrToken = await hre.ethers.getContractFactory("SobrToken");
    const sobrToken = await SobrToken.deploy();
    await sobrToken.deployed()
    console.log("SOBR ERC-20 token deployed to:", sobrToken.address)
    return sobrToken
}

//to run this script:
//1) Make sure you've created your own .env file
//2) Make sure that you have your network specified in hardhat.config.js
//3) run: npx hardhat run scripts/deploy.js --network MUMBAI
async function main() {
    sobrTokenAddress = deploySobrToken()

    const sf = await Framework.create({
        chainId: (await provider.getNetwork()).chainId,
        provider
    })

    const signers = await hre.ethers.getSigners()
    // We get the contract to deploy
    const SobrFlow = await hre.ethers.getContractFactory("SobrFlow")
    //deploy the SOBR flow account using the proper host address and the address of the first signer
    const sobrFlow = await SobrFlow.deploy(
        sf.settings.config.hostAddress,
        signers[0].address
    )

    await sobrFlow.deployed()

    console.log("sobrFlow deployed to:", sobrFlow.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
