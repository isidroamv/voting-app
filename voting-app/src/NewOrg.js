import web3 from "./web3";
import Contract from "./Contract.js";
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import './App.css';
import 'material-icons/iconfont/material-icons.css';
import AccountSelector from "./AccountSelector";
import {UserContext} from "./UserContext";

function NewOrg() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [sensibity, setSensibity] = useState('');
  const { user } = useContext(UserContext);

  const createOrganization = async () => {
    try {
      const r = await Contract.methods.createOrganization(name, sensibity)
      .send({
        from: user,
        gas: 1500000
      });
      console.log(r)
      alert("Organization has been created");
    } catch (e) {
      console.warn(e);
      alert("Error when creating a organization");
    }
    navigate('/')

  }

  return (
    <>
      <div className="App">
        <div>
            <Link to={`/`} className='btn-back'>
              <span className="material-icons">arrow_back</span>
            </Link>
            <h1>Collective decision-making system</h1>
            <AccountSelector />
        </div>
      </div>
      <div className='createOrganization'>
        <div>
            <div className="account-selector">
                <label>Name:</label> <input type='text' onChange={(evt) => setName(evt.target.value)} value={name}/>
            </div>
            <div className="account-selector">
                <label>sensibity:</label> <input type='number' onChange={(evt) => setSensibity(evt.target.value)} value={sensibity}/>
            </div>
        </div>
        <div className='inlineFlex'>
            <div className='btn' onClick={createOrganization}>
                Create Organization
            </div>
        </div>
      </div>
    </>
  );
}

export default NewOrg;
