import { connect } from 'react-redux';
import AddProduct from './AddProduct';

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (product) => {
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
      dispatch({ 
        type: 'ADD_PRODUCT', 
        payload: { product: json },
      });
    });
  }
})

export default connect(null, mapDispatchToProps)(AddProduct);