import React from "react";

import Link from './link';

const Stripe = () => {
  const getUrl = () => {
    return `https://stripe.com/payments/payment-methods-guide`;
  };

  return <Link url={getUrl()} title={"Learn about stripe?"} />;
};

export default Stripe;