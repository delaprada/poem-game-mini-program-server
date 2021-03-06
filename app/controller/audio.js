const Controller = require('egg').Controller;

class AudioController extends Controller {
  async getAudio() {
    const { ctx } = this;

    // get请求参数要从query中获取
    const { poem_id, category } = ctx.query;
    const res = await ctx.service.audio.getAudio(Number(poem_id), Number(category));

    ctx.body = res;
  }
}

module.exports = AudioController;