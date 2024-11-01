import React, { useEffect } from 'react';

const OrderConfirmation = ({ orderId, resetForm, clearCart }) => {
  useEffect(() => {
    if (orderId) {
      resetForm();
      clearCart();
    }
  }, [orderId, resetForm, clearCart]);

  return (
    <section id="order-confirmation">
      <h2>Confirmation de commande</h2>
      <p id="order-id">Votre numéro de commande est : {orderId}</p>
    </section>
  );
};

export default OrderConfirmation;
