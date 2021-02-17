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

  async getDynamic(composition_id, category) {
    const { ctx } = this;

    // 从单次请求变量中拿token避免重复解析步骤
    const openid = ctx.locals.openid;

    const like = await ctx.model.Dynamic.findAll({
      where: {
        openid: openid,
        dynamic_type: 0,
        category: category,
        composition_id: composition_id,
      },
    });

    const collect = await ctx.model.Dynamic.findAll({
      where: {
        openid: openid,
        dynamic_type: 1,
        category: category,
        composition_id: composition_id,
      },
    });

    return {
      like: Boolean(like.length),
      collect: Boolean(collect.length),
    }
  }

  async like(composition_id, category, status) {
    const { ctx } = this;

    // 从单次请求变量中拿token避免重复解析步骤
    const openid = ctx.locals.openid;

    // 喜爱
    if (status) {
      await ctx.model.Like.create({
        openid: openid,
        composition_id: composition_id,
        category: category,
      });

      await ctx.model.Dynamic.create({
        openid: openid,
        dynamic_type: 0,
        category: category,
        composition_id: composition_id,
        exec_time: new Date().getTime(),
      });

      return {
        msg: '添加喜爱成功，动态更新成功',
      };
    } else {
      await ctx.model.Like.destroy({
        where: {
          openid: openid,
          composition_id: composition_id,
          category: category,
        },
      });

      await ctx.model.Dynamic.destroy({
        where: {
          openid: openid,
          dynamic_type: 0,
          category: category,
          composition_id: composition_id,
        },
      });

      return {
        msg: '取消喜爱成功，动态更新成功',
      };
    }
  }

  async collect(composition_id, category, status) {
    const { ctx } = this;

    // 从单次请求变量中拿token避免重复解析步骤
    const openid = ctx.locals.openid;

    // 收藏
    if (status) {
      await ctx.model.Collect.create({
        openid: openid,
        composition_id: composition_id,
        category: category,
      });

      await ctx.model.Dynamic.create({
        openid: openid,
        dynamic_type: 1,
        category: category,
        composition_id: composition_id,
        exec_time: new Date().getTime(),
      });

      return {
        msg: '添加收藏成功，动态更新成功',
      };
    } else {
      await ctx.model.Collect.destroy({
        where: {
          openid: openid,
          composition_id: composition_id,
          category: category,
        },
      });

      await ctx.model.Dynamic.destroy({
        where: {
          openid: openid,
          dynamic_type: 1,
          category: category,
          composition_id: composition_id,
        },
      });

      return {
        msg: '取消收藏成功，动态更新成功',
      };
    }
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
