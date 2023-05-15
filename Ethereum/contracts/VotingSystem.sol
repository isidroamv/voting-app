// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VotingSystem {


    /* Users should join a organization to create proposals
    * The field sensitivity is the quorum required to approve the proposal
    */
    struct Organization {
        string name;
        uint256 sensitivity; // 0-100
        uint256 proposalCount;
        address creator;
        mapping(address => bool) hasJoined;
        mapping(uint256 => Proposal) proposals;
    }

    /* This structure is to define a simple proposal.
    * The decision are taken based on the result of proposals.
    * Any user can create a proposal and any user in the same organization can vote.
    */
    struct Proposal {
        string name;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        mapping(address => bool) hasVoted;
        bool isEnded;
    }

    // Organization list
    mapping(uint256 => Organization) public organizations;
    // Variable to count the number of organizations
    uint256 public organizationCount;
    
    // Events are called when the function is completed
    event OrganizationCreated(uint256 organizationId, string name, uint256 sensitivity);
    event ProposalCreated(uint256 organizationId, uint256 proposalId, string name, string description);
    event Voted(uint256 proposalId, bool inSupport);
    event ProposalEnd(uint256 organizationId, uint256 proposalId);

    // User can join an organization
    function join(uint256 organizationId) public {
        require(!organizations[organizationId].hasJoined[msg.sender], "Already joined");
        organizations[organizationId].hasJoined[msg.sender] = true;
    }

    // Any user can create an organization
    function createOrganization(string memory name, uint256 sensitivity) public returns (uint256) {
        uint256 organizationId = organizationCount++;
        Organization storage p = organizations[organizationId];

        p.name = name;
        p.sensitivity = sensitivity;
        p.creator = msg.sender;
        emit OrganizationCreated(organizationId, name, sensitivity);

        return organizationId;
    }

    // A proposal can be created if the member belongs to an organization
    function createPropose(uint256 organizationId, string memory name, string memory description) public returns (uint256) {
        require(organizations[organizationId].hasJoined[msg.sender], "Not a member");

        uint256 proposalId = organizations[organizationId].proposalCount++;
        Proposal storage p = organizations[organizationId].proposals[proposalId];
        p.name = name;
        p.description = description;

        emit ProposalCreated(organizationId, proposalId, name, description);

        return proposalId;
    }

    // Users in the same organization can vote for or against the proposal
    function vote(uint256 organizationId, uint256 proposalId, bool inSupport) public {
        require(proposalId < organizations[organizationId].proposalCount, "Invalid proposal id");
        require(organizations[organizationId].hasJoined[msg.sender], "Not a member");
        Proposal storage p = organizations[organizationId].proposals[proposalId];

        require(!p.hasVoted[msg.sender], "Already voted");

        p.hasVoted[msg.sender] = true;

        if (inSupport) {
            p.yesVotes++;
        } else {
            p.noVotes++;
        }

        emit Voted(proposalId, inSupport);
    }

    // Function to vertify is the propsal is approved
    function isProposalApproved(uint256 organizationId, uint256 proposalId) public view returns (bool) {
        require(proposalId < organizations[organizationId].proposalCount, "Invalid proposal id");
        require(organizations[organizationId].hasJoined[msg.sender], "Not a member");
        Proposal storage p = organizations[organizationId].proposals[proposalId];

        uint256 totalVotes = p.yesVotes + p.noVotes;
        uint256 threshold = totalVotes * organizations[organizationId].sensitivity / 100;

        return p.yesVotes > threshold;
    }

    // Any user can finalize the proposal. After finalizing the proposal, users cannot vote.
    function finalizeProposal(uint256 organizationId, uint256 proposalId) public {
        require(organizations[organizationId].hasJoined[msg.sender], "Not a member");
        require(proposalId < organizations[organizationId].proposalCount, "Invalid proposal id");
        Proposal storage p = organizations[organizationId].proposals[proposalId];
        require(!p.isEnded, "Proposal already ended");
        p.isEnded = true;

        emit ProposalEnd(organizationId, proposalId);
    }

    // Function to retrieve the proposal
    function getProposal (uint256 organizationId, uint256 proposalId) public view  
    returns (string memory, string memory, uint256, uint256, bool) {
        require(proposalId < organizations[organizationId].proposalCount, "Invalid proposal id");
        require(organizations[organizationId].hasJoined[msg.sender], "Not a member");
        Proposal storage p = organizations[organizationId].proposals[proposalId];
        return (p.name, p.description, p.yesVotes, p.noVotes, p.isEnded);
    }

}