const Service = require('egg').Service;
const { QueryTypes } = require('sequelize');

function isLeapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

//判断天数
function getDays(year, month, day) {
  var days = day;

  //天数没有规律,故放在一个数组中
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (var i = 0; i < month; i++) {
    //传进来的月份,对应的下标是-1的
    days += monthDays[i];
  }

  //如果是闰年,天数加一
  if (isLeapYear(year) && month > 2) {
    days++;
  }
  return days++;
}

class HomeService extends Service {
  async findSentence() {
    const { app } = this;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const pastDays = getDays(year, month, day);

    // 因为目前数据库每日一句只有3条数据，所以%3
    const res = await app.model.Sentence.findAll({
      where: {
        id: pastDays % 3 + 1,
      },
    });

    // const res = await app.model.query(
    //   'SELECT * FROM sentence AS t1  JOIN (SELECT ROUND(RAND() * ((SELECT MAX(id) FROM `sentence`)-(SELECT MIN(id) FROM sentence))+(SELECT MIN(id) FROM sentence)) AS id) AS t2 WHERE t1.id >= t2.id ORDER BY t1.id LIMIT 1',
    //   { type: QueryTypes.SELECT }
    // );

    return res;
  }

  async findRecommend() {
    const { app } = this;

    let res = await app.model.query(
      'SELECT composition_id, category, count(*) as `count` FROM (SELECT composition_id, category FROM `like` UNION ALL SELECT composition_id, category FROM `collect`) AS T GROUP BY composition_id, category ORDER BY count DESC',
      { type: QueryTypes.SELECT }
    );

    console.log(res);

    // 取前15首
    res = res.slice(0, 15);

    // 获取喜爱和收藏总数最多的前15首对应的诗句
    res = await Promise.all(
      res.map(async (item) => {
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
        console.log(res);
        return res[0];
      }
      case 1: {
        const res = await ctx.model.Poetry.findAll({
          where: {
            id: id,
          },
        });
        console.log(res);
        return res[0];
      }
      case 2: {
        const res = await ctx.model.Lunyu.findAll({
          where: {
            id: id,
          },
        });
        console.log(res);
        return res[0];
      }
      case 3: {
        const res = await ctx.model.Shijing.findAll({
          where: {
            id: id,
          },
        });
        console.log(res);
        return res[0];
      }
    }
  }
}
module.exports = HomeService;
