import React from "react";
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import AddProduct from './AddProduct';

import data from '../lib/data';

class App extends React.Component {
  state = {
    products: [],
    cart: { items: {}, totalPrice: 0 }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/products')
    .then((res) => res.json())
    .then((json) => {
      this.setState((prevState) => ({
        products: json
      }));
    })
  }

  handleNewProduct = (product) => {
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({ products: this.state.products.concat(json) });
    });
  };

  handleProductUpdate = (product) => {
    const products = this.state.products.map(prod => {
      if (prod.id === product.id) {
        return product;
      } else {
        return prod;
      }
    });

    this.setState({
      products
    });
  };

  handleProductDelete = (id) => {
    const products = this.state.products.filter(prod => prod.id !== id);
    this.setState({ products });
  };

  addToCart = (productId) => {
    let product;

    this.setState((prevState) => ({
      products: prevState.products.map(prod => {
        if (prod.id === productId) {
          product = Object.assign({}, prod, { quantity: 1 });
          let updatedProduct = Object.assign({}, prod);
          updatedProduct.quantity -= 1;
          return updatedProduct;
        } else {
          return prod;
        }
      })
    }));

    // add to cart
    this.setState((prevState) => ({
      cart: (() => {
        if (prevState.cart.items.hasOwnProperty(product.id)) {
          return Object.assign({}, prevState.cart, { 
            items: Object.assign({}, prevState.cart.items, { 
              [product.id]: Object.assign({}, prevState.cart.items[product.id], { quantity: prevState.cart.items[product.id].quantity + 1 })})
          })
        } else {
          return Object.assign({}, prevState.cart, {
            items: Object.assign({}, prevState.cart.items, { [product.id]: product })
          })
        }
      })()
    }));

    // update price
    this.setState((prevState) => ({
      cart: Object.assign({}, prevState.cart, { totalPrice: prevState.cart.totalPrice + product.price })
    }));
  };

  render() {
    return (
      <div id="app">
        <header>
          <h1>The Shop</h1>
          <ShoppingCart 
            products={this.state.products}
            totalPrice={this.state.cart.totalPrice}
            items={Object.values(this.state.cart.items)}
          />
        </header>
        <main>
          <ProductList 
            products={this.state.products}
            onSubmit={this.handleProductUpdate}
            onAdd={this.addToCart}
            onDelete={this.handleProductDelete}
          />
          <AddProduct 
            onSubmit={this.handleNewProduct}
          />
        </main>
      </div>
    );
  }
};

export default App;
