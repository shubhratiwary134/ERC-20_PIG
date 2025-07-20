// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract ShivraiToken is ERC20, Ownable, ERC20Permit {
    uint256 public immutable TOTAL_SUPPLY_CAP;
    uint256 public COOLDOWN = 24 hours;
    uint256 public RACE_COOLDOWN = 2 hours;
    uint256 public MAX_AMOUNT_PER_USER = 20000 * 10 ** decimals();
    bool public faucetPaused = false;

    event Mint(address indexed sender, uint amount, uint timeStamp);
    event RaceRewardMint(address indexed sender, uint amount, uint timeStamp);
    event FaucetStatusChange(bool faucetPaused);
    event TokenBurned(address indexed sender, uint amount, uint timeStamp);
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
    constructor()
        ERC20("Shivrai", "MRAJ")
        Ownable(msg.sender)
        ERC20Permit("Shivrai")
    {
        // no pre-supply minting
        TOTAL_SUPPLY_CAP = 2_000_000 * 10 ** decimals();
    }
    function faucetMint() external {
        require(!faucetPaused, "The faucet is currently paused.");
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
        emit Mint(msg.sender, tokenAmount, block.timestamp);
    }
    function raceReward(RacePosition _position) external {
        require(!faucetPaused, "The faucet is currently paused.");
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
            totalSupply() + reward <= TOTAL_SUPPLY_CAP,
            "Over the Limit of total supply cap"
        );
        require(
            user.amount + reward <= MAX_AMOUNT_PER_USER,
            "Limit for the user max amount exceeded"
        );
        require(
            block.timestamp > user.lastRaceTime + RACE_COOLDOWN,
            "You can't mine any tokens for now"
        );

        _mint(msg.sender, reward);
        user.amount += reward;
        user.lastRaceTime = block.timestamp;
        user.lastRoundPosition = _position;
        emit RaceRewardMint(msg.sender, reward, block.timestamp);
    }
    function burnToken(uint256 amount) external {
        User storage user = userMapping[msg.sender];
        uint256 amountToBeBurned = amount * 10 ** decimals();
        require(user.amount >= amountToBeBurned, "Not enough tokens to burn");
        _burn(msg.sender, amountToBeBurned);
        user.amount -= amountToBeBurned;
        emit TokenBurned(msg.sender, amountToBeBurned, block.timestamp);
    }

    // Admin Only features.
    function setMaxAmountPerUser(uint256 amount) external onlyOwner {
        require(
            amount < TOTAL_SUPPLY_CAP,
            "one person MAX can't be more than the total supply capital"
        );
        MAX_AMOUNT_PER_USER = amount;
    }
    function setCooldown(uint256 cooldown) external onlyOwner {
        COOLDOWN = cooldown;
    }
    function setRaceCooldown(uint256 raceCooldown) external onlyOwner {
        RACE_COOLDOWN = raceCooldown;
    }
    function pauseFaucet() external onlyOwner {
        faucetPaused = true;
        emit FaucetStatusChange(faucetPaused);
    }
    function unPauseFaucet() external onlyOwner {
        faucetPaused = false;
        emit FaucetStatusChange(faucetPaused);
    }

    // Read Only functions
    function getUserInfo() external view returns (User memory) {
        return userMapping[msg.sender];
    }

    //function for testing
    function __test_setUserAmount(
        address userAddress,
        uint256 amount
    ) external onlyOwner {
        require(block.chainid == 31337, "Test-only function");
        userMapping[userAddress].amount = amount;
        userMapping[userAddress].lastMintTime = block.timestamp - COOLDOWN - 1;
    }
    function __test_mint(address to, uint256 amount) external {
        require(block.chainid == 31337, "Test-only function");
        _mint(to, amount);
    }
}
