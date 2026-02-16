export default {
  routes: [
    {
      method: "POST",
      path: "/payments/stripe/checkout",
      handler: "payment.createStripeCheckout",
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/payments/chapa/checkout",
      handler: "payment.createChapaCheckout",
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/payments/chapa/verify/:txRef",
      handler: "payment.verifyChapaTransaction",
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/payments/chapa/verify",
      handler: "payment.verifyChapaTransaction",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};

