const Service = require('egg').Service;
const jwt = require('jwt-simple');

const SECRET = 'zhuoran';

// const crypto = require('crypto');

// 使用sha1算法生成skey
// function encryptSha1(data) {
//   return crypto.createHash('sha1').update(data, 'utf8').digest('hex');
// }

class UserService extends Service {
  async getToken(code) {
    const { ctx } = this;

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
    
    // 在数据库中创建新用户turple
    await this.find(openid);

    // 根据用户的openid生成token
    const token = jwt.encode(openid, SECRET);

    return {
      token: token,
      // userExist: userExist,
      // userInfo: user,
    };
  }

  async find(openid) {
    const { ctx } = this;
    let userExist = false;

    // 根据openid查找用户信息
    const user = await ctx.model.User.findByPk(openid);

    console.log(user);

    if (user === null) {
      console.log('当前用户是新用户');

      // 将用户信息记录到数据库中
      await ctx.model.User.create({
        openid: openid,
      });
    }
  }

  async update(userInfo) {
    const { ctx } = this;

    // 从请求头的authorization字段获取token
    const token = ctx.get('authorization');

    // 对token进行解密获取其中的openid
    const openid = jwt.decode(token, SECRET);

    // 获取请求体信息
    const { nickName, avatarUrl, gender, province, city, country } = userInfo;

    // 根据openid查找用户信息
    const user = await ctx.model.User.findByPk(openid);

    console.log('user');
    console.log(user);

    // 更新用户信息
    await user.update({
      nickname: nickName,
      avatar_url: avatarUrl,
      gender,
      province,
      city,
      country,
    });
  }
}
module.exports = UserService;
