module.exports = (app) => {
  const { router, controller, middleware } = app;
  const auth = middleware.auth();

  router.get('/', controller.home.index);
  // router.get('/request', auth, controller.home.request);

  router.get('/sentence', controller.home.getSentence);
  router.get('/recommend', controller.home.getRecommend);

  router.post('/login', controller.user.login);
  router.post('/postInfo', controller.user.postInfo);

  router.get('/personal', auth, controller.personal.getPersonalInfo);
};
