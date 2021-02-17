const Service = require('egg').Service;
const { QueryTypes } = require('sequelize');

class HomeService extends Service {
  async findSentence() {
    const { app } = this;

    const res = await app.model.query(
      'SELECT * FROM sentence AS t1  JOIN (SELECT ROUND(RAND() * ((SELECT MAX(id) FROM `sentence`)-(SELECT MIN(id) FROM sentence))+(SELECT MIN(id) FROM sentence)) AS id) AS t2 WHERE t1.id >= t2.id ORDER BY t1.id LIMIT 1',
      { type: QueryTypes.SELECT }
    );

    return res;
  }

  async findRecommend() {
    const { app } = this;

    let res = await app.model.query(
      'SELECT composition_id, category, count(*) as `count` FROM (SELECT composition_id, category FROM `like` UNION ALL SELECT composition_id, category FROM `collect`) AS T GROUP BY composition_id, category ORDER BY count DESC',
      { type: QueryTypes.SELECT }
    );

    // 取前15首
    res = res.slice(0, 15);

    // 获取喜爱和收藏总数最多的前15首对应的诗句
    res = await Promise.all(
      res.map(async (item) => {
        console.log(item);
        const { composition_id, category, count } = item;
        const detail = await this.getDetail(composition_id, category);
        detail.hot = count;
        detail.category = category;
        return detail;
      })
    );

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
        return res[0].dataValues;
      }
      case 1: {
        const res = await ctx.model.Poetry.findAll({
          where: {
            id: id,
          },
        });
        return res[0].dataValues;
      }
      case 2: {
        const res = await ctx.model.Lunyu.findAll({
          where: {
            id: id,
          },
        });
        return res[0].dataValues;
      }
      case 3: {
        const res = await ctx.model.Shijing.findAll({
          where: {
            id: id,
          },
        });
        return res[0].dataValues;
      }
    }
  }
}
module.exports = HomeService;
