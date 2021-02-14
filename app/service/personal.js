const Service = require('egg').Service;
const jwt = require('jwt-simple');
const SECRET = 'zhuoran';

class personalService extends Service {
  async findInfo() {
    const { ctx } = this;

    console.log('从ctx.locals中取openid');
    console.log(ctx.locals.openid);

    // 从单次请求变量中拿token避免重复解析步骤
    const openid = ctx.locals.openid;

    // 从请求头的authorization字段获取token
    // let token = ctx.get('authorization');

    // if (token.includes('Bearer')) {
    //   token = token.replace(/Bearer\s*/, '');
    // }

    // // 对token进行解密获取其中的openid
    // const openid = jwt.decode(token, SECRET);

    const likeAmount = await this.getLikeAmount(openid);
    const collectAmount = await this.getCollectAmount(openid);
    const recordAmount = await this.getRecordAmount(openid);

    const dynamic_list = await this.getDynamicList(openid);

    return {
      like: likeAmount,
      collect: collectAmount,
      record: recordAmount,
      dynamic: dynamic_list,
    };
  }

  async getLikeAmount(openid) {
    const { ctx, app } = this;
    const sequelize = app.Sequelize;

    const res = await ctx.model.Like.findAll({
      attributes: [
        'openid',
        [sequelize.fn('COUNT', sequelize.col('composition_id')), 'amount'],
      ],
      where: {
        openid: openid,
      },
      group: ['openid'],
    });

    let amount;

    if (res.length > 0) {
      amount = res[0].dataValues.amount;
    } else {
      amount = 0;
    }

    return amount;
  }

  async getCollectAmount(openid) {
    const { ctx, app } = this;
    const sequelize = app.Sequelize;

    const res = await ctx.model.Collect.findAll({
      attributes: [
        'openid',
        [sequelize.fn('COUNT', sequelize.col('composition_id')), 'amount'],
      ],
      where: {
        openid: openid,
      },
      group: ['openid'],
    });

    let amount;

    if (res.length > 0) {
      amount = res[0].dataValues.amount;
    } else {
      amount = 0;
    }

    return amount;
  }

  async getRecordAmount(openid) {
    const { ctx, app } = this;
    const sequelize = app.Sequelize;

    const res = await ctx.model.Record.findAll({
      attributes: [
        'openid',
        [sequelize.fn('COUNT', sequelize.col('record_id')), 'amount'],
      ],
      where: {
        openid: openid,
      },
      group: ['openid'],
    });

    let amount;

    if (res.length > 0) {
      amount = res[0].dataValues.amount;
    } else {
      amount = 0;
    }

    return amount;
  }

  async getDynamicList(openid) {
    const { ctx } = this;

    let res = await ctx.model.Dynamic.findAll({
      attributes: [
        'id',
        'dynamic_type',
        'category',
        'composition_id',
        'record_id',
        'exec_time',
      ],
      where: {
        openid: openid,
      },
      order: [['exec_time', 'DESC']],
    });

    // 获取详细诗词信息
    res = await Promise.all(
      res.map(async (item) => {
        const { id, category } = item.dataValues;
        const detail = await this.getDetail(id, category);

        // 浅拷贝 不影响源对象
        let newItem = JSON.parse(JSON.stringify(item));
        newItem.detail = detail[0].dataValues;

        return newItem;
      })
    );

    console.log(res);

    return res;
  }

  async getDetail(id, category) {
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
}
module.exports = personalService;
