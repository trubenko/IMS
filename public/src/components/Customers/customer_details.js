import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCustomer} from '../../actions/index';
import {Field, reduxForm, change} from 'redux-form';
import {browserHistory} from 'react-router'
import {Link} from 'react-router';


class CustomerDetails extends Component {

    onHandleSubmit(values) {
        console.log(values);
        const {updateCustomer} = this.props;
        updateCustomer(this.props.params.id, values);

        browserHistory.push('/customers')
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        if (!this.props.cust_details.length) return <div></div>;
        const [{name, address, phone}] = this.props.cust_details;

        return (
            <div>
                <Link to="/customers" className="pull-right"> Back to customers</Link>
                <form onSubmit={handleSubmit(this.onHandleSubmit.bind(this))}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Field component="input" name="name" type="text" className="form-control"
                               placeholder="Enter name" value={name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Address</label>
                        <Field component="input" name="address" type="text" className="form-control"
                               placeholder="Enter address" value={address}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Phone</label>
                        <Field component="input" name="phone" type="text" className="form-control"
                               placeholder="Enter name" value={phone}/>
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
        initialValues: state.cust_details[0]
    }
}


CustomerDetails = reduxForm({
    form: 'customer',
    fields: ['name', 'address', 'phone']
})(CustomerDetails);


export default connect(mapStateToProps, {updateCustomer})(CustomerDetails);
