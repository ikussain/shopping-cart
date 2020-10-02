import React from 'react';
import ProductContainer from './ProductContainer';

export default class ProductList extends React.Component {
  componentDidMount() {
    this.props.onFetchProducts()
  }

  render() {
    return (
      <div className="product-listing">
          <h2>Products</h2>
          {
            this.props.products.map((product) => (
              <ProductContainer 
                key={product.id}
                product={product}
              />
            ))
          }
      </div>
    )
  }
  
}