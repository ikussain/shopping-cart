import { connect } from 'react-redux';
import ProductList from './ProductList';

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch) => ({
  onFetchProducts: () => {
    fetch('http://localhost:5000/api/products')
    .then((res) => res.json())
    .then((json) => {
      json = json.map((item) => {
        const thisId = item._id;
        item.id = thisId;
        return item;
      });
      dispatch({
        type: 'RECEIVE_PRODUCTS',
        payload: { products: json },
      });
    });
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);