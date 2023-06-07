import './App.css';
import 'material-icons/iconfont/material-icons.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Contract from "./Contract.js";
import { useParams } from "react-router-dom";
import { UserContext } from './UserContext';
import AccountSelector from './AccountSelector';


function Organization() {
  const [proposals, setProposals] = useState({});
  const [organization, setOrganization] = useState({});
  const {organizationId} = useParams();
  const { user } = useContext(UserContext);
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState();
  
  useEffect(() => {
    init();
  }, [user]);

  const init = async () => {
    let organizationExists = await Contract.methods.organizationExists(organizationId).call();
    if (!organizationExists) {
      setError("This organization doesn't exist")
      return;
    }
    
    const hasJoined = await authCheck(user);
    let orgTmp = await Contract.methods.organizations(organizationId).call();
    setOrganization(orgTmp);

    if (!hasJoined) {
      return;
    }

    const proposalTmp = {}
    for(let i = 0; i < orgTmp.proposalCount; i++) {
      proposalTmp[i] = await Contract.methods.getProposal(organizationId, i).call({
        from: user
      });
    }
    setProposals(proposalTmp)
  }

  const authCheck = async (account) => {
    let hasJoinedTmp = false;
    try {
      const r = await Contract.methods.hasJoined(organizationId).call({
        from: account
      });
      hasJoinedTmp = r;
    } catch (e) {
      console.warn(e);
      hasJoinedTmp = false;
    }
    setHasJoined(hasJoinedTmp)
    return hasJoinedTmp;
  }

  const joinOrganization = async () => {
    try {
      const r = await Contract.methods.join(organizationId)
        .send({
          from: user,
          gas: 1500000
        });
      init();
      alert("You have joined the organization");
    } catch (e) {
      alert("Error when joining the organization");
    }
  }

  return (
    <>
      {error && <div>{error}</div>}
      {!error && <>
        <div className="App">
          <div>
            <Link to={`/`} className='btn-back'>
              <span className="material-icons">arrow_back</span>
            </Link>
            <h1>{organization.name}</h1>
          </div>
          <AccountSelector />
          <div>
            {!hasJoined && <>
              <div>You are not a member click on the button to join.</div>
              <button className='blue-button' onClick={joinOrganization}>Join</button>
            </>}
          </div>
        </div>
        {hasJoined &&
          <>
            <h1>Proposal List</h1>
            <div className="org-container">
              {Object.keys(proposals).map((key) => {
                return <Link to={`/organization/${organizationId}/proposal/${key}`}>
                  <div className="org">
                    <div>
                      <span className="material-icons">rocket</span>
                    </div>
                    <div>
                      {proposals[key][0]}
                    </div>
                  </div>
                </Link>
              })}

              <Link to={`/organization/${organizationId}/new-proposal`}>
                <div className="org new">
                  <div>
                    <span className="material-icons">rocket</span>
                  </div>
                  <div>
                    Add Proposal
                  </div>
                </div>
              </Link>
            </div>
          </>}
      </>}
    </>
  );
}

export default Organization;
