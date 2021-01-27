let jwt = require('jwt-simple');
const SECRET = 'zhuoran';

module.exports = (options) => {
  return async function auth(ctx, next) {
    const token = ctx.get('authorization');

    if (token) {
      console.log('请求带有token');
      try {
        const openid = jwt.decode(token, SECRET);
        await next();
      } catch (err) {
        ctx.status = 401;
        ctx.body = {
          msg: 'token有误',
        };
      }
    } else {
      console.log('请求没有带token');
      ctx.status = 401;
      ctx.body = {
        msg: '您没有登录',
      };
    }
  };
};
