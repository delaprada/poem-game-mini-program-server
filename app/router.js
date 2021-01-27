module.exports = (app) => {
  const { router, controller, middleware } = app;
  const auth = middleware.auth();

  router.get('/', controller.home.index);
  router.get('/request', auth, controller.home.request);
  router.post('/login', controller.home.login);
  router.post('/userInfo', controller.home.userInfo);
};
