import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../actions/index';
import {editProduct} from '../../actions/index';
import {browserHistory} from 'react-router';

import moment from 'moment';

import {bindActionCreators} from 'redux'


class Products extends Component {

    componentWillMount() {
        this.props.fetchProducts();
    }

    onClickProduct(e) {
        const idProduct = e.target.closest('tr').id;
        this.props.editProduct(idProduct);
        browserHistory.push(`/products/${idProduct}`);
    }

    render() {
        debugger;
        if (!this.props.fetched_data.products.length) return <div>Loading</div>;
        const products = this.props.fetched_data.products.map((product, inx) => {
            return (
                <tr key={product.id} id={product.id} onClick={ this.onClickProduct.bind(this)}>
                    <td>{inx+1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{moment(product.createdAt).format("MM-DD-YYYY HH:mm")}</td>
                    <td>{moment(product.updatedAt).format("MM-DD-YYYY HH:mm")}</td>
                </tr>
            )
        });

        return (
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

        )
    }
}


function mapStateToProps({fetched_data}) {
    return {
        fetched_data
    }
}

export default connect(mapStateToProps, {fetchProducts, editProduct})(Products);