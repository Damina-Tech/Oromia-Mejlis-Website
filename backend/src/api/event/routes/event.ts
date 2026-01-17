export default {
  routes: [
    {
      method: 'GET',
      path: '/events',
      handler: 'event.find',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/events/:id',
      handler: 'event.findOne',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/events',
      handler: 'event.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/events/:id',
      handler: 'event.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/events/:id',
      handler: 'event.delete',
      config: {
        policies: [],
      },
    },
  ],
};

