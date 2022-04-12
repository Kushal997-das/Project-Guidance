import React , {useState,useContext} from 'react'
import { GlobalContext } from '../context/GlobalStates';


export const AddTransactions = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const {addTransaction} = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random() * 1000000),
            text,
            amount: +amount
        }
        addTransaction(newTransaction);
    }

    return (
       <>
           <h3>Add New Transactions</h3>
           <form onSubmit={onSubmit}>
               <div className="form-control" id="box">
                   <input type="text" value = {text}  onChange = {(e) => setText(e.target.value) }  placeholder="Enter Text" />
               </div>
               <div className="form-control">
                   <label htmlFor="amount">Amount:
                   </label>
                   <input type="number"  value = {amount}  onChange = {(e) => setAmount(e.target.value) }  placeholder="Enter Amount"  id="box"/>
               </div>
               <button class="btn">Add Transaction</button>
           </form>
       </>
    )
}
export default AddTransactions;