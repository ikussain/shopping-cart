import React from 'react';
import ProductForm from './ProductForm';

export default class ProductActions extends React.Component {
  state = {
    formOpen: false
  }

  openForm = (e) => {
    e.preventDefault();
    this.setState({
      formOpen: true
    });
  }

  render() {
    return (
      <div>
        { this.state.formOpen ? (
          <ProductForm />
        ) : (
          <div className="actions product-actions">
            <a className="button add-to-cart">Add to Cart</a>
            <a className="button edit" onClick={this.openForm}>Edit</a>
          </div>
        )}

      </div>
    )
  }
}