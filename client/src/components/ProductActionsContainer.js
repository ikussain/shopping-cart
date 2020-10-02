import { connect } from 'react-redux';
import ProductActions from './ProductActions';

const mapDispatchToProps = (dispatch) => ({
  onUpdate: (product) => {
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
      dispatch({ 
        type: 'UPDATE_PRODUCT',
        payload: { product: json },
      });
    });
  },

  onAdd: (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  }
})

export default connect(null, mapDispatchToProps)(ProductActions);