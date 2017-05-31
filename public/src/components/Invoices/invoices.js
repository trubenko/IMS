import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    fetchInvoices,
    createInvoice,
    editInvoice,
    fetchCustomers
} from '../../actions/index';
import { browserHistory, Link } from 'react-router';

import {bindActionCreators} from 'redux'


class Invoices extends Component {

    componentWillMount() {
        this.props.fetchInvoices();
        this.props.fetchCustomers();
    }

    onClickInvoice(e) {
        const {id} = e.target.closest('tr');
        this.props.editInvoice(id);
        browserHistory.push(`/invoices/${id}`);
    }


    render() {
        if (!this.props.fetched_data.invoices.length || !this.props.fetched_data.customers.length) return <div>
            Loading</div>;

        let {invoices} = this.props.fetched_data;
        let {customers} = this.props.fetched_data;

        invoices = invoices.map((invoice, inx) => {

            let [customer] = customers.filter((customer) => customer.id == invoice.customer_id);
            let name;
            if( customer == null)  { return }
            name = customer.name;

            return (
                <tr key={invoice.id}
                    id={invoice.id}
                    data-customerid={invoice.customer_id}
                    onClick={ this.onClickInvoice.bind(this)}>
                    <td>{inx+1}</td>
                    <td>{name || 'N/A'}</td>
                    <td>{invoice.discount || 'N/A'}</td>
                    <td>{invoice.total || 'N/A'}</td>
                </tr>
            )
        });
        return (
            <div>
                <Link to="/invoices/new"> <span className="pull-right btn btn-danger"> Create invoice</span></Link>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Customer</th>
                        <th>Discount</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    { invoices }
                    </tbody>
                </table>


            </div>
        )
    }
}


function mapStateToProps({fetched_data}) {
    return {
        fetched_data
    }
}

export default connect(mapStateToProps, {fetchInvoices, createInvoice, editInvoice, fetchCustomers})(Invoices);