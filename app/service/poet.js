const Service = require('egg').Service;

class PoetService extends Service {
  async getAuthorList(author_id, category) {
    const res = await this.findAuthorList(author_id, category);

    return res;
  }

  async findAuthorList(author_id, category) {
    const { ctx } = this;

    switch (category) {
      case 0: {
        const res = await ctx.model.Poems.findAll({
          where: {
            author_id: author_id,
          },
        });
        return res;
      }
      case 1: {
        const res = await ctx.model.Poetry.findAll({
          where: {
            author_id: author_id,
          },
        });
        return res;
      }
    }
  }
}
module.exports = PoetService;
