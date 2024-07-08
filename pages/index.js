import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";


export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [taxi, setTaxi] = useState(undefined);
  const [destination, setDestination] = useState(undefined);
  const [welcomeTo, setWelcomeTo] = useState(undefined);
  const [receipt, setReceipt] = useState(undefined);
  const [background, setBackground] = useState('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12cbe8a4-f55c-4b40-85bb-d8e1405e7b84/dh29k47-98fc2db6-4f1b-44e7-83b1-cae692964557.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyY2JlOGE0LWY1NWMtNGI0MC04NWJiLWQ4ZTE0MDVlN2I4NFwvZGgyOWs0Ny05OGZjMmRiNi00ZjFiLTQ0ZTctODNiMS1jYWU2OTI5NjQ1NTcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bMdv6qLTSv0OTuCZa-00l2C4v9roAaBYGcZpmOUStpY');
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
    

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  

  const chooseTaxi = async (taxi) => {
    if (atm) {
      const tx = await atm.chooseTaxi(taxi);
      await tx.wait();
      setTaxi(taxi);
    }
  };

  const chooseDestination = async (destination) => {
    if (atm) {
      const tx = await atm.chooseDestination(destination);
      await tx.wait();
      setDestination(destination);
    }
  };

  const UpdateReciept = async () => {
    if (atm && taxi !== undefined && destination !== undefined) {
      const rec = await atm.showReceipt();
      changeBackground(rec[1]);
      setWelcomeTo(rec[1]+1);
    }
    else{
      alert("Please choose taxi and destination");
    }
  }

  const showReceipt = async () => {
    if (atm && taxi !== undefined && destination !== undefined) {
      const rec = await atm.showReceipt();
      setReceipt({
        taxi: rec[0],
        destination: rec[1],
        fare: rec[2].toNumber(),
      });
      // changeBackground(rec[1]);
      // await atm.reset();
      setWelcomeTo(undefined);
    }
    else{
      alert("Please choose taxi and destination");
    }
  };

  const changeBackground = (destination) => {

    if(destination === 0){
      setBackground("https://i.pinimg.com/originals/bc/87/e5/bc87e5124f8d2cfe810d403adc96ad01.gif");
    }
    else if(destination === 1){
      setBackground("https://i.pinimg.com/originals/d2/51/9f/d2519f97a780645b9b5335c3460ce25a.gif");
    }
    else if(destination === 2){
      setBackground("https://cdnb.artstation.com/p/assets/images/images/066/583/817/original/camila-xiao-city-skyline2-2.gif?1693262309");
    }
  }

  const travelAgain = () => {
    

    setReceipt(undefined);
    setTaxi(undefined);
    setDestination(undefined);
    setWelcomeTo(undefined);
  }

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this taxi service.</p>;
    }

    if (!account) {
      return (
        <div>

        <div className="connect-btn-div">
          <button className="connect-btn" onClick={connectAccount}>Please connect your Metamask wallet</button>

        </div>
        <style jsx>{`
        .connect-btn-div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .connect-btn {
          background-color: #3d8921;
          color: white;
          border: 2px solid black;
          border-radius: 10px;
          padding: 10px 20px;
          margin: 10px;
          cursor: pointer;
          transition: 0.3s;
        }
        .connect-btn:hover {
          background-color: black;
          border: 2px solid white;
          color: white;
          scale: 0.9;
        }
        `}</style>
        </div>
        
      )
    }

    

    return (
      <div>
        
        <section>
        <p>Your Account: {account}</p>

          <div className="super-taxi-div">

            <p>CHOOSE YOUR TAXI:</p>  
          <div className="Taxi-div">
            <button onClick={() => chooseTaxi(0)} className="taxi-btn color-yellow">Yellow Taxi</button>
            <button onClick={() => chooseTaxi(1)} className="taxi-btn color-Blue">Blue Taxi</button>
            <button onClick={() => chooseTaxi(2)} className="taxi-btn color-Green">Green Taxi</button>
          </div>
          </div>
          <div className="super-city-div">

          <p>CHOOSE YOUR DESTINATION:</p>
          <div className="City-div">
            <button onClick={() => chooseDestination(0)} className="city-btn ">Alpha City</button>
            <button onClick={() => chooseDestination(1)} className="city-btn">Beta Town</button>
            <button onClick={() => chooseDestination(2)} className="city-btn">Gamma Village</button>
          </div>
          <div>

            <button className="Go-btn"onClick={UpdateReciept}>Let's Go→</button>
          <button className="recept-btn"onClick={showReceipt}>Get Reciept</button>
          </div>
          </div>


        </section>

        
        

        <div>
        </div>

        {receipt && (
          <div className="reciept">
            <h4>Your Receipt</h4>
            <p>Taxi: {["Yellow", "Blue", "Green"][receipt.taxi]}</p>
            <p>Destination: {["AlphaCity", "BetaTown", "GammaVillage"][receipt.destination]}</p>
            <p>Fare: {receipt.fare}</p>
            <br/>
            <button className="travel-again-btn" onClick={travelAgain.bind()}>Travel Again</button>
          </div>
          

        )}

        <style jsx>{`

        .super-taxi-div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
        }
        .super-city-div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
        }
            section {
              background-color: rgba(0, 0, 0, 0.5);
              border-radius: 10px;
              padding: 10px;
              width: 30%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: start;
              margin: 10px;
              font-family: 'Roboto', sans-serif;
              
            }
              p{
                color: white;
                font-size: 12px;
                margin-bottom: -2px;

                }
              
          .City-div {
              width: 100%;
              display: flex;
              justify-content: start;
              align-items: center;
              
              
            }
            
            .Taxi-div {
              width: 100%;
              display: flex;
              justify-content: start;
              align-items: center;
              
              // margin-left: 10%;
            }
          .taxi-btn {
              background-color: #25217e;
              color: white;
              border: 2px solid black;
              border-radius: 10px;
              padding: 10px 20px;
              margin: 10px;
              cursor: pointer;
              transition: 0.3s;
              
            }
            

            .city-btn {
              background-color: #246c66;
              color: white;
              border: 2px solid white;
              border-radius: 5px;
              padding: 10px 20px;
              margin: 10px;
              cursor: pointer;
              transition: 0.3s;
            }
              button:hover {
              background-color: black;
              border: 2px solid white;
              color: white;
              scale: 0.9;
            }
            
            .color-yellow {
              background-color: yellow;
              color: black;
            }
            .color-Blue {
              background-color: blue;
            }
            .color-Green {
              background-color: green;
            }

            .Go-btn {
              background-color: #6cd24e;
              color: white;
              border:none;
              color: Black;
              
              border-radius: 5px;
              padding: 10px 20px;
              margin: 10px;
              cursor: pointer;
              transition: 0.3s;
            }
              
            .recept-btn { 
              background-color: transparent;
              color: white;
              border: 2px solid white;
              color: white;
              
              border-radius: 5px;
              padding: 10px 20px;
              margin: 10px;
              cursor: pointer;
              transition: 0.3s;
            }
            .recept-btn:hover {
              background-color: red;
              border: 2px solid white;
              color: white;
              scale: 0.9;
            }
            
            .reciept {
              background-color: rgba(0, 0, 0, 0.5);
              border-radius: 10px;
              padding: 10px;
              width: 10%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: start;
              margin: 10px;
              font-family: 'Roboto', sans-serif;
            }
            h4 {
              color: white;
              font-size: 20px;
              margin:  -5px 0px;
            }
            .travel-again-btn {
              background-color: #red;
              color: white;
              border:none;
              color: Black;
              
              border-radius: 5px;
              padding: 10px 20px;
              margin: 10px;
              cursor: pointer;
              transition: 0.3s;
            }
              
        `}</style>

      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    
    <main className="container">
      <header><h1>Welcome to the taxi service</h1></header>
      {welcomeTo && (
        <div>
          <h2 style={{
            color: "white",
            fontSize: "30px",
            fontFamily: "Roboto",
            padding: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            margin: "10px"
          }}>Welcome to {["AlphaCity", "Beta Town", "Gamma Village"][welcomeTo-1]}</h2>
        </div>
      )}
      

      {initUser()}
      <style jsx>{`


        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body{
          color: white;
          
        }
          header{
            background-color: rgba(0, 0, 0, 0.5);
            padding: 10px;
            font-size: 20px;
            font-family: 'Roboto', sans-serif;
          }
        .container {
        color: white;
          position: relative;
          text-align: center;
          background-image: url(${background});
          background-size: cover;
          background-repeat: no-repeat;

          background-position: center;
         
          height: 110vh;

        }
      `}</style>

      
    </main>

    
    
    
  );
}
