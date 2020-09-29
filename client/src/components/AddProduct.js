import React from 'react';
import ProductForm from './ProductForm';

export default class AddProduct extends React.Component {
  state = {
    formOpen: false
  }

  openForm = (e) => {
    e.preventDefault();
    this.setState({
      formOpen: true
    });
  }
  
  closeForm = () => {
    this.setState({
      formOpen: false
    });
  };

  handleSubmit = (product) => {
    this.closeForm();
    this.props.onSubmit(product);
  };

  render() {
    return (
      <div>
        { this.state.formOpen ? (
          <div className="add-form visible">
             <h3>Add Product</h3>
             <ProductForm
                onClose={this.closeForm}
                onSubmit={this.handleSubmit}
             />
          </div>
        ) : (
          <p>
            <a 
              className="button add-product-button"
              onClick={this.openForm}
            >
              Add A Product
            </a>
          </p>
        )}       
      </div>
    );
  }
}