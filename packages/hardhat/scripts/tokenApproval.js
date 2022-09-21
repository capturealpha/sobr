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
//4) Make sure that you change the 'amount' field in the sobrFlowApproval operation to reflect the proper amount
//3) run: npx hardhat run scripts/tokenApproval.js --network MUMBAI
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

    const SobrFlow = new ethers.Contract(
        sobrFlowAddress,
        SobrFlowABI,
        provider
    )

    const daix = await sf.loadSuperToken("fDAIx")

    //approve contract to spend 1000 daix
    const sobrFlowApproval = daix.approve({
        receiver: SobrFlow.address,
        amount: ethers.utils.parseEther("1000")
    })

    await sobrFlowApproval.exec(signers[0]).then(function (tx) {
        console.log(`
        Congrats! You've just successfully approved the SOBR flow contract.
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
