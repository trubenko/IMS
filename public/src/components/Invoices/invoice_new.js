import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    fetchCustomers,
    createInvoice
} from '../../actions/index';
import {Link, browserHistory} from 'react-router';

import {Typeahead} from 'react-bootstrap-typeahead';


class InvoiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discount: 0,
            customer_id: 0
        }

    }

    onChangeCustomer(customer) {
        console.log('new');
     if (!customer.length) return;

        this.setState({customer_id:customer[0].id});


    }

    onClickSave(e){
         this.props.createInvoice(this.state);
         browserHistory.push('/invoices');
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    componentWillMount() {
        this.props.fetchCustomers();
    }

    render() {

        return (
            <div>
                <Link to="/invoices">Back to invoices</Link>
                <div className="invoice-block">

                    <div className="invoice-header container-fluid">
                        <div className="form-group">
                            <label htmlFor="customer col-xs-1">Discount:</label>
                            <input type="number" min="0" className="form-control" value={this.state.discount} onChange={e => this.setState({discount:e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="customer col-xs-1">Customer:</label>
                            <Typeahead
                                allowNew
                                newSelectionPrefix="Add a new customer: "
                                ref="customer_input"
                                onChange={this.onChangeCustomer.bind(this)}
                                maxResults={5}
                                paginate={true}
                                labelKey="name"
                                options={this.props.fetched_data.customers}
                                placeholder="Choose a customer..."
                            />
                        </div>

                    </div>
                </div>
                <span className="btn btn-danger pull-right" onClick={this.onClickSave.bind(this)} style={{ marginTop: '10px'}}>Save invoice</span>
            </div>
        )


    }
}


function mapStateToProps(state) {
    return {
        fetched_data: state.fetched_data
    }
}

export default connect(mapStateToProps, {fetchCustomers, createInvoice})(InvoiceDetails);
