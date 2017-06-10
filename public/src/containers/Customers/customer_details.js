import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCustomer, editCustomer, deleteCustomer} from '../../actions/index';
import {Field, reduxForm, change} from 'redux-form';
import {browserHistory} from 'react-router'
import {Link} from 'react-router';


class CustomerDetails extends Component {

    onHandleSubmit(values) {
        this.props.updateCustomer(this.props.params.id, values);


    }

    onClickDelete(e) {
        this.props.deleteCustomer(this.props.params.id);
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        if (!this.props.cust_details.id) return null;

        const {name, address, phone} = this.props.cust_details;

        return (
            <div>
                <div style={{ overflow: 'auto', marginBottom:'10px'}}>
                    <Link to="/customers" className="pull-left btn btn-warning"> Back to customers</Link>
                    <button className="pull-right btn btn-danger" onClick={this.onClickDelete.bind(this)}>Delete</button>
                </div>
                <form onSubmit={handleSubmit(this.onHandleSubmit.bind(this))} className="invoice">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Field component="input" name="name" type="text" className="form-control"
                               placeholder="Enter name" value={name || ''}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Address</label>
                        <Field component="input" name="address" type="text" className="form-control"
                               placeholder="Enter address" value={address || ''}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Phone</label>
                        <Field component="input" name="phone" type="text" className="form-control"
                               placeholder="Enter name" value={phone || ''}/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {

    return {
        cust_details: state.cust_details,
        initialValues: state.cust_details
    }
}

CustomerDetails = reduxForm({
    form: 'invoice',
    values: ['name', 'address', 'phone'],
    enableReinitialize: true
})(CustomerDetails);

export default connect(mapStateToProps, {updateCustomer, editCustomer, deleteCustomer})(CustomerDetails);
