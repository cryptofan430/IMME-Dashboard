import * as React from 'react';
import { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';

import { Container } from "@material-ui/core";

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { InputAdornment, TextField, Divider } from "@material-ui/core";

import {ethers} from 'ethers';
import { BrowserRouter as Router } from 'react-router-dom';

import StakingContract from '../../artifacts/contracts/Staking.sol/ImmeStaking.json';
import StakingToken from '../../artifacts/contracts/BUSD.sol/StakingToken.json';

import { numFormatter } from '../../utils/helper';

const stakingAddress = '0xa046994c896581b421760285b401350762570d82';
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
            {num == 2 ? `$${numFormatter(num)}` : `${numFormatter(num)}`}
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
          >
            <Grid
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Icon num={num} />
            </Grid>
            <Grid item >
              <Grid item >
                <span className='text-0'>{text}</span>  
              </Grid>
              <Grid item >
                <span>
                  {num == 2 ? `$${value.toLocaleString()}` : `${value.toLocaleString()}`}
                </span>
              </Grid>
            </Grid>
          </Grid>
        </CardContent> 
      </Card>
    </Box>
  );
}

const Playground = (props) => {
  const {balance, stake, unstake, setDepositAmount, userBalance, claimable} = props;
  return (
    <Container className="jbbodybox">
      <Grid container direction='row' justifyContent='center'>
        <Grid item xm={12} sm={12} md={6} lg={6}>
          <p className='jbtitle1'>Stake</p>
          <p>YOUR ACCOUNT BALANCE</p>
          <p><label className='jbtitle1'>{numFormatter(balance)}</label> BUSD</p>
        </Grid>
        <Grid item xm={12} sm={12} md={6} lg={6}>
          <TextField 
            id=''
            label=''
            variant="outlined"
            placeholder='BUSD'
            sx={{ color: 'white' }}
            onChange={(e) => setDepositAmount(e.target.value)}
            // type='number'
            InputProps={{
              endAdornment: <InputAdornment position="end"><Button>MAX</Button></InputAdornment>,
            }}
            className='jbbodytextfield'
          />
          <Button variant="contained" disableElevation className='jbbodybutton' onClick={stake}>STAKE</Button>
        </Grid>
      </Grid>
      <Divider className='jbdivider' />
      
      <Grid container direction='row' justifyContent='center' className='jbbodybox2'>
        <Grid item xm={12} sm={12} md={3} lg={3} className='jbbodysubbox'>
          <p className='jbtitle2'>EARNED REWARD</p>
          <p><label className='jbtitle1'>{numFormatter(claimable) }</label> INME</p>
        </Grid>
        <Grid item xm={12} sm={12} md={3} lg={3} className='jbbodysubbox'>
          <p className='jbtitle2'>CURRENTLY STAKING</p>
          <p><label className='jbtitle1'>{numFormatter(userBalance) }</label> INME</p>
        </Grid>
        <Grid item xm={12} sm={12} md={6} lg={6}>
          <TextField 
            id=''
            label=''
            variant="outlined"
            placeholder='INME UNSTAKE AMOUNT'
            className='jbbodytextfield'
            // type='number'
            InputProps={{
              endAdornment: <InputAdornment position="end"><Button>MAX</Button></InputAdornment>,
            }}
            
          />
          <Button variant="contained" disableElevation className='jbbodybutton' onClick={ unstake}>UNSTAKE</Button>
        </Grid>
      </Grid>
  </Container>
  );
}

export default function Staking() {
  
  const [depositAmount, setDepositAmount] = useState();
  const [staked, setStaked] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState(null);
  const [claimable, setClaimable] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const { ethereum } = window;

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
      'function totalRewards() public view returns (uint256)',
      'function getUserBalance(address) public view returns (uint256)',
      'function getClaimable(address) public view returns (uint256)'
   ], provider)
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    let account = accounts[0];
    
    const tx1 = await contract.totalUsers();
    const tx2 = await contract.totalStaked();
    const tx3 = await contract.totalRewards();
    const tx4 = await contract.getUserBalance(account);
    const tx5 = await contract.getClaimable(account);

    setTotal(tx1.toString());
    setStaked(ethers.utils.formatEther(tx2.toString()));
    setRewards(ethers.utils.formatEther(tx3.toString()));
    setUserBalance(ethers.utils.formatEther(tx4.toString()));
    setClaimable(ethers.utils.formatEther(tx5.toString()));
    setAccount(account);
  
    const stakingContract = new ethers.Contract(sTokenAddress,StakingToken.abi, signer)
    const balance = ethers.utils.formatEther((await stakingContract.balanceOf(accounts[0]))).toString();
    setBalance(balance);
    
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
      
      try {
        const tx = await stakingContract.approve(stakingAddress,ethers.utils.parseUnits(depositAmount,18));
        await tx.wait();
        const tx1 = await contract.staking(ethers.utils.parseUnits(depositAmount,18))
        await tx1.wait();
        console.log("Deposit")
        fetchDataFromBlockchain();
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
        await contract.unstake();
        fetchDataFromBlockchain();
        console.log("unstake")
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  
  
  return (
    <div className="staking">      
      <Container >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <OutlinedCard num = {1} text={"Total Staked"} value={staked}/>
          </Grid>
          <Grid item xs={4}>
            <OutlinedCard num = {2} text={"Total Rewards"} value={rewards}/>
          </Grid>
          <Grid item xs={4}>
            <OutlinedCard num = {3} text={"Total Users"} value={total}/>
          </Grid>
        </Grid>
    
      <Playground 
          balance = {balance} 
          stake = {stake} 
          unstake = {unstake} 
          setDepositAmount = {setDepositAmount} 
          userBalance = {userBalance}
          claimable = {claimable} />
      </Container>
        
    </div>
  );
}


