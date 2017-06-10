import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createCustomer} from '../../actions/index';
import {browserHistory} from 'react-router'
import {Link} from 'react-router';


class CustomerDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            address:'',
            phone: ''
        }
    }

    onHandleSubmit(e) {
        e.preventDefault();

        const {createCustomer} = this.props;
        createCustomer(this.state);


    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;


        return (
            <div>
                <Link to="/customers" className="pull-right"> Back to customers</Link>
                <form onSubmit={this.onHandleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input name="name" type="text" className="form-control" onChange={e=> this.setState({name: e.target.value})}
                               placeholder="Enter name" value={this.state.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Address</label>
                        <input name="address" type="text" className="form-control" onChange={e=> this.setState({address: e.target.value})}
                               placeholder="Enter address" value={this.state.address}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Phone</label>
                        <input name="phone" type="text" className="form-control"  onChange={e=> this.setState({phone: e.target.value})}
                               placeholder="Enter name" value={this.state.phone}/>
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

export default connect(null, {createCustomer})(CustomerDetails);
