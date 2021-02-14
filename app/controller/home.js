const Controller = require('egg').Controller;
const jwt = require('jwt-simple');

const SECRET = 'zhuoran';

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async getSentence() {
    const { ctx } = this;
    const res = await ctx.service.home.findSentence();

    ctx.body = res;
  }

  async getRecommend() {
    const { ctx } = this;
    const res = await ctx.service.home.findRecommend();

    ctx.body = res;
  }
}

module.exports = HomeController;
