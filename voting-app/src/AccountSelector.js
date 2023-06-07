import web3 from "./web3";
import { UserContext, Accounts } from './UserContext';
import { useContext, useEffect, useState } from "react";


function AccountSelector () {
    const { user, setUser } = useContext(UserContext);
    const [accounts, setAccounts] = useState(Accounts);

    const changeActiveAccount = (event) => {
        setUser(event.target.value);
        web3.eth.default = event.target.value;
    }

    return (
        <div className="account-selector">
            Select account:  
            <select onChange={changeActiveAccount} value={user}>
            {accounts.map(element => {
                return <option key={element} name={element}>{element}</option>
            })}
            </select>
        </div>
    );
}

export default AccountSelector;
