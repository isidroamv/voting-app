import web3 from './web3';

const address = '0xE0602a23dd0880e628ba485978d522E6D0a9b188';
const abi = require('./VotingSystem.json')

export default new web3.eth.Contract(abi, address);