import './App.css';
import 'material-icons/iconfont/material-icons.css';

function NewProposal() {
  return (
    <>
      <div className="App">
        <div>
            <h1>Create new proposal</h1>
            <div className="account-selector">
            Select account:  <select>
                    <option name="val1">val1</option>
                    <option name="val2">val1</option>
                </select>
            </div>
        </div>
      </div>
      <div className='createOrganization'>
        <div>
            <div class="account-selector">
                <label>Name:</label> <input type='text' />
            </div>
            <div class="account-selector">
                <label>Description:</label> <input type='text' />
            </div>
        </div>
        <div className='inlineFlex'>
            <div className='btn'>
                Create Proposal
            </div>
        </div>
      </div>
    </>
  );
}

export default NewProposal;
