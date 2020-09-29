import React from 'react';
import Product from './Product';

export default function ProductList({ products, onSubmit, onAdd, onDelete }) {
  return (
    <div className="product-listing">
        <h2>Products</h2>
        {
          products.map((product) => (
            <Product 
              key={product.id}
              product={product}
              onSubmit={onSubmit}
              onAdd={onAdd}
              onDelete={onDelete}
            />
          ))
        }
    </div>
  )
}