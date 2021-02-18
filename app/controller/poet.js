const Controller = require('egg').Controller;

class PoetController extends Controller {
  async getAuthorList() {
    const { ctx } = this;

    // get请求参数要从query中获取
    const { author_id, category } = ctx.query;
    const res = await ctx.service.poet.getAuthorList(Number(author_id), Number(category));

    ctx.body = res;
  }
}

module.exports = PoetController;
