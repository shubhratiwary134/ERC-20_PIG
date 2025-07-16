// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract ShivraiToken is ERC20, Ownable {
    uint public constant TOTAL_SUPPLY_CAP = 2_000_000 * 10 ** 18;
    uint public COOLDOWN = 24 hours;
    uint public MAX_AMOUNT_PER_USER = 20000 * 10 ** 18;
    struct User {
        uint amount;
        uint lastMintTime;
    }
    mapping(address => User) public userMapping;
    constructor() ERC20("ShivraiToken", "MRAJ") Ownable(msg.sender) {
        // no pre-supply minting
    }
    function faucetMint(address userAddress) external {
        User storage user = userMapping[userAddress];
        uint amount = MAX_AMOUNT_PER_USER - user.amount > 10
            ? 10
            : MAX_AMOUNT_PER_USER - user.amount;

        require(
            totalSupply() + (amount * 10 ** decimals()) <= TOTAL_SUPPLY_CAP,
            "Over the Limit of total supply cap"
        );
        require(
            block.timestamp > user.lastMintTime + COOLDOWN,
            "You can't mine any tokens for now"
        );

        _mint(userAddress, amount * 10 ** decimals());
        user.amount += amount * 10 ** decimals();
        user.lastMintTime = block.timestamp;
    }
}
