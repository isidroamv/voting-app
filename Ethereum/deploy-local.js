// deploy code will go here

const Web3 = require('web3');
const web3 = new Web3('ws://127.0.0.1:8545'); // Create a web3 instance
const { abi, evm } = require('./compile');


const deploy = async () => {
    let accounts = await web3.eth.getAccounts();
    const myContract = new web3.eth.Contract(abi);
    myContract.deploy({
        data: evm.bytecode.object
    })
    .send({
        from: accounts[0], // Insert your account address here
        gas: 3000000, // Insert gas limit here
        gasPrice: '10000000000' // Insert gas price here
    })
    .then((contractInstance) => {
        console.log('Contract deployed at address:', contractInstance.options.address);
    })
    .catch((error) => {
        console.log('Error deploying contract:', error);
    });
}

deploy();