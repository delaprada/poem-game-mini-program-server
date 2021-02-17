module.exports = (app) => {
  const { router, controller, middleware } = app;
  const auth = middleware.auth();

  router.get('/', controller.home.index);
  // router.get('/request', auth, controller.home.request);

  // 首页接口
  router.get('/sentence', controller.home.getSentence); // 每日一句
  router.get('/recommend', controller.home.getRecommend); // 热门推荐

  router.post('/login', controller.user.login); // 首页自动登录
  router.post('/postInfo', controller.user.postInfo); // 提交用户个人信息

  router.get('/personal', auth, controller.personal.getPersonalInfo); // 获取用户个人信息（包括喜爱和收藏）

  // 获取诗词详情
  router.get('/poem', controller.poem.getPoem);
  router.get('/author', controller.poem.getAuthor);
  router.get('/dynamic', auth, controller.poem.getDynamic);
  router.post('/like', auth, controller.poem.like); //喜爱
  router.post('/collect', auth, controller.poem.collect); // 收藏
};
