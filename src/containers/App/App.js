import './App.css';
import React, { useState, useEffect, useContext } from "react";
import Web3Context from '../../store/web3-context';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Routes from './Routes';
import Navbar from '../Layout/Navbar';

function App() {
  const web3Ctx = useContext(Web3Context);
  useEffect(() => {
    const loadBlockchainData = async () => {
      const account = await web3Ctx.provider;
    }
    loadBlockchainData();

  },[])

  return (
    <div className="App">
      <Router >
        <Navbar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
