/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY ="WF-FI5IesNfp83atfM8xqNFkA1qM7aq1";
const RINKEBY_PRIVATE_KEY ="44b260f00d55e09688f514a3d44ed91a99835040ef79f3ef2c40580b2c07e429";
module.exports = {
  solidity: "0.8.9",

  networks:{
  rinkeby:{
    url:`https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    accounts:[`${RINKEBY_PRIVATE_KEY}`],
  }

  }
};
