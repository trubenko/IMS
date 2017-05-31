import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './components/app'


import Invoices from './components/Invoices/invoices'
import InvoiceDetails from './components/Invoices/invoice_details'
import InvoiceNew from './components/Invoices/invoice_new'

import Products from './components/Products/products'
import ProductDetails from './components/Products/product_details'

import Customers from './components/Customers/customers'
import CustomerDetails from './components/Customers/customer_details'
import CustomerNew from './components/Customers/customer_new'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={CustomerNew}/>
        <Route path="/customers" component={Customers}/>
        <Route path="/customers/new" component={CustomerNew}/>
        <Route path="/customers/:id" component={CustomerDetails}/>
        <Route path="/products" component={Products}/>
        <Route path="/products/:id" component={ProductDetails}/>
        <Route path="/invoices" component={Invoices}/>
        <Route path="/invoices/new" component={InvoiceNew}/>
        <Route path="/invoices/:id" component={InvoiceDetails}/>
        <Route path="/invoices/:id/item" component={Invoices}/>
        <Route path="/invoices/:id/item/:id" component={Invoices}/>
    </Route>
)