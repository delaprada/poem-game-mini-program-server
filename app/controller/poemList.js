const Controller = require('egg').Controller;

class PoemListController extends Controller {
  async getPoemList() {
    const { ctx } = this;

    // get请求参数要从query中获取
    const { category } = ctx.query;
    const res = await ctx.service.poemList.getPoemList(Number(category));

    ctx.body = res;
  }
}

module.exports = PoemListController;
