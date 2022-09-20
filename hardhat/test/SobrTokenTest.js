const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Token contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("SobrToken");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const sobrToken = await Token.deploy();

    await sobrToken.deployed();

    return { Token, sobrToken, owner, addr1, addr2 };
  }

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    it("Should assign the total supply of tokens to the owner", async function () {
      const { sobrToken, owner } = await loadFixture(deployTokenFixture);
      const ownerBalance = await sobrToken.balanceOf(owner.address);
      expect(await sobrToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { sobrToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      // Transfer 50 tokens from owner to addr1
      await expect(
        sobrToken.transfer(addr1.address, 50)
      ).to.changeTokenBalances(sobrToken, [owner, addr1], [-50, 50]);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await expect(
        sobrToken.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(sobrToken, [addr1, addr2], [-50, 50]);
    });

    it("should emit Transfer events", async function () {
      const { sobrToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      // Transfer 50 tokens from owner to addr1
      await expect(sobrToken.transfer(addr1.address, 50))
        .to.emit(sobrToken, "Transfer")
        .withArgs(owner.address, addr1.address, 50);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await expect(sobrToken.connect(addr1).transfer(addr2.address, 50))
        .to.emit(sobrToken, "Transfer")
        .withArgs(addr1.address, addr2.address, 50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { sobrToken, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      const initialOwnerBalance = await sobrToken.balanceOf(owner.address);

      // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        sobrToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Owner balance shouldn't have changed.
      expect(await sobrToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});
