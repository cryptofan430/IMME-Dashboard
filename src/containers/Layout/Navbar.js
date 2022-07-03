import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {useHistory, useLocation} from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { Container } from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect} from 'react';

import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

import {ethers, providers} from 'ethers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";


const navItems = ['Staking', 'Imme Run'];


const Logo = () =>{
  return(
  <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" style={{width: '200px'}}/> 
  )
}



function Navbar() {
  let location = useLocation();
  const [haveMetamask, setHaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState(null);
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [path, setPath] = useState('stake');

  const [web3Modal, setWeb3Modal] = useState(null);
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [mainChain, setMainChain] = useState(0); // chain type 1: ethereum 0: polygon
  const [chain, setChain] = useState(0);

  React.useEffect(() => {
    if(location){
      console.log(location.pathname,'------')
      
    }

    
  }, [location]);

  useEffect(() => {
    // initiate web3modal
     const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_KEY,
        }
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      // network: "mainnet",
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal)
  }, []);

  const { ethereum } = window;
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

          
  const handleConnect = async () => {
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

  async function connectWallet() {

    // check metamask  
    // if (typeof window.ethereum == 'undefined') {
    //   if (window.confirm("Please install metamask")) {
    //     window.open("https://metamask.io/download.html", "_blank");
    //   }
    //   return;
    // }
    const provider = await web3Modal.connect();

    // const library = new ethers.providers.Web3Provider(provider);
    // addListeners(provider);
    // setProvider(provider);
    // setLibrary(library);
    // setChain(provider.chainId);
    // const ethersProvider = new providers.Web3Provider(provider);
    // const userAddress = await ethersProvider.getSigner().getAddress();
    // setAddress(userAddress);
    // checkChain();
  }

  async function addListeners(web3ModalProvider) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      setAddress(accounts[0]);
    });

    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      setChain(chainId);
    });
  }

  function checkChain() {
    // if (chains[mainChain].chainId != chain) {
    //   switchNetwork();
    //   return false;
    // } else {
    //   return true;
    // }
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" className='navbar' style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar style={{  marginLeft:'9%', marginRight:'9%', marginTop:'10px', marginBottom:'10px'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Logo />
          </Typography>
          <Box  sx={{ display: { xs: 'none', sm: 'block' } }}>
                          
            <NavLink to={'/'} style={{fontSize: 20}} className={location?.pathname=='/'?'stake navlink':'navlink'}
            >
              {'Staking'}
            </NavLink>
            
            <NavLink to={'/reward'} style={{fontSize: 20}} className={location?.pathname!='/'?'reward navlink':'navlink'}>
            {'Inme Run'}
            </NavLink>
              
            <Button className='connectBtn' sx={{ color: '#fff' }} onClick={connectWallet}>
              {accountAddress? `${accountAddress.slice(0, 4)}...
                ${accountAddress.slice(38, 42)}` : 'Connect'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
      
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;

