// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ShivraiToken is ERC20, Ownable {
    constructor() ERC20("ShivraiToken", "Shivrai") Ownable(msg.sender) {
        // no pre-supply minting
    }
}
