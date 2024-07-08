// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    enum Taxi { Yellow, Blue, Green }
    enum Destination { AlphaCity, BetaTown, GammaVillage }

    struct Receipt {
        Taxi taxi;
        Destination destination;
        uint fare;
    }

    mapping(address => Receipt) public receipts;
    mapping(address => bool) public hasChosenTaxi;
    mapping(address => bool) public hasChosenDestination;

    function chooseTaxi(Taxi _taxi) public {
        receipts[msg.sender].taxi = _taxi;
        hasChosenTaxi[msg.sender] = true;
    }

    function chooseDestination(Destination _destination) public {
        require(hasChosenTaxi[msg.sender], "You must choose a taxi first.");
        
        receipts[msg.sender].destination = _destination;
        hasChosenDestination[msg.sender] = true;

        if (_destination == Destination.AlphaCity) {
            receipts[msg.sender].fare = 100;
        } else if (_destination == Destination.BetaTown) {
            receipts[msg.sender].fare = 200;
        } else if (_destination == Destination.GammaVillage) {
            receipts[msg.sender].fare = 300;
        }
    }

    function showReceipt() public view returns (Taxi, Destination, uint) {
        require(hasChosenTaxi[msg.sender], "You must choose a taxi first.");
        require(hasChosenDestination[msg.sender], "You must choose a destination first.");

        Receipt memory receipt = receipts[msg.sender];
        return (receipt.taxi, receipt.destination, receipt.fare);
    }

    // function reset() public {
    //     delete receipts[msg.sender];
    //     hasChosenTaxi[msg.sender] = false;
    //     hasChosenDestination[msg.sender] = false;
    // }
}
