import React from 'react';
import ProductActions from './ProductActions';

export default function Product({ product }) {
  return (
    <div className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">{product.price}</p>
        <p className="quantity">{product.quantity}</p>
        <ProductActions />

        <a className="delete-button"><span>X</span></a>
      </div>
    </div>
  )
}