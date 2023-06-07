import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NewOrg from './NewOrg';
import Organization from './Organization';
import NewProposal from './NewProposal';
import Proposal from './Proposal';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext, Accounts } from "./UserContext";

function Main () {
  const [user, setUser] = useState(Accounts[0]);
  
  return (
    <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/new-organization" element={<NewOrg />}></Route>
            <Route path="/organization/:organizationId" element={<Organization />}></Route>
            <Route path="/organization/:organizationId/new-proposal" element={<NewProposal />}></Route>
            <Route path="/organization/:organizationId/proposal/:proposalId" element={<Proposal />}></Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
