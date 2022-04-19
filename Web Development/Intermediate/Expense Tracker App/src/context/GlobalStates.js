import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    transactions: []
}

// Create context

export const GlobalContext = createContext(initialState);

//Components
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions 
    function deleteTransaction(id) {
        dispatch({
            type: 'Delete_All',
            payload: id
        });
    }
    function addTransaction(transaction) {
        dispatch({
            type: 'Add_All',
            payload: transaction
        });
    }

    return (<GlobalContext.Provider value={ {
       transactions: state.transactions,
       deleteTransaction,
       addTransaction
    }}>
    {children}
    </GlobalContext.Provider>);
}

