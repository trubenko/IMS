import axios from 'axios';
import * as actionsTypes from './types'
import {browserHistory} from 'react-router'

export function fetchItems({invoice_id}) {
    let request = axios.get(`/api/invoices/${invoice_id}/items`);
    return {
        type: actionsTypes.FETCH_ITEMS,
        payload: request
    }
}

export function createItem(options) {
    let request = axios.post(`/api/invoices/${options.invoice_id}/items`, options);
    return {
        type: actionsTypes.CREATE_ITEM,
        payload: request
    }
}

export function editItem(options) {
    let request = axios.get(`/api/invoices/${options}/items/${options}`);
    return {
        type: actionsTypes.EDIT_INVOICE,
        payload: request
    }
}

export function updateItem(options) {
    debugger;
    let request = axios.put(`/api/invoices/${options.invoice_id}/items/${options.id}`, options);
    return {
        type: actionsTypes.UPDATE_ITEM,
        payload: request
    }
}

export function deleteItem({id, invoice_id}) {
    debugger;
    let request = axios.delete(`/api/invoices/${invoice_id}/items/${id}`);
    return {
        type: actionsTypes.DELETE_ITEM,
        payload: request
    }
}

// ===============================
export function createInvoice(options) {
    let request = axios.post('/api/invoices', options);
    return {
        type: actionsTypes.CREATE_INVOICE,
        payload: request
    }
}

export function fetchInvoices() {
    let request = axios.get('/api/invoices');
    return {
        type: actionsTypes.FETCH_INVOICES,
        payload: request
    }
}

export function editInvoice(id) {
    let request = axios.get(`/api/invoices/${id}`);
    return {
        type: actionsTypes.EDIT_INVOICE,
        payload: request
    }
}

export function updateInvoice(options){
    console.log(options);
    let request = axios.put(`/api/invoices/${options.id}`, options);
    return {
        type: actionsTypes.UPDATE_INVOICE,
        payload: request
    }
}


export function updateInvoiceItem(invoiceId, customerId){

    let request = axios.post(`/api/invoices/${invoiceId}/items`, {
        invoice_id: customerId,
        product_id: 5,
        quantity: 3
    });
    return {
        type: actionsTypes.UPDATE_INVOICE,
        payload: request
    }
}

// ==============================
export function createCustomer(options) {
    let request = axios.post('/api/customers', options);
    return {
        type: actionsTypes.CREATE_CUSTOMER,
        payload: request
    }
}

export function fetchCustomers() {
    let request = axios.get('/api/customers');
    return {
        type: actionsTypes.FETCH_CUSTOMERS,
        payload: request
    }
}

export function editCustomer(id) {
    const url = `/api/customers/${id}`;
    let request = axios.get(url);

    return {
        type: actionsTypes.EDIT_CUSTOMER,
        payload: request
    }
}

export function updateCustomer(id, values) {

    let request = axios.put(`/api/customers/${id}`, values);

    return {
        type: actionsTypes.UPDATE_CUSTOMER,
        payload: request
    }
}


// =======================
export function fetchProducts() {

    let request = axios.get('/api/products');
    return {
        type: actionsTypes.FETCH_PRODUCTS,
        payload: request
    }

}

export function editProduct(id) {
    const url = `/api/products/${id}`;
    let request = axios.get(url);

    return {
        type: actionsTypes.EDIT_PRODUCT,
        payload: request
    }
}

export function updateProduct(id, values) {

    let request = axios.put(`/api/products/${id}`, values);

    return {
        type: actionsTypes.UPDATE_PRODUCT,
        payload: request
    }
}



// =======================