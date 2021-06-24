const path = require('path');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  contracts_build_directory: path.join(__dirname, 'src/contracts'),
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY_1],
          providerOrUrl: `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`,
        }),
      network_id: '3',
      gas: 5500000,
      skipDryRun: true,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY_1],
          providerOrUrl: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`,
        }),
      gas: 5000000,
      network_id: '4',
      skipDryRun: true,
    },
    goerli: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY_1],
          providerOrUrl: `https://goerli.infura.io/v3/${process.env.INFURA_ID}`,
        }),
      gas: 5000000,
      network_id: '5',
      skipDryRun: true,
    },
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: '0.6.12', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
  },
  plugins: ['truffle-plugin-verify'],
};
