import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet-async';

const OrderComplete = () => {
  return (
    <div style={ orderComplete_container} className="text-center">
      <Helmet>
        <title>Order Complete | AlCheez</title>
        <meta name="description" content="Thank you for your order! Your order has been successfully placed and is being processed. We will notify you once it is on its way." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Order Complete | AlCheez" />
        <meta property="og:description" content="Thank you for your order! Your order has been successfully placed and is being processed. We will notify you once it is on its way." />
        <meta property="og:url" content="https://www.alcheez.com/order-complete" />
        <meta property="og:image" content="https://alcheez.com/android-chrome-384x384.png" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="Order Complete | AlCheez" />
        <meta property="twitter:description" content="Thank you for your order! Your order has been successfully placed and is being processed. We will notify you once it is on its way." />
      </Helmet>
      <h1 className="mt-5" style={{color: "#28a745",}}>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed and is being processed.</p>
      <p>We appreciate your business and will notify you once your order is on its way!</p>
      <button className="btn btn-primary mt-4" onClick={() => window.location.href = '/'}>
        Go to Home
      </button>
    </div>
  );
};

export default OrderComplete;

const orderComplete_container = {
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
    width: "50%",
  }
  