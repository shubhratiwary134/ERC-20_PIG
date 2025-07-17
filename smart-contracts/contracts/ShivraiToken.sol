// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract ShivraiToken is ERC20, Ownable {
    uint256 public immutable TOTAL_SUPPLY_CAP;
    uint256 public COOLDOWN = 24 hours;
    uint256 public RACE_COOLDOWN = 2 hours;
    uint256 public MAX_AMOUNT_PER_USER = 20000 * 10 ** decimals();
    struct User {
        uint amount;
        uint lastMintTime;
        RacePosition lastRoundPosition;
        uint lastRaceTime;
    }
    enum RacePosition {
        first,
        second,
        third
    }
    mapping(address => User) public userMapping;
    constructor() ERC20("ShivraiToken", "MRAJ") Ownable(msg.sender) {
        // no pre-supply minting
        TOTAL_SUPPLY_CAP = 2_000_000 * 10 ** decimals();
    }
    function faucetMint() external {
        User storage user = userMapping[msg.sender];
        uint256 amount = MAX_AMOUNT_PER_USER - user.amount > 10
            ? 10
            : MAX_AMOUNT_PER_USER - user.amount;
        uint256 tokenAmount = amount * 10 ** decimals();
        require(
            amount > 0,
            "invalid condition can't mint 0 tokens, No tokens left"
        );
        require(
            totalSupply() + tokenAmount <= TOTAL_SUPPLY_CAP,
            "Over the Limit of total supply cap"
        );
        require(
            block.timestamp > user.lastMintTime + COOLDOWN,
            "You can't mine any tokens for now"
        );

        _mint(msg.sender, tokenAmount);
        user.amount += tokenAmount;
        user.lastMintTime = block.timestamp;
    }
    function raceReward(RacePosition _position) external {
        uint256 amount;
        User storage user = userMapping[msg.sender];
        if (_position == RacePosition.first) {
            amount = 20;
        } else if (_position == RacePosition.second) {
            amount = 10;
        } else {
            amount = 5;
        }
        uint256 reward = amount * 10 ** decimals();
        require(
            block.timestamp > user.lastRaceTime + RACE_COOLDOWN,
            "You can't mine any tokens for now"
        );
        require(
            user.amount + reward <= MAX_AMOUNT_PER_USER,
            "Limit for the user max amount exceeded"
        );
        require(
            totalSupply() + reward <= TOTAL_SUPPLY_CAP,
            "Over the Limit of total supply cap"
        );
        _mint(msg.sender, reward);
        user.amount += reward;
        user.lastRaceTime = block.timestamp;
        user.lastRoundPosition = _position;
    }
    function burnToken(uint256 amount) external {
        User storage user = userMapping[msg.sender];
        uint256 amountToBeBurned = amount * 10 ** decimals();
        require(user.amount >= amountToBeBurned, "Not enough tokens to burn");
        _burn(msg.sender, amountToBeBurned);
        user.amount -= amountToBeBurned;
    }
}
