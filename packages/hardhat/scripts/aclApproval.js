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
//4) Make sure that you change the params in the aclApproval operation to reflect the proper values
//3) run: npx hardhat run scripts/aclApproval.js --network MUMBAI
async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    //NOTE - make sure you add the address of the previously deployed SOBR flow contract on your network
    const sobrFlowAddress = ""

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

    //approve contract to spend 1000 daix
    const aclApproval = sf.cfaV1.updateFlowOperatorPermissions({
        flowOperator: sobrFlow.address,
        superToken: daix.address,
        flowRateAllowance: "3858024691358024", //10k tokens per month in flowRateAllowanace
        permissions: 7 //NOTE: this allows for full create, update, and delete permissions. Change this if you want more granular permissioning
    })
    await aclApproval.exec(signers[0]).then(function (tx) {
        console.log(`
        Congrats! You've just successfully made the SOBR flow contract a flow operator.
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
