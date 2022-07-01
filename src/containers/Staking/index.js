import * as React from 'react';
import { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import Container from '@mui/material';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {ethers} from 'ethers';
import { BrowserRouter as Router } from 'react-router-dom';


import StakingContract from '../../artifacts/contracts/Staking.sol/ImmeStaking.json';
import StakingToken from '../../artifacts/contracts/BUSD.sol/StakingToken.json';

const stakingAddress = '0x91b7Ea4708Ec7FDA3AAA5a0DDcB7d9Ca9F2a279E';
const sTokenAddress = '0xAD3E28dA2B1480cdB2D79C70764458AaBa1c57F3'; //StakingToken.networks['3'].address;
const rTokenAddress = '0x9ad38251cD6B157B32C4D913b03165781bd2d019';

const UNISWAPV2_ROUTER02_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const UNISWAPV2_ROUTER02_ABI = [{ "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsOut", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }]

const Icon = (props) =>{
  const {num} = props
  return(
    <div className='icon-wrapper'>
      <img src={process.env.PUBLIC_URL + `/${num}.png`} alt="Logo" style={{width: '30px'}}/> 
    </div>
  )
}

const card = (props) => {
  const {text, num, value} = props;
  return(
  <React.Fragment>
    <CardContent className='top-card'>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Icon num={num} />
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="caption" gutterBottom >
            {text}
          </Typography>
          <Typography variant="caption" gutterBottom >
            {num == 2 ? `$${num.toLocaleString()}` : `${num.toLocaleString()}`}
          </Typography>
        </Grid>
      </Grid>
    </CardContent> 
  </React.Fragment>
  )
};

function OutlinedCard(props) {
  const {text, num, value} = props;
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent className='top-card'>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Icon num={num} />
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="caption" gutterBottom >
                {text}
              </Typography>
              <Typography variant="caption" gutterBottom >
                {num == 2 ? `$${num.toLocaleString()}` : `${num.toLocaleString()}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent> 
      </Card>
    </Box>
  );
}


export default function Staking() {
  
  const [depositAmount, setDepositAmount] = useState();

  useEffect(()=>{
    //connecting to ethereum blockchain
    const ethEnabled = async () => {
      fetchDataFromBlockchain();
    };

    ethEnabled();
  },[])

  const fetchDataFromBlockchain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)  
    const signer = provider.getSigner()
    // const contract = new ethers.Contract(stakingAddress, StakingContract.abi, signer)
    const contract = new ethers.Contract(stakingAddress, [
      'function totalUsers() public view returns (uint256)',
      'function totalStaked() public view returns (uint256)',
      'function totalRewards() public view returns (uint256)'
   ], provider)

    const tx1 = await contract.totalUsers();
    const tx2 = await contract.totalStaked()
    const tx3 = await contract.totalRewards()
    console.log(tx1.toString(), '--------')
    console.log(tx2.toString(), '--------')
    console.log(tx3.toString(), '--------')
    
  }

  async function stake() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      
      const signer = provider.getSigner()
      const accounts = await window.ethereum.enable();
      console.log('accounts: ', accounts);
      console.log('provider: ', provider);

      const contract = new ethers.Contract(stakingAddress, StakingContract.abi, signer)
      const stakingContract = new ethers.Contract(sTokenAddress,StakingToken.abi, signer)
      const uniswap = new ethers.Contract(
        UNISWAPV2_ROUTER02_ADDRESS,
        UNISWAPV2_ROUTER02_ABI,
        signer,
      );
      try {
        let amountEthFromDAI = await uniswap.getAmountsOut(
          depositAmount,
          [sTokenAddress, rTokenAddress]
        )
      
      console.log("Amount of ETH from DAI: ", amountEthFromDAI[1].toString());

        const tx = await stakingContract.approve(stakingAddress,ethers.utils.parseUnits(depositAmount,18));
        await tx.wait();
        const tx1 = await contract.staking(ethers.utils.parseUnits(depositAmount,18))
        await tx1.wait();
        console.log("Deposit")
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }
  async function unstake() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(stakingAddress, StakingContract.abi, signer)
      try {
        await contract.unstake()
        console.log("unstake")
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }
  return (
    <div className="staking">      
      
      <Grid container spacing={2}>
        
        <Grid item xs={4}>
          <OutlinedCard num = {1} text={"Total Staked"} value={15}/>  
        </Grid>
        <Grid item xs={4}>
          <OutlinedCard num = {2} text={"Total Rewards"} value={15}/>
        </Grid>
        <Grid item xs={4}>
          <OutlinedCard num = {3} text={"Total Users"} value={15}/>
        </Grid>
      </Grid>
      
        <div>
          <input onChange={e=> setDepositAmount(e.target.value)} placeholder="Deposit Amount" />
          <button onClick={ stake}> Stake</button>
        </div>

        <div>
          <button onClick={unstake}>Unstake</button>
        </div>
        
    </div>
  );
}

