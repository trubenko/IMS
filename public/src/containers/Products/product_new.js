import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createProduct} from '../../actions/index';
import {Field, reduxForm, change} from 'redux-form';
import {browserHistory} from 'react-router'
import {Link} from 'react-router';

class ProductDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            price:''
        }
    }

    onHandleSubmit(values) {
        this.props.createProduct(values);
    }


    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        return (
            <div>
                <div style={{ overflow: 'auto', marginBottom:'10px'}}>
                    <Link to="/products" className="pull-left btn btn-warning"> Back to products</Link>
                </div>
                <form onSubmit={handleSubmit(this.onHandleSubmit.bind(this))}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <Field component="input" name="name" type="text" className="form-control"
                               placeholder="Enter name" value={this.state.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <Field component="input" name="price" type="number" className="form-control"
                               placeholder="Enter amount" value={this.state.price}/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
}


ProductDetails = reduxForm({
    form: 'product',
    enableReinitialize: true
})(ProductDetails);


export default connect(null, {createProduct})(ProductDetails);
