import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCustomers, editCustomer} from '../../actions/index';
import {browserHistory, Link}  from  'react-router';

import {bindActionCreators} from 'redux'


class Customers extends Component {

    componentWillMount() {
        this.props.fetchCustomers();
    }

    onClickProduct(e) {
        const idCustomer = e.target.closest('li').id;
        this.props.editCustomer(idCustomer);
        browserHistory.push(`/customers/${idCustomer}`);
    }

    render() {
        if (!this.props.fetched_data.customers.length) return <div>Loading</div>;
        const customers = this.props.fetched_data.customers.map((customer) => {
            return (
                <li className="item text-center" key={customer.id} id={customer.id} onClick={this.onClickProduct.bind(this)}>
                    <p><strong>{customer.name}</strong></p>
                    <div>{customer.address}</div>
                    <div><em>{customer.phone}</em></div>
                </li>
            )
        });

        return (
            <div>
                <Link to="/customers/new">
                    <span className="pull-right btn btn-danger">Create Customer</span>
                </Link>
                <ul className="list-customers">
                    { customers }
                </ul>
            </div>
        )
    }
}

function mapStateToProps({fetched_data}) {
    return {
        fetched_data
    }
}

export default connect(mapStateToProps, {fetchCustomers, editCustomer})(Customers);