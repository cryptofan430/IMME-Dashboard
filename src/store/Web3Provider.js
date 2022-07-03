/**
**/
import { useReducer } from 'react';

import Web3Context from './web3-context';

const defaultWeb3State = {
  provider: null,
};

const web3Reducer = (state, action) => {
  if(action.type === 'ADDPROVIDER') {
    return {
      provider: action.provider,
    };
  } 
  return defaultWeb3State;
};

const Web3Provider = props => {
  const [web3State, dispatchWeb3Action] = useReducer(web3Reducer, defaultWeb3State);
  
  const addProviderHandler = async(provider) => {
    dispatchWeb3Action({type: 'ADDPROVIDER', provider: provider});
    return provider
  };

  
  const web3Context = {
    provider:web3State.provider,
    addProvider: addProviderHandler
  };
  
  return (
    <Web3Context.Provider value={web3Context}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;