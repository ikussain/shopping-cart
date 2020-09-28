import React from 'react';

const defaultState = {
  title: '',
  price: '',
  quantity: ''
}

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.product || defaultState;
  }

  render() {

    return (
      <form>
        <div class="input-group">
          <label for="product-name">Product Name</label>
          <input type="text" id="product-name" value={this.state.title} />
        </div>
  
        <div class="input-group">
          <label for="product-price">Price</label>
          <input type="text" id="product-price" value={this.state.price} />
        </div>
  
        <div class="input-group">
          <label for="product-quantity">Quantity</label>
          <input type="text" id="product-quantity" value={this.state.quantity} />
        </div>
  
        <div class="actions form-actions">
          <a class="button">Add</a>
          <a class="button"
            onClick={this.props.onCancel}
          >
            Cancel
          </a>
        </div>
      </form>
    )
  }
}