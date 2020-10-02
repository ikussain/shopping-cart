import { connect } from 'react-redux';
import Product from './Product';

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      dispatch({ 
        type: 'DELETE_PRODUCT',
        payload: { id },
      });
    });
  } 
})

export default connect(null, mapDispatchToProps)(Product);