import './App.css';
import 'material-icons/iconfont/material-icons.css';
import { Link } from "react-router-dom";
import web3 from "./web3";
import Contract from "./Contract.js";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    async function getProposalCount() {
      const accounts = await web3.eth.getAccounts();
      const organizationCount = await Contract.methods.organizationCount().call();

      console.log("accounts", accounts)
      console.log("organizationCount", organizationCount)
    }
    getProposalCount();
  }, []);
  
  return (
    <>
      <div className="App">
        <h1>Collective decision-making system</h1>
        <div className="account-selector">
          Select account:  <select>
                <option name="val1">val1</option>
                <option name="val2">val1</option>
            </select>
        </div>
      </div>
      <div className="org-container">
        <Link to="/organization">
          <div className="org">
            <div>
              <span className="material-icons">domain</span>
            </div>
            <div>
              Organization
            </div>
          </div>
        </Link>

        <div className="org">
          <div>
            <span className="material-icons">domain</span>
          </div>
          <div>
            Organization
          </div>
        </div>

        <div className="org">
          <div>
            <span className="material-icons">domain</span>
          </div>
          <div>
            Organization
          </div>
        </div>

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
