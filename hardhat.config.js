require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {},
    ropsten: {
      url: "https://ropsten.infura.io/v3/d5b31ecc4b654f8b84cf1f975cd1042d",
      accounts: [`0xd58a4cb18c063ac40243568e1137ea1d42fe219a43c330ca9a0a8c27c19c4743`]
    },
    bscmain: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: [`0x416ebe57d4702cdfd1985f82242fce63a893c5eadd0460bcf7159e569dbebcf2`]
    }
  },
  etherscan: {
    apiKey: "V2F52NWYZA345CAQYKMQPC46XCRH667C6D"
  },
  solidity: "0.8.4",
};
