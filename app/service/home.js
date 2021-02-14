const Service = require('egg').Service;
const { QueryTypes } = require('sequelize');

class HomeService extends Service {
  async findSentence() {
    const { app } = this;

    const res = await app.model.query(
      'SELECT * FROM sentence AS t1  JOIN (SELECT ROUND(RAND() * ((SELECT MAX(id) FROM `sentence`)-(SELECT MIN(id) FROM sentence))+(SELECT MIN(id) FROM sentence)) AS id) AS t2 WHERE t1.id >= t2.id ORDER BY t1.id LIMIT 1',
      { type: QueryTypes.SELECT }
    );

    console.log(res);

    return res;
  }

  async findRecommend() {
    const { app } = this;

    const res = await app.model.query(
      'SELECT composition_id, category, count(*) as `count` FROM (SELECT composition_id, category FROM `like` UNION ALL SELECT composition_id, category FROM `collect`) AS T GROUP BY composition_id, category ORDER BY count DESC',
      { type: QueryTypes.SELECT }
    );

    console.log(res);

    return res;
  }
}
module.exports = HomeService;
