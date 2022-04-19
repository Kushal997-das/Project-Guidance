import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalStates';


export const TransactionList = ({transactions}) => {
   const {deleteTransaction} = useContext(GlobalContext);


    const sign = transactions.amount < 0 ? '-' : '+';
    return (
        <li className={transactions.amount < 0  ? 'minus' : 'plus'}>
            {transactions.text}<span>
            {sign}${transactions.amount} </span> <button className="delete-btn" onClick={() =>
            deleteTransaction(transactions.id) }>X</button>
        </li>
    )
}