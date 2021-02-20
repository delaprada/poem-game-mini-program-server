const Controller = require('egg').Controller;

class personalController extends Controller {
  async getPersonalInfo() {
    const { ctx } = this;
    const res = await ctx.service.personal.findInfo();

    ctx.body = res;
  }

  async getPersonalList() {
    const { ctx } = this;

    // get请求参数要从query中获取
    const { type } = ctx.query;
    console.log(type);

    let res;

    if (type === '0') {
      res = await ctx.service.personal.getLikeList();
    } else if (type === '1') {
      res = await ctx.service.personal.getCollectList();
    } else if (type === '2') {
      res = await ctx.service.personal.getCompoList();
    }

    ctx.body = res;
  }
}
module.exports = personalController;
