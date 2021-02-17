const Service = require('egg').Service;

class PoemService extends Service {
  async findPoem(id, category) {
    const res = await this.getPoemDetail(id, category);

    return res;
  }

  async findAuthor(id, category) {
    const res = await this.getAuthorDetail(id, category);

    return res;
  }

  async getPoemDetail(id, category) {
    const { ctx } = this;

    switch (category) {
      case 0: {
        const res = await ctx.model.Poems.findAll({
          where: {
            id: id,
          },
        });
        return res;
      }
      case 1: {
        const res = await ctx.model.Poetry.findAll({
          where: {
            id: id,
          },
        });
        return res;
      }
      case 2: {
        const res = await ctx.model.Lunyu.findAll({
          where: {
            id: id,
          },
        });
        return res;
      }
      case 3: {
        const res = await ctx.model.shijing.findAll({
          where: {
            id: id,
          },
        });
        return res;
      }
    }
  }

  async getAuthorDetail(id, category) {
    const { ctx } = this;

    switch (category) {
      case 0: {
        const res = await ctx.model.PoemsAuthor.findAll({
          where: {
            id: id,
          },
        });
        return res;
      }
      case 1: {
        const res = await ctx.model.PoetryAuthor.findAll({
          where: {
            id: id,
          },
        });
        return res;
      }
    }
  }
}
module.exports = PoemService;
