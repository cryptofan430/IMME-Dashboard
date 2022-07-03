/**

**/
import React from 'react';

const Web3Context = React.createContext({
  provider: null,
  addProvider: () => {},
});

export default Web3Context;