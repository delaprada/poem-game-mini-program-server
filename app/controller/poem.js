const Controller = require('egg').Controller;

class PoemController extends Controller {
  async getPoem() {
    const { ctx } = this;

    // get请求参数要从query中获取
    const { id, category } = ctx.query;
    const res = await ctx.service.poem.findPoem(Number(id), Number(category));

    ctx.body = res;
  }

  async getAuthor() {
    const { ctx } = this;

    // get请求参数要从query中获取
    const { id, category } = ctx.query;
    const res = await ctx.service.poem.findAuthor(Number(id), Number(category));

    ctx.body = res;
  }
}

module.exports = PoemController;
