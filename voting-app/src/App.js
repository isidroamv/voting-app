import './App.css';
import 'material-icons/iconfont/material-icons.css';
import { Link } from "react-router-dom";
import web3 from "./web3";
import Contract from "./Contract.js";
import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import AccountSelector from './AccountSelector';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [organizations, setOrganizations] = useState({});
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    async function getProposalCount() {
      const accounts = await web3.eth.getAccounts();
      const organizationCount = await Contract.methods.organizationCount().call();
      setAccounts(accounts);

      const organizationsTmp = {}
      for(let i = 0; i < organizationCount; i++) {
        organizationsTmp[i] = await Contract.methods.organizations(i).call();
      }
      setOrganizations(organizationsTmp);
    }
    getProposalCount();
  }, []);
  
  return (
    <>
      <div className="App">
        <h1>Collective decision-making system</h1>
        <AccountSelector />
      </div>
      <div className="org-container">
        {Object.keys(organizations).map((key) => {
          return <Link to={"/organization/"+key}>
            <div className="org">
              <div>
                <span className="material-icons">domain</span>
              </div>
              <div>
                {organizations[key].name}
              </div>
            </div>
          </Link>
        })}

        <Link to="/new-organization">
          <div className="org new">
            <div>
              <span className="material-icons">add</span>
            </div>
            <div>
              Add organization
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default App;
