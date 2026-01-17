export default {
  routes: [
    {
      method: 'GET',
      path: '/services',
      handler: 'service.find',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/services/:id',
      handler: 'service.findOne',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/services',
      handler: 'service.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/services/:id',
      handler: 'service.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/services/:id',
      handler: 'service.delete',
      config: {
        policies: [],
      },
    },
  ],
};

