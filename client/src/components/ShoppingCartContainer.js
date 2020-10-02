import { connect } from 'react-redux';
import ShoppingCart from './ShoppingCart';

const mapStateToProps = (state) => ({
  items: Object.values(state.cart.items),
  totalPrice: state.cart.totalPrice
});

const mapDispatchToPriops = (dispatch) => ({
  onCheckoutClick: () => {
    dispatch({
      type: 'CART_CHECKOUT'
    })
  }
})
export default connect(mapStateToProps, mapDispatchToPriops)(ShoppingCart);