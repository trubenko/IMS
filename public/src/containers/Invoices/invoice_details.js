import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    fetchCustomers,
    fetchProducts,
    updateInvoice,
    editInvoice,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
} from '../../actions/index';

import {reduxForm} from 'redux-form';
import {Typeahead} from 'react-bootstrap-typeahead';


class InvoiceDetails extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.fetchCustomers();
        this.props.fetchProducts();
        this.props.fetchItems({invoice_id: this.props.params.id});
    }

    componentDidMount() {
        this.props.editInvoice(this.props.params.id);
    }

    onItemSelected(customer) {
        if (!customer.length) return;

        const customerId = customer[0].id;
        const invoiceId = this.props.params.id;

        const options = {
            id: invoiceId,
            customer_id: customerId,
        };
        this.props.updateInvoice(options);

        $("#customer_name").html(customer[0].name);
        this.calcTotal();

    }

    onProductSelected(product) {
        if (!product.length) return;

        let [{id, name, price, createdAt, updatedAt}] = product;

        this.refs.product_input.getInstance().clear();
        this.props.createItem({invoice_id: this.props.params.id, product_id: id, quantity: 1});
        this.props.fetchItems({invoice_id: this.props.params.id});

        let total = this.calcTotal();
        this.props.updateInvoice({total: total, id: this.props.params.id})

    }

    onClickProduct(e) {

        let $elem = $(e.target);

        if ($elem.hasClass('down') || $elem.hasClass('up')) {

            let quantity = +($elem.siblings('.count').html());
            let price = $elem.parents('tr').find('.price').data('price');

            if ($elem.hasClass('down')) {

                if (quantity == 1) return;
                $elem.siblings('.count').html(--quantity);
            }

            if ($elem.hasClass('up')) {
                $elem.siblings('.count').html(++quantity);
            }

            $elem.parents('tr').find('.price').html((quantity * price).toFixed(2));

            let itemId = $elem.parents('tr').prop('id');
            let invId = this.props.params.id;

            this.props.updateItem({id: itemId, quantity: quantity, invoice_id: invId});
            let total = this.calcTotal();
            this.props.updateInvoice({discount: $('#discount').val(), total: total, id: invId})
        }

        if ($elem.hasClass('delete')) {
            debugger;
            let prodId = $elem.parents('table').prop('del');
            this.props.deleteItem({invoice_id: this.props.params.id , id:prodId});

            $(`#${prodId}`).remove();

            let total = this.calcTotal();
            this.props.updateInvoice({discount: $('#discount').val(), total: total, id: this.props.params.id});

            $('#myModal').modal('hide');
            $('.modal-backdrop').hide();

        }

    }


    calcTotal() {
        let prices = $('#invoice-table .price').get();
        let amount = 0;
        prices.forEach(function (tr) {
            if (isNaN(+tr.innerHTML)) return;
            amount += +tr.innerHTML;
        });

        let discount = $('#discount').val();
        if (discount == 0) discount = 100;

        let total = amount - (amount * discount / 100);
        $('#total').val(total.toFixed(2));

        return total.toFixed(2);

    }

    onChangeDiscount(e) {
        let total = this.calcTotal();
        this.props.updateInvoice({discount: e.target.value, total: total, id: this.props.params.id})

    }

    onClickDelete(e) {
        debugger;
        let $elem = $(e.target);
        $elem.parents('table').prop('del', $elem.parents('tr').prop('id'));
        this.renderProducts();

    }
    componentDidUpdate(){
        this.calcTotal()
    }

    renderProducts() {
        if (this.props.fetched_data.items == null || this.props.fetched_data.items == 0) {
            return <tr>
                <td>No product added</td>
            </tr>
        }

        let {items} = this.props.fetched_data;
        let {products} = this.props.fetched_data;


        let listItems = items.map(({id, invoice_id, product_id, quantity}) => {

            let [{name, price}] = products.filter((product) => product.id == product_id);

            return (
                <tr id={id} key={id} data-product-id={product_id} onClick={this.onClickProduct.bind(this)}>
                    <td width="60%">{name}</td>
                    <td>
                        <div className="counter">
                            <span className="down">—</span>
                            <span className="count">{quantity}</span>
                            <span className="up">+</span>
                        </div>
                    </td>
                    <td className="price" data-price={price}>{(price * quantity).toFixed(2)}</td>
                    <td className="text-right">
                        <div className="btn btn-danger" data-toggle="modal" data-target="#myModal"
                             onClick={this.onClickDelete.bind(this)}>Delete
                        </div>

                        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby={id}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span></button>
                                        <h4 className="modal-title" id={id}>Confirm your action!</h4>
                                    </div>
                                    <div className="modal-body">
                                        Do you really want to delete product?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Cancel
                                        </button>
                                        <button type="button" className="btn btn-danger delete">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </td>
                </tr>
            )
        });


        return listItems;
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        if (this.props.fetched_data.customers.length && this.props.inv_details.length) {

            let {customers}   = this.props.fetched_data;
            let [{customer_id, discount, total}] = this.props.inv_details;

            let result = customers.filter((customer) => customer.id == customer_id);

            $('#customer_name').html(result[0].name);
            $('#discount').val(discount);
            $('#total').val(total);

        }


        return (
            <div className="invoice-block">
                <div className="invoice-header container-fluid">
                    <div className="form-group">
                        <label htmlFor="customer col-xs-1">Customer:</label>
                        <Typeahead
                            ref="customer_input"
                            onChange={this.onItemSelected.bind(this)}
                            maxResults={5}
                            paginate={true}
                            labelKey="name"
                            options={this.props.fetched_data.customers}
                            placeholder="Choose a customer..."
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customer col-xs-1">Products:</label>
                        <Typeahead
                            ref="product_input"
                            labelKey="name"
                            options={this.props.fetched_data.products}
                            placeholder="Select product..."
                            onChange={this.onProductSelected.bind(this)}
                        />
                    </div>
                </div>
                <div><em>Customer name:</em> <span id="customer_name"> Choose customer </span></div>
                <table className="table table-striped" id="invoice-table">
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.renderProducts()}
                    </tbody>
                </table>
                <form className="form-horizontal" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="inputEmail3" className="col-sm-10 control-label"><em>Discount, %:</em></label>
                        <div className="col-sm-2">
                            <input type="number" id="discount" className="form-control" placeholder="Enter discount"
                                   min="0" max="99" step="1" onChange={this.onChangeDiscount.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail3" className="col-sm-10 control-label"><em>Total:</em></label>
                        <div className="col-sm-2">
                            <input type="number" className="form-control"  id="total"
                                   disabled="disabled"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        inv_details: state.inv_details,
        initialValues: state.inv_details[0],
        fetched_data: state.fetched_data
    }
}

InvoiceDetails = reduxForm({
    form: 'invoice',
    fields: ['total', 'discounter']
})(InvoiceDetails);


export default connect(
    mapStateToProps,
    {
        fetchCustomers,
        fetchProducts,
        fetchItems,
        updateInvoice,
        createItem,
        updateItem,
        deleteItem,
        editInvoice
    })(InvoiceDetails);
