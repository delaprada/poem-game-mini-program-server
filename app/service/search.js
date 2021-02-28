const Service = require('egg').Service;

class SearchService extends Service {
  async getSearchResult(searchText) {
    const authorList = await this.findAuthorList(searchText);
    const poemList = await this.findPoemList(searchText);

    return {
      author: authorList,
      poem: poemList,
    };
  }

  async findAuthorList(searchText) {
    const { ctx, app } = this;
    const sequelize = app.Sequelize;
    const { Op } = sequelize;

    const poemAuthorList = await ctx.model.PoemsAuthor.findAll({
      where: {
        name: {
          [Op.like]: '%' + searchText + '%',
        },
      },
    });

    if (poemAuthorList.length !== 0) {
      return poemAuthorList;
    }

    const poetryAuthorList = await ctx.model.PoetryAuthor.findAll({
      where: {
        name: {
          [Op.like]: '%' + searchText + '%',
        },
      },
    });

    return poetryAuthorList;
  }

  async findPoemList(searchText) {
    const { ctx, app } = this;
    const sequelize = app.Sequelize;
    const { Op } = sequelize;

    // 如果searchText为诗人，优先展示诗人的诗词
    const priList1 = await ctx.model.Poems.findAll({
      where: {
        author: {
          [Op.like]: '%' + searchText + '%',
        },
      },
    });

    const priList2 = await ctx.model.Poetry.findAll({
      where: {
        author: {
          [Op.like]: '%' + searchText + '%',
        },
      },
    });

    const poemList = await ctx.model.Poems.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: '%' + searchText + '%',
            },
          },
          {
            content: {
              [Op.like]: '%' + searchText + '%',
            },
          },
        ],
      },
    });

    const potryList = await ctx.model.Poetry.findAll({
      where: {
        [Op.or]: [
          {
            author: {
              [Op.like]: '%' + searchText + '%',
            },
          },
          {
            title: {
              [Op.like]: '%' + searchText + '%',
            },
          },
          {
            content: {
              [Op.like]: '%' + searchText + '%',
            },
          },
        ],
      },
    });

    const lunyuList = await ctx.model.Lunyu.findAll({
      where: {
        [Op.or]: [
          {
            chapter: {
              [Op.like]: '%' + searchText + '%',
            },
          },
          {
            content: {
              [Op.like]: '%' + searchText + '%',
            },
          },
        ],
      },
    });

    const shijingList = await ctx.model.Shijing.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: '%' + searchText + '%',
            },
          },
          {
            chapter: {
              [Op.like]: '%' + searchText + '%',
            },
          },
          {
            section: {
              [Op.like]: '%' + searchText + '%',
            },
          },
          {
            content: {
              [Op.like]: '%' + searchText + '%',
            },
          },
        ],
      },
    });

    return priList1
      .concat(priList2)
      .concat(poemList)
      .concat(potryList)
      .concat(lunyuList)
      .concat(shijingList);
  }
}
module.exports = SearchService;
