import web3 from './web3';

const address = '0x010ff4037bC69548262Ec25a52812188F1DfdF97';
const abi = require('./VotingSystem.json')

export default new web3.eth.Contract(abi, address);