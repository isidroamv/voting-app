import './App.css';
import 'material-icons/iconfont/material-icons.css';
import { Link } from "react-router-dom";

function Organization() {
  return (
    <>
      <div className="App">
        <h1>Proposal list</h1>
        <div className="account-selector">
          Select account:  <select>
                <option name="val1">val1</option>
                <option name="val2">val1</option>
            </select>
        </div>
      </div>
      <div className="org-container">
        <Link to="/proposal">
          <div className="org">
            <div>
              <span className="material-icons">rocket</span>
            </div>
            <div>
              Proposal
            </div>
          </div>
        </Link>
        

        <div className="org">
          <div>
            <span className="material-icons">rocket</span>
          </div>
          <div>
            Proposal
          </div>
        </div>

        <div className="org">
          <div>
            <span className="material-icons">rocket</span>
          </div>
          <div>
            Proposal
          </div>
        </div>

        <Link to="/new-proposal">
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
    </>
  );
}

export default Organization;
