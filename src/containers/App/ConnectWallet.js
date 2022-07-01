import { useState, useEffect} from 'react';
import {ethers} from 'ethers';
import { BrowserRouter as Router } from 'react-router-dom';

export default function ConnectWallet(handleOpenModal) {
  const [haveMetamask, setHaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(()=>{
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        setHaveMetamask(false);
      }
      setHaveMetamask(true);
    };
    checkMetamaskAvailability();
  },[])

  
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        setHaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };
  return (
    <div className="connect-wallet">
      
        {haveMetamask ? (
          <div className="connect-btn">
            {isConnected ? (
              <div className="card-row">
                <p>
                {accountAddress.slice(0, 4)}...
                {accountAddress.slice(38, 42)}
              </p>
                <h3>Wallet Balance:</h3>
                <p>{accountBalance}</p>
            </div>
            ) : (
              <button className="btn" onClick={connectWallet}>
                Connect
              </button>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      
    </div>
  );
}

