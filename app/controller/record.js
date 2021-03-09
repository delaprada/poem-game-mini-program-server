const Controller = require('egg').Controller;

class RecordController extends Controller {
  async postRecord() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const { record_name, poem_id, category, dt } = ctx.request.body;
    
    const res = await ctx.service.record.postRecord(file, record_name, poem_id, category, dt);

    ctx.body = res;
  }
}

module.exports = RecordController;
