import './App.css';
import React from 'react';
import {Header} from './components/Header';
import {Balance} from './components/Balance';
import {IncomeExpenses} from './components/IncomeExpenses';
import {Transactions} from './components/Transactions';
import {AddTransactions} from './components/AddTransactions';

import {GlobalProvider} from './context/GlobalStates';


function App() {
  return (
    <GlobalProvider>
    <div>
      <Header/>
      <div className="container"></div>
         <Balance />
         <IncomeExpenses />
         <Transactions />
         <AddTransactions />
    </div>
    </GlobalProvider>
  );
}

export default App;