import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './components/app'


import Invoices from './containers/Invoices/invoices'
import InvoiceDetails from './containers/Invoices/invoice_details'
import InvoiceNew from './containers/Invoices/invoice_new'

import Products from './containers/Products/products'
import ProductDetails from './containers/Products/product_details'
import ProductNew from './containers/Products/product_new'

import Customers from './containers/Customers/customers'
import CustomerDetails from './containers/Customers/customer_details'
import CustomerNew from './containers/Customers/customer_new'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Customers}/>
        <Route path="/customers" component={Customers}/>
        <Route path="/customers/new" component={CustomerNew}/>
        <Route path="/customers/:id" component={CustomerDetails}/>
        <Route path="/products" component={Products}/>
        <Route path="/products/new" component={ProductNew}/>
        <Route path="/products/:id" component={ProductDetails}/>
        <Route path="/invoices" component={Invoices}/>
        <Route path="/invoices/new" component={InvoiceNew}/>
        <Route path="/invoices/:id" component={InvoiceDetails}/>
        <Route path="/invoices/:id/item" component={Invoices}/>
        <Route path="/invoices/:id/item/:id" component={Invoices}/>
    </Route>
)