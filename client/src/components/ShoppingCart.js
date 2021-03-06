/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function ShoppingCart({ totalPrice, items, onCheckoutClick }) {
  console.log(items);
  return (
    <div class="cart">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table class="cart-items">
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {items.map((item) => {
            return (
              <tr>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
              </tr>
            );
          })}
          <tr>
            <td colspan="3" class="total">
              Total: ${totalPrice.toFixed(2)}
            </td>
          </tr>
        </table>
      )}

      <a
        onClick={(e) => {
          e.preventDefault();
          onCheckoutClick();
        }}
        className={"button checkout" + (items.length === 0 ? " disabled" : "")}
      >
        Checkout
      </a>
    </div>
  );
}
