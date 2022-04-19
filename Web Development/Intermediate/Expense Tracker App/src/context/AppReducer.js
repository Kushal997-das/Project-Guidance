export default (state, action) => {
    switch(action.type) {
        case 'Delete_All':
            return {
                ...state,
                transactions: state.transactions.filter(transactions => transactions.id !==
                    action.payload)
            };
        case 'Add_All':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        default:
            return state;
    }
}