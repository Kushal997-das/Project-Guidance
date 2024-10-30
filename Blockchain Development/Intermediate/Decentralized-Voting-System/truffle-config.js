const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
require("dotenv").config();

// Define the provider
const provider = () => new HDWalletProvider({
    mnemonic: {
        phrase: process.env.MNEMONIC // Use MNEMONIC for your wallet's seed phrase
    },
    providerOrUrl: process.env.INFURA_URL // Your Infura URL
});

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545, // Adjust if needed
            network_id: "*",
        },
        mainnet: {
            provider: provider,
            network_id: 1,
            gas: 4500000,
            gasPrice: 10000000000,
        }
    },
    compilers: {
        solc: {
            version: "0.8.0", // Specify the Solidity version
        }
    }
};