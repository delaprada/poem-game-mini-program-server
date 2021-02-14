const Controller = require('egg').Controller;

class personalController extends Controller {
  async getPersonalInfo() {
    const { ctx } = this;
    const res = await ctx.service.personal.findInfo();

    ctx.body = res;
  }
}
module.exports = personalController;
