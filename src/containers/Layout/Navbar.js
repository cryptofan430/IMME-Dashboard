import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {useHistory, useLocation} from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { Container } from "@material-ui/core";

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect} from 'react';

import {ethers} from 'ethers';
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

  React.useEffect(() => {
    if(location){
      console.log(location.pathname,'------')
    }
  }, [location]);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  
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
            {'Reward'}
            </NavLink>
              
            <Button className='connectBtn' sx={{ color: '#fff' }} onClick={handleConnect}>
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

