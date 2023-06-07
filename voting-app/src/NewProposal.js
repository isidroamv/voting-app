import { useContext, useEffect, useState } from 'react';
import Contract from "./Contract.js";

import './App.css';
import 'material-icons/iconfont/material-icons.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AccountSelector from './AccountSelector';
import { UserContext } from './UserContext';


function NewProposal() {
  const navigate = useNavigate();
  const {organizationId} = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getProposalCount() {

    }
    getProposalCount();
  }, []);

  const createProposal = async () => {
    try {
      const r = await Contract.methods.createProposal(organizationId, name, description)
        .send({
          from: user,
          gas: 1500000
        });
      alert("Proposal has been created");
    } catch (e) {
      console.warn(e);
      alert("Error when creating a proposal");
    }
    navigate(`/organization/${organizationId}`)
  }

  return (
    <>
      <div className="App">
        <div>
            <Link to={`organization/${organizationId}`} className='btn-back'>
              <span className="material-icons">arrow_back</span>
            </Link>
            <h1>Create new proposal</h1>
            <AccountSelector />
        </div>
      </div>
      <div className='createOrganization'>
        <div>
            <div className="account-selector">
                <label>Name:</label>
                <input type='text' onChange={(evt) => setName(evt.target.value)} value={name}  />
            </div>
            <div className="account-selector">
                <label>Description:</label>
                <input type='text' onChange={(evt) => setDescription(evt.target.value)} value={description} />
            </div>
        </div>
        <div className='inlineFlex'>
            <div className='btn' onClick={createProposal}>
                Create Proposal
            </div>
        </div>
      </div>
    </>
  );
}

export default NewProposal;
