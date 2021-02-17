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

  async getDynamic() {
    const { ctx } = this;

    console.log(ctx.query);

    const { composition_id, category } = ctx.query;
    const res = await ctx.service.poem.getDynamic(Number(composition_id), Number(category));

    ctx.body = res;
  }

  async like() {
    const { ctx } = this;

    // post请求参数要从request.body中获取
    const { composition_id, category, status } = ctx.request.body;
    const res = await ctx.service.poem.like(composition_id, category, status);

    ctx.body = res;
  }

  async collect() {
    const { ctx } = this;

    // post请求参数要从request.body中获取
    const { composition_id, category, status } = ctx.request.body;
    const res = await ctx.service.poem.collect(composition_id, category, status);

    ctx.body = res;
  }
}

module.exports = PoemController;
