// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ShivraiToken is ERC20, Ownable {
    uint public maxAmount = 50000 * 10 ** 18;
    uint public coolDown = 24 hours;
    struct User {
        uint amount;
        uint lastMintTime;
    }
    mapping(address => User) public userMapping;
    constructor() ERC20("ShivraiToken", "MRAJ") Ownable(msg.sender) {
        // no pre-supply minting
    }
    function faucetMint(address userAddress, uint amount) external {
        User memory user = userMapping[userAddress];
        require(
            block.timestamp > user.lastMintTime + coolDown,
            "You can't mine any tokens for now"
        );
        require(
            user.amount < maxAmount,
            "user has exceeded the Limit for the maximum amount"
        );
        _mint(userAddress, amount * 10 ** decimals());
        user.amount += amount;
        user.lastMintTime = block.timestamp;
    }
}
