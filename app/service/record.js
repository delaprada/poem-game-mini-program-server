const Service = require('egg').Service;
let OSS = require('ali-oss');

let aliInfo = {
  // https://help.aliyun.com/document_detail/31837.html
  region: 'oss-cn-guangzhou',
  bucket: 'poem-mini-program',
  accessKeyId: '',
  accessKeySecret: '',
};

let client = new OSS(aliInfo);

class RecordService extends Service {
  async postRecord(file, record_name, poem_id, category, dt) {
    const url = await this.uploadOSS(file);
    await this.updateRecord(url, record_name, poem_id, category, dt);

    return url;
  }

  async uploadOSS(file) {
    const { ctx } = this;

    let result;
    try {
      // 处理文件，比如上传到云端
      result = await client.put(file.filename, file.filepath);
    } finally {
      // 需要删除临时文件
      await ctx.cleanupRequestFiles();
    }
    return result.url;
  }

  async updateRecord(url, record_name, poem_id, category, dt) {
    const { ctx } = this;

    console.log('从ctx.locals中取openid');
    console.log(ctx.locals.openid);
    const openid = ctx.locals.openid;

    // 将用户信息记录到数据库中
    await ctx.model.Record.create({
      record_name: record_name,
      record_url: url,
      poem_id: poem_id,
      category: category,
      openid: openid,
      dt: dt,
    });

    await ctx.model.Dynamic.create({
      openid: openid,
      dynamic_type: 2,
      category: category,
      composition_id: poem_id,
      exec_time: new Date().getTime(),
    });
  }
}
module.exports = RecordService;
