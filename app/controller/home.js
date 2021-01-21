const Controller = require('egg').Controller;
const crypto = require('crypto');

function encryptSha1(data) {
  return crypto.createHash('sha1').update(data, 'utf8').digest('hex');
}

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async login() {
    const { ctx } = this;
    console.log(ctx.request.body);
    const data = ctx.request.body;
    const res = await ctx.curl(
      `https://api.weixin.qq.com/sns/jscode2session?appid=wx6936c18b38186cf3&secret=d11f77fb7d5a959b6ba46c30dbd4da95&js_code=${data.code}&grant_type=authorization_code`,
      {
        dataType: 'json',
      }
    );
    const { session_key } = res.data;
    const skey = encryptSha1(session_key);
    console.log(skey);
    ctx.body = skey;
  }
}

module.exports = HomeController;
