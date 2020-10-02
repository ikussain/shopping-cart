/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ProductActionsContainer from './ProductActionsContainer';

export default function Product({ product, onDelete }) {
  return (
    <div className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">{product.price}</p>
        <p className="quantity">{product.quantity}</p>
        <ProductActionsContainer product={product} />

        <a href='#' className="delete-button" onClick={(e) => {
          e.preventDefault();
          onDelete(product.id);
        }}><span>X</span></a>
      </div>
    </div>
  )
}