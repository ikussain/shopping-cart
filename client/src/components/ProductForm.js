import React from 'react';

const defaultState = {
  title: '',
  price: '',
  quantity: '',
  fieldErrors: {}
}

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, defaultState, this.props.product);
  }

  validateTitle = (newVal) => {
    const newErrors = Object.assign({}, this.state.fieldErrors);

    if (newVal.length >= 3) {
      newErrors.title = false;
    } else {
      newErrors.title = 'Title must be at least 3 characters long.';
    }

    this.setState({
      fieldErrors: newErrors
    });
  };

  validateNumeric = (fieldName, newVal) => {
    const newErrors = Object.assign({}, this.state.fieldErrors);

    if (!isNaN(newVal) && newVal.length > 0) {
      newErrors[fieldName] = false;
    } else {
      newErrors[fieldName] = 'Invalid characters (must be a number).';
    }

    this.setState({
      fieldErrors: newErrors
    });
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'title') {
      this.validateTitle(value);
    } else {
      this.validateNumeric(name, value);
    }

    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let fields = {
      title: this.state.title,
      price: this.state.price,
      quantity: this.state.quantity
    };

    if (this.state.id) {
      fields.id = this.state.id;
    };

    this.props.onSubmit(fields);
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

        { Object.keys(this.state.fieldErrors).map(key => {
          if (this.state.fieldErrors[key]) {
            return (
              <p style={{color: 'red'}}>{this.state.fieldErrors[key]}</p>
            );
          }
          return undefined;
        })}

        <div class="actions form-actions">
          <a className="button" onClick={this.handleSubmit}>{ this.state.id ? 'Update' : 'Add'}</a>
          <a className="button"
            onClick={this.handleCancel}
          >
            Cancel
          </a>
        </div>

      </form>
    )
  }
}
