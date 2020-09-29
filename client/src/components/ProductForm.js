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

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.onClose();
  };

  render() {
    return (
      <form>
        <div class="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input name="title" type="text" id="product-name" value={this.state.title} onChange={this.handleInputChange} />
        </div>
  
        <div class="input-group">
          <label htmlFor="product-price">Price</label>
          <input name="price" type="text" id="product-price" value={this.state.price} onChange={this.handleInputChange} />
        </div>
  
        <div class="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input name="quantity" type="text" id="product-quantity" value={this.state.quantity} onChange={this.handleInputChange} />
        </div>
  
        <div class="actions form-actions">
          <a class="button" onClick={this.handleSubmit}>{ this.state.id ? 'Update' : 'Add'}</a>
          <a class="button"
            onClick={this.handleCancel}
          >
            Cancel
          </a>
        </div>
      </form>
    )
  }
}