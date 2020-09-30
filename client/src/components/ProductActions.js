import React from "react";
import ProductForm from "./ProductForm";

export default class ProductActions extends React.Component {
  state = {
    formOpen: false,
  };

  openForm = (e) => {
    e.preventDefault();
    this.setState({
      formOpen: true,
    });
  };

  closeForm = () => {
    this.setState({
      formOpen: false,
    });
  };

  handleSubmit = (product) => {
    this.props.onSubmit(product);
    this.closeForm();
  };

  handleAdd = (e) => {
    e.preventDefault();
    this.props.onAdd(this.props.product.id);
  };

  render() {
    return (
      <div>
        {this.state.formOpen ? (
          <ProductForm
            product={this.props.product}
            onSubmit={this.handleSubmit}
            onClose={this.closeForm}
          />
        ) : (
          <div className="actions product-actions">
            <button
              className={`button add-to-cart ${ this.props.product.quantity === 0 && 'disabled'}`}
              onClick={this.handleAdd}
              disabled={this.props.product.quantity === 0}
            >
              Add to Cart
            </button>
            <button className="button edit" onClick={this.openForm}>
              Edit
            </button>
          </div>
        )}
      </div>
    );
  }
}
