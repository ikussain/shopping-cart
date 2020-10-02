import React from "react";
import ProductListContainer from './ProductListContainer';
import ShoppingCartContainer from "./ShoppingCartContainer";
import AddProductContainer from "./AddProductContainer";

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <header>
          <h1>The Shop</h1>
          <ShoppingCartContainer />
        </header>
        <main>
          <ProductListContainer />
          <AddProductContainer />
        </main>
      </div>
    );
  }
};

export default App;
