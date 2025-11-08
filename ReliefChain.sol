// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract ReliefChain {
    address public owner;
    uint public totalDonations;
    struct DonationInfo {
        address donor;
        uint amount;
        string purpose;
        uint timestamp;
    }
    DonationInfo[] public donationHistory;
    mapping(address => uint) public donations;
    event Donated(address indexed donor, uint amount, string purpose, uint timestamp);
    event Withdrawn(address indexed owner, uint amount, uint timestamp);
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }
    constructor() {
        owner = msg.sender;
    }
    // Donate with purpose (e.g., “Typhoon Relief”)
    function donate(string calldata _purpose) external payable {
        require(msg.value > 0, "Donation must be greater than 0");
        donations[msg.sender] += msg.value;
        totalDonations += msg.value;
        donationHistory.push(DonationInfo(msg.sender, msg.value, _purpose, block.timestamp));
        emit Donated(msg.sender, msg.value, _purpose, block.timestamp);
    }
    function getDonationsCount() external view returns (uint) {
        return donationHistory.length;
    }
    function getDonation(uint index) external view returns (DonationInfo memory) {
        require(index < donationHistory.length, "Invalid index");
        return donationHistory[index];
    }
    function withdraw() external onlyOwner {
        uint amount = address(this).balance;
        require(amount > 0, "No funds to withdraw");
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Withdrawal failed");
        emit Withdrawn(owner, amount, block.timestamp);
    }
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}