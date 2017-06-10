import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCustomers, editCustomer, newForm} from '../../actions/index';
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
    createCustomer(){
        this.props.newForm(true);
        console.log(this.props.new_form)

    }

    render() {
        if (!this.props.fetched_data.customers.length) return <div>Loading</div>;
        const customers = this.props.fetched_data.customers.map((customer) => {
            return (
                <li className="item text-center" key={customer.id} id={customer.id}
                    onClick={this.onClickProduct.bind(this)}>
                    <p><strong>{customer.name}</strong></p>
                    <div>{customer.address}</div>
                    <div><em>{customer.phone}</em></div>
                </li>
            )
        });

        return (
            <div>
                <div style={{ textAlign:'center', marginBottom:'10px'}}>
                        {/*<span onClick={this.createCustomer.bind(this)} className=" btn btn-success">Create Customer</span>*/}
                    <Link to="/customers/new" className="btn btn-success">Create Customer</Link>
                </div>
                <ul className="list-customers">
                    { customers }
                </ul>
            </div>
        )
    }
}

function mapStateToProps({fetched_data, new_form}) {
    return {
        fetched_data,
        new_form

    }
}

export default connect(mapStateToProps, {fetchCustomers, editCustomer, newForm})(Customers);