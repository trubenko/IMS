import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateProduct, editProduct, deleteProduct} from '../../actions/index';
import {Field, reduxForm, change} from 'redux-form';
import {browserHistory} from 'react-router'
import {Link} from 'react-router';

class ProductDetails extends Component {
    componentWillMount() {
        this.props.editProduct(this.props.params.id);
    }

    onHandleSubmit(values) {
        this.props.updateProduct(this.props.params.id, values);
    }

    onClickDelete(){
        this.props.deleteProduct(this.props.params.id)
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        if (!this.props.prod_details.id) return null;
        const {name, price} = this.props.prod_details;

        return (
            <div>
                <div style={{ overflow: 'auto', marginBottom:'10px'}}>
                    <Link to="/products" className="pull-left btn btn-warning"> Back to products</Link>
                    <button className="pull-right btn btn-danger" onClick={this.onClickDelete.bind(this)}>Delete</button>
                </div>
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
        initialValues: state.prod_details
    }
}


ProductDetails = reduxForm({
    form: 'product',
    enableReinitialize: true
})(ProductDetails);


export default connect(mapStateToProps, {updateProduct, editProduct, deleteProduct})(ProductDetails);
