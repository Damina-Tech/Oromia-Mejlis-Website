export default {
  routes: [
    {
      method: 'GET',
      path: '/offices',
      handler: 'office.find',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/offices/:id',
      handler: 'office.findOne',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/offices',
      handler: 'office.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/offices/:id',
      handler: 'office.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/offices/:id',
      handler: 'office.delete',
      config: {
        policies: [],
      },
    },
  ],
};
