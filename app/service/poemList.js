const Service = require('egg').Service;

class PoemListService extends Service {
  async getPoemList(category) {
    const res = await this.findPoemList(category);

    return res;
  }

  async findPoemList(category) {
    const { ctx } = this;

    switch (category) {
      case 0: {
        const res = await ctx.model.Poems.findAll({});
        return res;
      }
      case 1: {
        const res = await ctx.model.Poetry.findAll({});
        return res;
      }
      case 2: {
        const res = await ctx.model.Lunyu.findAll({});
        return res;
      }
      case 3: {
        const res = await ctx.model.Shijing.findAll({});
        return res;
      }
    }
  }
}
module.exports = PoemListService;
