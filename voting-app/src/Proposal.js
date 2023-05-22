import './App.css';
import 'material-icons/iconfont/material-icons.css';

function Proposal() {
  return (
    <>
      <div className="App">
        <h1>Proposal</h1>
      </div>
      <div className='createOrganization'>
        <div>
            <div class="detail-label">
                <label>Name:</label> Nombre
            </div>
            <div class="detail-label">
                <label>Description:</label> Description
            </div>
            <div class="detail-label">
                <label>Positive votes:</label> 10
            </div>
            <div class="detail-label">
                <label>Negative votes:</label> 10
            </div>

        </div>
        <div className='inlineFlex'>
            <div className='btn'>
                Finalize proposal 
            </div>
        </div>
      </div>
    </>
  );
}

export default Proposal;
