import React from 'react';
import Product from './Product';

export default function ProductList({ products }) {
  return (
    <div className="product-listing">
        <h2>Products</h2>
        {
          products.map((product) => (
            <Product 
              key={product.id}
              product={product}
            />
          ))
        }
    </div>
  )
}