const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');


const options = {
  gasLimit: 10000000,
};
const web3 = new Web3(ganache.provider(options));

const { abi, evm } = require('../compile');

let accounts;
let votingSystem;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  votingSystem = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [],
    })
    .send({ from: accounts[0], gas: '10000000' });
});

describe('votingSystem', () => {
  it('deploys a contract', () => {
    assert.ok(votingSystem.options.address);
  });
});

describe('Organization', () => {
  it('Check the proposal normal flow', async () => {

    // User can create the an organization
    await votingSystem.methods.createOrganization('organizationName', 50).send({ from: accounts[0], gas: 1000000 });
    const organization = await votingSystem.methods.organizations(0).call();
    assert.equal(organization.name, 'organizationName');
    assert.equal(organization.proposalCount, 0);
    assert.equal(organization.sensitivity, 50);


    // User cannot create a proposal if hasn't been join to the organization
    try {
      await votingSystem.methods.createProposal(0, 'proposalName', 'desc')
        .send({ from: accounts[0], gas: 1000000 });
    } catch (e) {
      assert.ok(e)
    }

    // User joins the organization
    await votingSystem.methods.join(0).send({ from: accounts[0], gas: 1000000 });

    // The user is not able to join again to the organization
    try {
      await votingSystem.methods.join(0).send({ from: accounts[0] });
    } catch (e) {
      assert.ok(e)
    }

    // User create a proposal
    await votingSystem.methods.createProposal(0, 'proposalName', 'desc')
      .send({ from: accounts[0], gas: 1000000 });
    const proposal = await votingSystem.methods.getProposal(0, 0).call();
    assert.equal(proposal['0'], 'proposalName');
    assert.equal(proposal['1'], 'desc');
  
    // User 2 cannot vote if hasn't been join to the organization 
    try {
      await votingSystem.methods.vote(0, 0, true).send({ from: accounts[1], gas: 1000000 });
    } catch (e) {
      assert.ok(e)
    }

    // User 2 joins
    await votingSystem.methods.join(0).send({ from: accounts[1] });
    // User 3 joins
    await votingSystem.methods.join(0).send({ from: accounts[2] });
    // User 4 joins
    await votingSystem.methods.join(0).send({ from: accounts[3] });

    // User 1 votes negatively
    await votingSystem.methods.vote(0, 0, false).send({ from: accounts[0] });

    // Proposal is not approved yet
    let isProposalApproved = await votingSystem.methods.isProposalApproved(0, 0).call({ from: accounts[0] });
    assert.equal(isProposalApproved, false);

    // Proposal reaches the sensitivity quorum
    await votingSystem.methods.vote(0, 0, true).send(
      { from: accounts[1] }
    );

    // Proposal reaches the sensitivity quorum
    await votingSystem.methods.vote(0, 0, true).send(
      { from: accounts[2] }
    );
    
    // Check if the proposal is approved
    isProposalApproved = await votingSystem.methods.isProposalApproved(0, 0).call({ from: accounts[1] });
    assert.equal(isProposalApproved, true);
  });

});


