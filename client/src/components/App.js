import React from "react";
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import AddProduct from './AddProduct';

import data from '../lib/data';

class App extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    this.setState({
      products: data
    });
  }

  render() {
    return (
      <div id="app">
        <header>
          <h1>The Shop</h1>
          <ShoppingCart 
            products={this.state.products}
          />
        </header>
        <main>
          <ProductList 
            products={this.state.products}
          />
          <AddProduct />
        </main>
      </div>
    );
  }
};

export default App;
