import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm , change } from 'redux-form';
import {updateCustomer} from '../actions/index';
class FormProduct extends Component {

  /*  componentDidUpdate(){
        const { dispatch } = this.props;
        if( !this.props.prod_details.length ) return <div></div>;
        const [{name, price}] = this.props.prod_details;

        dispatch(change('product','name', name));
        dispatch(change('product','price', price));

    }*/

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        if( !this.props.prod_details.length ) return <div></div>;
        // const [{name, price}] = this.props.prod_details;
        // const [data] = this.props.prod_details;
        // dispatch(change('product','name', name));
        // dispatch(change('product','price', price));


        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field name="name" component="input" type="text" className="form-control"
                           placeholder="Enter name" value={name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <Field name="price" component="input" type="number" className="form-control"
                           placeholder="Enter amount" value={price} />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        )
    }
}


FormProduct = reduxForm({
    form: 'product',
    fields: ['name', 'price']
})(FormProduct);

export  default  connect(mapStateToProps)(FormProduct)