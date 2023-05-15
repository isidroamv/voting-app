const path = require("path");
const fs = require("fs");
const solc = require("solc");

const contractName = "VotingSystem.sol";
const contractPath = path.resolve(__dirname, "contracts", contractName);
const source = fs.readFileSync(contractPath, "utf8");

const input = {
    language: 'Solidity',
    sources: {
      [contractName]: {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[contractName].VotingSystem;
