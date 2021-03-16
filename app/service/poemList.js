const Service = require('egg').Service;

class PoemListService extends Service {
  async getPoemList(category, offset) {
    const res = await this.findPoemList(category, offset*50);

    return res;
  }

  async findPoemList(category, offset) {
    const { ctx } = this;

    // 分片获取数据
    switch (category) {
      case 0: {
        const res = await ctx.model.Poems.findAll({
          offset: offset,
          limit: 50,
        });
        return res;
      }
      case 1: {
        const res = await ctx.model.Poetry.findAll({
          offset: offset,
          limit: 50,
        });
        return res;
      }
      case 2: {
        const res = await ctx.model.Lunyu.findAll({
          offset: offset,
          limit: 50,
        });
        return res;
      }
      case 3: {
        const res = await ctx.model.Shijing.findAll({
          offset: offset,
          limit: 50,
        });
        return res;
      }
    }
  }
}
module.exports = PoemListService;
