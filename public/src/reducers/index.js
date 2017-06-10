import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import fetched_data from './fetch_data'

import prod_details from './products_reducer'
import cust_details from './customers_reducer'
import inv_details from './invoices_reducer'



const rootReducer = combineReducers({
    fetched_data,
    form:formReducer,
    prod_details,
    cust_details,
    inv_details

})

export default rootReducer;