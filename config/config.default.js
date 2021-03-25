const path = require('path');

module.exports = (app) => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = app.name + '_1611132479528_703';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public'),
  };

  // 本地数据库密码为1999125ZZR 远程服务器数据库密码为123456
  // sequelize配置
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'miniprogram',
    username: 'root',
    password: 'xxx',
  };

  // csrf配置先设定为false
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.multipart = {
    mode: 'file',
    fileSize: '50mb',
  }

  return {
    ...config,
    ...userConfig,
  };
};
