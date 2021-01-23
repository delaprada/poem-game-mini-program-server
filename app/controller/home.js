const Controller = require('egg').Controller;
const jwt = require('jwt-simple');
// const crypto = require('crypto');

const SECRET = 'zhuoran';

// 使用sha1算法生成skey
// function encryptSha1(data) {
//   return crypto.createHash('sha1').update(data, 'utf8').digest('hex');
// }

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async login() {
    const { ctx } = this;
    const { code, userInfo } = ctx.request.body;
    const { nickName, avatarUrl, gender, province, city, country } = userInfo;

    // 服务器根据客户端传来的code向微信接口服务获取session_key和openid
    const res = await ctx.curl(
      `https://api.weixin.qq.com/sns/jscode2session?appid=wx6936c18b38186cf3&secret=d11f77fb7d5a959b6ba46c30dbd4da95&js_code=${code}&grant_type=authorization_code`,
      {
        dataType: 'json',
      }
    );

    // const { session_key } = res.data;
    // const skey = encryptSha1(session_key);
    // console.log(skey);

    const { openid } = res.data;

    // 将用户信息记录到数据库中
    await ctx.model.User.create({
      nickname: nickName,
      avatar_url: avatarUrl,
      gender: gender,
      province: province,
      city: city,
      country: country,
      openid: openid,
    });

    // 根据用户的openid生成token
    const token = jwt.encode(openid, SECRET);

    // 将token返回
    ctx.body = token;
  }

  async request() {
    const { ctx } = this;

    // 从请求头的authorization字段获取token
    const token = ctx.get('authorization');

    // 对token进行解密获取其中的openid
    const openid = jwt.decode(token, SECRET);

    // 根据openid查找用户信息
    const res = await ctx.model.User.findAll({
      where: {
        openid: openid,
      },
    });

    // 之后注意要将openid属性去掉，私密属性不传回给客户端
    ctx.body = res;
  }
}

module.exports = HomeController;
