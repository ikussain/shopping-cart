import React from "react";
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import AddProduct from './AddProduct';
import store from '../lib/store';

class App extends React.Component {
  state = {
  //  products: [],
    cart: { items: {}, totalPrice: 0 }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => { this.forceUpdate() });
    
    fetch('http://localhost:5000/api/products')
    .then((res) => res.json())
    .then((json) => {
      json = json.map((item) => {
        const thisId = item._id;
        item.id = thisId;
        return item;
      });
      store.dispatch({
        type: 'RECEIVE_PRODUCTS',
        payload: { products: json },
      });
      /*
      this.setState((prevState) => {
        return {
          products: json
        };
      })
      */
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
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
      json.id = json._id;
      //this.setState({ products: this.state.products.concat(json) });
      store.dispatch({ 
        type: 'ADD_PRODUCT', 
        payload: { product: json },
      });
    });
  };

  handleProductUpdate = (product) => {
    fetch(`http://localhost:5000/api/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then((res) => res.json())
    .then((json) => {
      json.id = json._id;
      //this.setState({ products: newProducts }, () => this.synchronizeCartPrices(product) );
      store.dispatch({ 
        type: 'UPDATE_PRODUCT',
        payload: { product: json },
      });
    });
  };

  synchronizeCartPrices = (product) => {
    if (!this.state.cart.items[product.id]) return;

    let newCart = Object.assign({}, this.state.cart);
    let newCartItems = Object.assign({}, newCart.items);
    const newProduct = Object.assign({}, newCartItems[product.id]);

    newProduct.price = product.price;
    newProduct.quantity = this.state.cart.items[product.id].quantity;

    const priceDifference = product.price - this.state.cart.items[product.id].price;
    const totalDifference = priceDifference * newProduct.quantity;

    newCartItems = Object.assign({}, newCartItems, { [product.id]: newProduct })
    newCart.items = newCartItems;
    newCart.totalPrice = newCart.totalPrice + totalDifference;

    this.setState({
      cart: newCart,
    });
  };

  synchronizeCartContents = (id) => {
    if (!this.state.cart.items[id]) return;

    let newCart = Object.assign({}, this.state.cart);
    let newCartItems = Object.assign({}, newCart.items);

    delete newCartItems[id];
    newCart.items = newCartItems;

    const existingPrice = this.state.cart.totalPrice;
    const productPrice = this.state.cart.items[id].price;
    const productQuantity = this.state.cart.items[id].quantity;

    const newTotalPrice = existingPrice - productPrice * productQuantity;
    newCart.totalPrice = newTotalPrice;

    this.setState({
      cart: newCart,
    });
  };

  handleProductDelete = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      //const products = this.state.products.filter(prod => prod.id !== id);
      //this.setState({ products }, () => this.synchronizeCartContents(id));
      store.dispatch({ 
        type: 'DELETE_PRODUCT',
        payload: { id: id },
      });
    });
  };

  addToCart = (productId) => {
    let product;

    /*
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
      */
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

  handleCheckoutClick = (event) => {
    event.preventDefault();

    if (event.target.classList.contains('disabled')) return;

    this.setState({
      cart: { items: {}, totalPrice: 0 }
    });
  }

  render() {
    const state = store.getState();
    console.log(state);
    return (
      <div id="app">
        <header>
          <h1>The Shop</h1>
          <ShoppingCart
            products={state.products}
            totalPrice={this.state.cart.totalPrice}
            items={Object.values(this.state.cart.items)}
            onCheckoutClick={this.handleCheckoutClick}
          />
        </header>
        <main>
          <ProductList
            products={state.products}
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
