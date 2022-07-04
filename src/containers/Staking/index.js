import React, { useState, useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import { Container } from "@material-ui/core";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { InputAdornment, TextField, Divider } from "@material-ui/core";

import { ethers } from 'ethers';
import Web3Context from '../../store/web3-context';

import StakingContract from '../../artifacts/contracts/Staking.sol/ImmeStaking.json';
import StakingToken from '../../artifacts/contracts/BUSD.sol/StakingToken.json';

import { numFormatter, fromHours } from '../../utils/helper';
import Web3 from "web3";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const stakingAddress = '0x4e777541765ae2f2ab0363954e545a738ba7b037'; //0xa046994c896581b421760285b401350762570d82
const sTokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56'; //StakingToken.networks['3'].address;

const sTime1 = 7 * 24;
const sTime2 = 14 * 24;
const sTime3 = 30 * 24;
const sTime4 = 60 * 24;
const sTime5 = 90 * 24;
const sTime6 = 180 * 24;
const sTime7 = 360 * 24;
const sTime8 = 720 * 24;

const Icon = (props) => {
  const { num } = props
  return (
    <div className='icon-wrapper' >
      <img src={process.env.PUBLIC_URL + `/${num}.png`} alt="Logo" />
    </div>
  )
}

function OutlinedCard(props) {
  const { text, num, value } = props;
  return (
    <Box >
      <Card variant="outlined">
        <CardContent className='top-card' sx={{ padding: { xs: '30px', sm: 'origin' }}}>
          <Grid
            container
          >
            <Grid
              item
              direction="column"              
              alignItems="center"
              sx={{ marginRight: '10px' }}
            >
              <Icon num={num} />
            </Grid>
            <Grid item  alignItems="center">
              <Grid container flexDirection={'column'} >
                <Grid item >
                  <span className='text-0' >{text}</span>
                </Grid>
                <Grid item >
                  <span className='text-1'>
                    {num == 2 ? `$${value.toLocaleString()}` : `${value.toLocaleString()}`}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}


const Playground = (props) => {
  const { balance, stake, unstake, onChange, userBalance, claimable, errorText, setMax, amountToStake, working, value, handleChange } = props;
  return (
    <Container className="jbbodybox">
      <Grid container direction='row' sx={{ marginTop: '30px' }}>
        <Grid item sm={12} md={4} >
          <p className='jbtitle1'>Stake</p>
          <p className='jbtitle0'>YOUR ACCOUNT BALANCE</p>
          <p><label className='jbtitle1'>{numFormatter(balance)}</label> BUSD</p>
        </Grid>
        <Grid item direction='column' sm={12} md={8}>
          <Grid item md={12} lg={6} >
            <TextField
              id=''
              label=''
              variant="outlined"
              placeholder='BUSD'
              sx={{ color: 'white' }}
              fullWidth
              error={errorText}
              errorText={errorText}
              value={amountToStake}
              onChange={onChange}
              // type='number'
              InputProps={{
                endAdornment: <InputAdornment position="end"><Button sx={{ color: 'white' }} onClick={setMax} >MAX</Button></InputAdornment>,
              }}
              className='jbbodytextfield'
            />
          </Grid>
          <Grid item md={12} lg={6} sx={{paddingTop:'15px', paddingBottom:'15px'}}>
            <FormControl >
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                row
                className='stake-option'
                onChange={handleChange}
              >
                <Grid item xs={6} sm={4} lg={3}>
                  <FormControlLabel value="7"
                    control={<Radio sx={{ color: '#0B184F', '&.Mui-checked': { color: "#FAB217" } }} />}
                    sx={{ whiteSpace: 'nowrap' }}
                    label="7 days for 1.5%" />
                </Grid>
                <Grid item xs={6} sm={4} lg={3}>
                  <FormControlLabel value="14" control={<Radio sx={{ color: '#0B184F', '&.Mui-checked': { color: "#FAB217", }, }} />} label="14 days for 3.5%"
                    sx={{ whiteSpace: 'nowrap' }} />
                </Grid>
                <Grid item xs={6} sm={4} lg={3}>
                  <FormControlLabel value="30" control={<Radio sx={{ color: '#0B184F', '&.Mui-checked': { color: "#FAB217", }, }} />} label="30 days for 7.5%"
                    sx={{ whiteSpace: 'nowrap' }} />
                </Grid>
                <Grid item xs={6} sm={4} lg={3}>
                  <FormControlLabel value="60" control={<Radio sx={{ color: '#0B184F', '&.Mui-checked': { color: "#FAB217", }, }} />} label="60 days for 15%"
                    sx={{ whiteSpace: 'nowrap' }} />
                </Grid>

                <Grid item xs={6} sm={4} lg={3}>
                  <FormControlLabel value="90" control={<Radio sx={{ color: '#0B184F', '&.Mui-checked': { color: "#FAB217", }, }} />} label="90 days for 25%"
                    sx={{ whiteSpace: 'nowrap' }} />
                </Grid>
                <Grid item xs={6} sm={4} lg={3}>
                  <FormControlLabel value="180" control={<Radio sx={{ color: '#0B184F', '&.Mui-checked': { color: "#FAB217", }, }} />} label="180 days for 75%" sx={{ whiteSpace: 'nowrap' }} />
                </Grid>
                <Grid item xs={6} sm={4} lg={3}>
                  <FormControlLabel value="360" control={<Radio sx={{ color: '#0B184F', '&.Mui-checked': { color: "#FAB217", }, }} />} label="360 days for 200%" sx={{ whiteSpace: 'nowrap' }} />
                </Grid>
                <Grid item xs={6} sm={4} lg={3}>
                  <FormControlLabel value="720" control={<Radio sx={{ color: '#0B184F', '&.Mui-checked': { color: "#FAB217", }, }} />} label="720 days for 500%" sx={{ whiteSpace: 'nowrap' }} />
                </Grid>

              </RadioGroup>
            </FormControl>
          </Grid>
          <Button variant="contained" disableElevation sx={{ width: { xs: '100%', sm: 'fit-content' }, }} className='jbbodybutton stake' onClick={stake} disabled={working}>{`STAKE`}</Button>
        </Grid>
      </Grid>


      <Divider className='jbdivider' />
      <Grid container direction='row' className='jbbodybox2' sx={{paddingBottom:'15px'}} >
        <Grid item xm={12} sm={12} md={6} className='jbbodysubbox'>
          <p className='jbtitle2'>EARNED REWARD</p>
          <p><label className='jbtitle1'>{numFormatter(claimable)}</label> INME</p>
        </Grid>
        <Grid item xm={12} sm={12} md={6} className='jbbodysubbox'>
          <p className='jbtitle2'>CURRENTLY STAKING</p>
          <p><label className='jbtitle1'>{numFormatter(userBalance)}</label> INME</p>
        </Grid>
      </Grid>
      <Button variant="contained" disableElevation sx={{ width: { xs: '100%', sm: 'fit-content' }, marginTop: { xs: '10px' } }} className='jbbodybutton unstake' onClick={unstake}>UNSTAKE</Button>
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
  const [errorText, setErrorText] = useState('error');
  const [amountToStake, setAmountToStake] = useState(null);
  const [working, setWorking] = useState(false);

  const web3Ctx = useContext(Web3Context);

  const [value, setValue] = React.useState(7);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    //connecting to ethereum blockchain
    if (!web3Ctx.provider)
      return;
    const ethEnabled = async () => {
      fetchDataFromBlockchain();
    };
    ethEnabled();
  }, [web3Ctx.provider])

  useEffect(() => {
    if (!web3Ctx.provider)
      return;
    const interval = setInterval(() => {
      updateReward()
    }, 5000)

    return () => clearInterval(interval)
  }, [web3Ctx.provider])

  const updateReward = async () => {
    if (web3Ctx.provider) {
      const web3 = new Web3(web3Ctx.provider);
      const contract = new web3.eth.Contract(StakingContract.abi, stakingAddress);
      const provider = new ethers.providers.Web3Provider(web3Ctx.provider)

      let block = await provider.getBlock();
      let timestamp = block.timestamp;

      const signer = provider.getSigner()

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      let account = accounts[0];

      const origin = await contract.methods.stakers(account).call() // works


      let stime = (fromHours(Number(timestamp) - Number(origin.startTime)));
      const total = Number(ethers.utils.formatEther(origin.balance).toString());

      let earned

      if (stime >= sTime8) {
        earned = total * 5;
      }
      else if (stime >= sTime7) {
        earned = total * (2 + 3 * (stime - sTime7) / (360 * 24));
      }
      else if (stime >= sTime6) {
        earned = total * (0.75 + 1.25 * (stime - sTime6) / (180 * 24));

      }
      else if (stime >= sTime5) {
        earned = total * (0.25 + 0.5 * (stime - sTime5) / (90 * 24));

      }
      else if (stime >= sTime4) {
        earned = total * (0.15 + 0.1 * (stime - sTime4) / (30 * 24));

      }
      else if (stime >= sTime3) {
        earned = total * (0.075 + 0.075 * (stime - sTime3) / (30 * 24));

      }
      else if (stime >= sTime2) {
        earned = total * (0.035 + 0.04 * (stime - sTime2) / (16 * 24));

      }
      else if (stime >= sTime1) {
        earned = total * (0.015 + 0.02 * (stime - sTime1) / (7 * 24));

      }
      else {
        earned = total * (0 + 0.015 * (stime) / (7 * 24));
      }

      setClaimable(earned);
      console.log(earned, '------');

    }


  }

  const setMax = () => {
    setAmountToStake(balance);
    setDepositAmount(balance);
    setErrorText('');
  }
  const onChange = (event) => {

    const numberRegEx = /\-?\d*\.?\d{1,2}/;

    if (event.target.value === '' || !numberRegEx.test(event.target.value.toLowerCase())) {
      setErrorText("invalid format");

    }
    else {
      setDepositAmount(event.target.value)
      setErrorText("");
    }

  };

  const fetchDataFromBlockchain = async () => {
    if (!web3Ctx.provider)
      return;
    const provider = new ethers.providers.Web3Provider(web3Ctx.provider)
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
    // const tx5 = await contract.getClaimable(account);
    setTotal(tx1.toString());

    setStaked(ethers.utils.formatEther(tx2.toString()));
    setRewards(ethers.utils.formatEther(tx3.toString()));
    setUserBalance(ethers.utils.formatEther(tx4.toString()));
    setAccount(account);

    const stakingContract = new ethers.Contract(sTokenAddress, StakingToken.abi, signer)
    const balance = ethers.utils.formatEther((await stakingContract.balanceOf(account))).toString();
    setBalance(balance);

  }

  async function stake() {
    if (errorText) {
      window.alert('Please input amount to stake');
      return;
    }
    if (!web3Ctx.provider) {
      window.alert('Please Connect Wallet');
    }
    else {
      const provider = new ethers.providers.Web3Provider(web3Ctx.provider)
      const signer = provider.getSigner()
      console.log('provider: ', provider);

      const contract = new ethers.Contract(stakingAddress, StakingContract.abi, signer)
      const stakingContract = new ethers.Contract(sTokenAddress, StakingToken.abi, signer)

      try {
        setWorking(true);
        const tx = await stakingContract.approve(stakingAddress, ethers.utils.parseUnits(depositAmount, 18));
        await tx.wait();
        const tx1 = await contract.staking(ethers.utils.parseUnits(depositAmount, 18))
        await tx1.wait();
        console.log("Deposit")
        fetchDataFromBlockchain();
      } catch (err) {
        console.log("Error: ", err)
      }
      setWorking(false);
    }
  }
  async function unstake() {
    if (!web3Ctx.provider) {
      window.alert('Please Connect Wallet');
    }
    else {
      const provider = new ethers.providers.Web3Provider(web3Ctx.provider)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(stakingAddress, StakingContract.abi, signer)
      try {
        await contract.unstake();
        fetchDataFromBlockchain();
        console.log("unstake")
      } catch (err) {

        window.alert(err.error.data.message);
        console.log("Error: ", err)
      }
    }
  }



  return (
    <div className="staking">
      <Container >
        <Grid container spacing={2}
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Grid item xs={12} sm={4}>
            <OutlinedCard num={1} text={"Total Staked"} value={numFormatter(staked)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <OutlinedCard num={2} text={"Total Rewards"} value={numFormatter(rewards)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <OutlinedCard num={3} text={"Total Users"} value={total} />
          </Grid>
        </Grid>

        <Playground
          balance={balance}
          stake={stake}
          unstake={unstake}
          onChange={onChange}
          userBalance={userBalance}
          claimable={claimable}
          errorText={errorText}
          setMax={setMax}
          amountToStake={amountToStake}
          working={working}
          value={value}
          handleChange={handleChange}
        />
      </Container>

    </div>
  );
}


