import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux'

const products = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return state.concat(action.payload.product);
    case 'DELETE_PRODUCT':
      return state.filter(p => { return p.id !== action.payload.id });
    case 'UPDATE_PRODUCT':
      return state.map(p => {
        if (p.id === action.payload.product.id) {
          return action.payload.product;
        } else {
          return p;
        }//if 
      });
    case 'RECEIVE_PRODUCTS':
      return action.payload.products;
    case 'ADD_TO_CART':
      const productId = action.payload.product.id;
      return state.map((prod) => {
        if (prod.id === productId) {
          return Object.assign({}, prod, { 
            quantity: prod.quantity - 1
          });
        } 
        return prod;
      });
    default:
      return state;
  }
};

const cart = (state = { items: {}, totalPrice: 0 }, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const product = Object.assign({}, action.payload.product, { 
        quantity: state.items[action.payload.product.id] ? state.items[action.payload.product.id].quantity + 1 : 1,
      });
      const items = Object.assign({}, state.items, { [action.payload.product.id]: product, });
      const totalPrice = action.payload.product.price + state.totalPrice;
      const newState = { items, totalPrice };
      return newState;
    case 'DELETE_PRODUCT':
      const id = action.payload.id;
      const thisProduct = state.items[id];
      if (!thisProduct) return state;
      const priceChange = thisProduct.price * thisProduct.quantity;
      {
        const totalPrice = state.totalPrice - priceChange;
        const items = Object.assign({}, state.items);
        delete items[id];
        return { items, totalPrice };
      }
    case 'UPDATE_PRODUCT':
      {
        const product = action.payload.product;
        const id = product.id;
        const thisProduct = state.items[id];
        if (!thisProduct) return state;
        const priceChange = (thisProduct.price - product.price) * thisProduct.quantity;
        const totalPrice = state.totalPrice - priceChange;
        const items = Object.assign({}, state.items, { 
          [id]: Object.assign({}, thisProduct, { price: product.price }),
        });
        return { items, totalPrice };
      }
    case 'CART_CHECKOUT':
      return { items: {}, totalPrice: 0 };
    default:
      return state;
  }
};

const reducer = combineReducers({ products, cart });
const store = createStore(reducer);
export default store;
