# Project2_Taxi-Service_Eth_Intermediadiate

Integration of Smart Contract with frontend and usage of hardhat.
This project covers the Assessment 1 of Module 2 in the Eth+Avax Intermediate Course under Metacrafters.

## Description

The code deploys a simple contract which interacts with the frontend where the user can choose a taxi and a destination and accordingly establish transactions through the Metamask wallet. The main contract i.e. the  Assessment.sol file contains the following:
* Validating total number of taxis:
	* An Enumerated list named Taxi Taxi is declared using keyword Enum. It is made to contain three taxis Yellow, Blue and Green.
	*This list then restricts the number of taxis that can be chosen efficiently.
```
//The enumerated list Taxi defined within the contract body: 
enum Taxi { Yellow, Blue, Green }.
```

* A Receipt as a structure:
  * Each receipt has three components taxi, destination and fare, these details are individual entities stored in a single structure called Receipt.
```
//Receipt structure defined within the contract body:
    struct Receipt {
        Taxi taxi;
        Destination destination;
        uint fare;
    }
```
* Function chooseTaxi():
  * This function takes one of the three available types of taxis as input/arguments from the user.
  * It then updates the receipt object 'taxi' to this taxi chosen by the user and sets the Boolean variable 'hasChosenTaxi' to true
```
//The chooseTaxi function code: 
function chooseTaxi(Taxi _taxi) public {
        receipts[msg.sender].taxi = _taxi;
        hasChosenTaxi[msg.sender] = true;
    }
```
* Function chooseDestination():
  * This function takes the user destination input as argument from the available list of three destinations.
  * This function requires that a taxi must be chosen first by validating for the value of the Boolean 'hasChosenTaxi' to be true.
  * It then updates the receipt object 'destination' to this destination chosen by the user and sets the Boolean variable 'hasChosenDestination' to true.
  * It then calculates the 'fare' based on the conditionals associated with the chosen destination.
```
//The chooseDestination function code: 
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
```
* Function showReceipt():
  * This function takes lets the user to view their receipt.
  * It requires that both the 'hasChosenTaxi' boolean as well as the 'hasChosenDestination' boolean must be true.
  * Then it retrieves the receipt information from the receipts mapping for the caller.
  * Finally it returns a tuple containing the chosen taxi type, destination, and fare.
```
//The showReceipt() function code: 
function showReceipt() public view returns (Taxi, Destination, uint) {
        require(hasChosenTaxi[msg.sender], "You must choose a taxi first.");
        require(hasChosenDestination[msg.sender], "You must choose a destination first.");

        Receipt memory receipt = receipts[msg.sender];
        return (receipt.taxi, receipt.destination, receipt.fare);
    }
```
* Function reset():
  * Sets all the user's choices and receipt information to original/default.
  * It deletes the receipt information from the receipts mapping for the caller and sets all booleans to false. 
```
//The reset() function code: 
function reset() public {
        delete receipts[msg.sender];
        hasChosenTaxi[msg.sender] = false;
        hasChosenDestination[msg.sender] = false;
    }
```


### Installing

* User can clone this repository to there local system or can dowload zip file.
* User is required to install Node.js prior before executing the program.

### Executing program / Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.


1. Inside the project directory, install dotenv, also create an .env file in the root folder, inside .env type:

```shell
WALLET_PRIVATE_KEY = <enter your private key here> 
SEPOLIA_URL = "enter your url your here"

```
**note: ensure your .gitignore file has .env in it**

2. Inside the project directory, in the terminal type:

```shell
npm i
```
3. Open two additional terminals in your VS code
4. In the second terminal type: 

```shell
npx hardhat node
```
5. In the third terminal, type: 

```shell
npx hardhat run --network localhost scripts/sepolia.js
```
6. Back in the first terminal, to launch the front-end enter the command:

```shell
npm run dev
```
After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Help

Solution to common problems or issues:
* The compiler version in the code might not match the compiler version on your solidity compiler tab. This happens generally depending on the compatibility your device or browser.
*To Understand the Hardhat commands on can use this command in terminal:
```
npx hardhat help
```

## Authors

IceTastesNice~Metacrafters

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details

