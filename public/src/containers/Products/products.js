import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../actions/index';
import {editProduct, createProduct} from '../../actions/index';
import {browserHistory, Link} from 'react-router';

import moment from 'moment';

class Products extends Component {
    constructor(props){
        super(props);

        this.state = {
            isNewForm: false,
        }
    }

    componentWillMount() {
        this.props.fetchProducts();
    }

    onClickProduct(e) {
        const idProduct = e.target.closest('tr').id;
        browserHistory.push(`/products/${idProduct}`)

    }

    createProduct(){
        console.log('ok')
    }


    render() {
        if (!this.props.fetched_data.products.length) return null;

        if(!this.state.isNewForm){}

        const products = this.props.fetched_data.products.map((product, inx) => {
            return (
                <tr key={product.id} id={product.id} onClick={ this.onClickProduct.bind(this)}>
                    <td>{inx + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{moment(product.createdAt).format("MM-DD-YYYY HH:mm")}</td>
                    <td>{moment(product.updatedAt).format("MM-DD-YYYY HH:mm")}</td>
                </tr>
            )
        });

        return (
            <div>
                <div className="text-center">
                    {/*<button className="btn btn-success" onClick={this.createProduct.bind(this)}>Create Product</button>*/}
                    <Link to="/products/new" className="btn btn-success">Create Product</Link>
                </div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Created</th>
                        <th>LastUpdated</th>
                    </tr>
                    </thead>
                    <tbody>
                    { products}
                    </tbody>
                </table>

            </div>


        )
    }


}


function mapStateToProps({fetched_data}) {
    return {
        fetched_data
    }
}

export default connect(mapStateToProps, {fetchProducts, editProduct, createProduct})(Products);