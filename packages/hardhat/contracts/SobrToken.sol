//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract SobrToken is ERC20 {
    uint constant _initial_supply = 1000000000 * (10**18);

    constructor() ERC20("SobrToken", "SOBR") {
        _mint(msg.sender, _initial_supply);
    }
}