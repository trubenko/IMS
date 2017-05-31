import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateProduct} from '../../actions/index';
import {Field, reduxForm, change} from 'redux-form';
import {browserHistory} from 'react-router'
import {Link} from 'react-router';


class ProductDetails extends Component {

    onHandleSubmit(values) {
        console.log(values);
        const {updateProduct} = this.props;
        updateProduct(this.props.params.id, values);

        browserHistory.push('/products')
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        if (!this.props.prod_details.length) return <div></div>;
        const [{name, price}] = this.props.prod_details;
        return (
            <div>
                <Link to="/products" className="pull-right"> Back to products</Link>
                <form onSubmit={handleSubmit(this.onHandleSubmit.bind(this))}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Field component="input" name="name" type="text" className="form-control"
                               placeholder="Enter name" value={name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <Field component="input" name="price" type="number" className="form-control"
                               placeholder="Enter amount" value={price}/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        prod_details: state.prod_details,
        initialValues: state.prod_details[0]
    }
}


ProductDetails = reduxForm({
    form: 'product',
    fields: ['name', 'price']
})(ProductDetails);


export default connect(mapStateToProps, {updateProduct})(ProductDetails);
