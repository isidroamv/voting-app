import { createContext } from "react";
import web3 from "./web3";
export const Accounts = await web3.eth.getAccounts();
export const UserContext = createContext();
