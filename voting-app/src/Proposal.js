import { useContext, useEffect, useState } from 'react';
import AccountSelector from './AccountSelector';
import './App.css';
import 'material-icons/iconfont/material-icons.css';
import Contract from "./Contract.js";
import { Link, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';

function Proposal() {
  const {organizationId, proposalId} = useParams();
  const {user} = useContext(UserContext);
  const [proposal, setProposal] = useState({});
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [hasFinalized, setHasFinalized] = useState(false);
  const [isProposalApproved, setIsProposalApproved] = useState(false);

  useEffect(() => {
    init()
  }, [user]);

  const init = async () => {
    try {
      const proposalTmp = await Contract.methods.getProposal(organizationId, proposalId).call({
        from: user
      });
      setProposal(proposalTmp);
      console.log(proposalTmp)

      const hasVotedTmp = await Contract.methods.hasVoted(organizationId, proposalId).call({
        from: user
      });
      setHasVoted(hasVotedTmp);

      const hasFinalized = await Contract.methods.hasFinalizePropopsal(organizationId, proposalId).call({
        from: user
      });
      setHasFinalized(hasFinalized);
      if (hasFinalized) {
        const isProposalApprovedTmp = await Contract.methods.isProposalApproved(organizationId, proposalId).call({
          from: user
        });
        setIsProposalApproved(isProposalApprovedTmp);
      }

      setError(null);
    } catch(e) {
      setError(e.toString())
    }
  }

  const voteNo = async () => vote(false);

  const voteYes = async () => vote(true);

  const vote = async (vote) => {
    try {
      await Contract.methods.vote(organizationId, proposalId, vote).send({
        from: user
      });
      init();
      alert("Voted yes");
    } catch (e) {
      alert("Not able to vote")
    }
  }

  const finalizeProposal = async () => {
    try {
      await Contract.methods.finalizeProposal(organizationId, proposalId).send({
        from: user
      });
      init();
      alert("Finalized proposal"); 
    } catch (e) {
      alert("Not able to finalize proposal")
    }
  }

  return (
    <>
      <div className="App">
        <div>
          <Link to={`/organization/${organizationId}`} className='btn-back'>
            <span className="material-icons">arrow_back</span>
          </Link>
        </div>
        <h1>Proposal</h1>
        <AccountSelector />
      </div>
      {error && <div>{error}</div>}
      {!error && <div className='createOrganization'>
        <div>
            <div className="detail-label">
                <label>Name:</label> {proposal[0]}
            </div>
            <div className="detail-label">
                <label>Description:</label> {proposal[1]}
            </div>
            <div className="detail-label">
                <label>Positive votes:</label> {proposal[2]}
            </div>
            <div className="detail-label">
                <label>Negative votes:</label> {proposal[3]}
            </div>

        </div>
        <div>
            {!hasVoted && <div className='btn yes' onClick={voteYes}>Vote yes</div>}
            {!hasVoted && <div className='btn no' onClick={voteNo}>Vote no</div>}

            {hasFinalized && isProposalApproved && <div className='btn yes'>Proposal is approved</div>}
            {hasFinalized && !isProposalApproved && <div className='btn no'>Proposal is not approved</div>}
            {!hasFinalized && <div className='btn' onClick={finalizeProposal}>
                Finalize proposal 
            </div>}
        </div>
      </div>}
    </>
  );
}

export default Proposal;
