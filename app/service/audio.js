const Service = require('egg').Service;

class AudioService extends Service {
  async getAudio(poem_id, category) {
    const res = await this.findAudio(poem_id, category);

    return res;
  }

  async findAudio(poem_id, category) {
    const { ctx } = this;

    const res = await ctx.model.Audio.findAll({
      where: {
        poem_id: poem_id,
        category: category,
      },
    });

    return res;
  }
}
module.exports = AudioService;
