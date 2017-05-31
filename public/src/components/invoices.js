import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchInvoices} from '../actions/index';

import {bindActionCreators} from 'redux'


class Invoices extends Component {

    componentWillMount() {
        this.props.fetchInvoices();
    }

    render() {
        if (!this.props.fetched_data.invoices.length) return <div>Loading</div>;
        const invoices = this.props.fetched_data.invoices.map((inv) => {
            return (
                <tr key={inv.id}>
                    <td>{'None'} </td>
                    <td> {'None'} </td>
                    <td>{ 1 } </td>
                    <td>{ inv.discount} </td>
                    <td>{ inv.total} </td>
                </tr>
            )
        });

        return (
            <div>
                <table className="table" >
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Total</th>
                    </tr>
                    { invoices}
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

export default connect(mapStateToProps, {fetchInvoices})(Invoices);