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
      //map over qty
    default:
      return state;
  }
};

const cart = (state = { items: {}, totalPrice: 0 }, action) => {
  switch (action.type) {
    case 'ADD':
      const product = Object.assign({}, action.payload.product, { 
        quantity: items[action.payload.product.id] ? items[action.payload.product.id] + 1 : 1,
      });
      const items = Object.assign({}, state.items, { [action.payload.product.id]: product, });
      const totalPrice = action.payload.product.price + state.totalPrice;
      const newState = { items, totalPrice };
      return newState;
    case 'REMOVE':
      const id = action.payload.id;
      const thisProduct = state.items[id];
      if (!thisProduct) return state;
      const priceChange = thisProduct.price * thisProduct.quantity;
      const totalPrice = state.totalPrice - priceChange;
      const items = Object.assign({}, state.items);
      delete items[id];
      return { items, totalPrice };
    case 'UPDATE':
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
    case 'CHECKOUT':
      return { items: {}, totalPrice: 0 };
    default:
      //
  }
};

const reducer = combineReducers({ products, cart });
const store = createStore(reducer);
export default store;
