const Web3 = require("web3");
const Voting = require("../build/contracts/Voting.json");

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(Voting.abi)
        .deploy({ data: Voting.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    console.log(`Contract deployed at address: ${result.options.address}`);
};

deploy();
