import React, {useContext} from 'react';
import { TransactionList } from './TransactionList';


import { GlobalContext } from '../context/GlobalStates';

export const Transactions = () => {
   const {transactions} = useContext(GlobalContext);
   
   return (
        <>
            <h3>History</h3>
            <ul className="list">
            {transactions.map(transactions => (<TransactionList key ={transactions.id} 
            transactions= {transactions}

              />))}
            </ul>
        </>
    )
}
