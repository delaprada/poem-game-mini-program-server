const jwt = require('jwt-simple');
const SECRET = 'zhuoran';

module.exports = (options) => {
  return async function auth(ctx, next) {
    let token = ctx.get('authorization');

    if (token) {
      console.log('请求带有token');

      if (token.includes('Bearer')) {
        token = token.replace(/Bearer\s*/, '');
      }

      // 记录token是否成功解析
      let flag = false;

      try {
        const openid = jwt.decode(token, SECRET);
        flag = true;
        ctx.locals.openid = openid;
      } catch (err) {
        console.log(err);
        console.log('here!');
        ctx.status = 401;
        ctx.body = {
          msg: 'token有误',
        };
      }

      // 防止catch无法捕获token解析错误
      if (flag) {
        await next();
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
