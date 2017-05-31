import {
    FETCH_INVOICES,
    FETCH_PRODUCTS,
    FETCH_CUSTOMERS,
    FETCH_ITEMS
} from '../actions/types'

const INITIAL_STATE = {
        customers: [],
        products: [],
        invoices: []
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_INVOICES:
            return {...state, invoices: action.payload.data }
        case FETCH_CUSTOMERS:
            return {...state, customers:action.payload.data }
        case FETCH_PRODUCTS:
            return {...state, products: action.payload.data }
        case FETCH_ITEMS:
            return {...state, items: action.payload.data }
        default:
            return state;
    }
}