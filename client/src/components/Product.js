import React from 'react';
import ProductActions from './ProductActions';

export default function Product({ product, onSubmit, onAdd, onDelete }) {
  return (
    <div className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">{product.price}</p>
        <p className="quantity">{product.quantity}</p>
        <ProductActions 
          product={product}
          onSubmit={onSubmit}
          onAdd={onAdd}
        />

        <a className="delete-button" onClick={(e) => {
          e.preventDefault();
          onDelete(product.id);
        }}><span>X</span></a>
      </div>
    </div>
  )
}