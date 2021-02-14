const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const { code } = ctx.request.body;
    // const { nickName, avatarUrl, gender, province, city, country } = userInfo;

    const info = await ctx.service.user.getToken(code);

    // 将token信息返回
    ctx.body = info;
  }

  async postInfo() {
    const { ctx } = this;
    const { userInfo } = ctx.request.body;
    console.log(userInfo);

    await ctx.service.user.update(userInfo);

    ctx.status = 200;
  }
}
module.exports = UserController;
