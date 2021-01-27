module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const user = app.model.define(
    'user',
    {
      nickname: STRING(100),
      avatar_url: STRING(1000),
      gender: INTEGER(1),
      province: STRING(100),
      city: STRING(100),
      country: STRING(100),
      openid: {
        type: STRING(100),
        primaryKey: true,
      },
    },
    {
      freezeTableName: true,
      tableName: 'user',
      timestamps: false,
      underscored: true,
    }
  );
  return user;
};

/**
 * 
 * 用户表:MYSQL
 *
 #
CREATE TABLE loginTest.`user` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`nickname` varchar(100) DEFAULT NULL COMMENT '用户名',
`avatar_url` varchar(1000) DEFAULT NULL COMMENT '头像地址',
`gender` int(1) DEFAULT NULL COMMENT '性别',
`province`  varchar(100) DEFAULT NULL COMMENT '省份',
`city` varchar(100) DEFAULT NULL COMMENT '城市',
`country` varchar(100) DEFAULT NULL COMMENT '国家',
`openid` varchar(100) DEFAULT NULL COMMENT 'openid',
 PRIMARY KEY (`openid`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT='eggTest用户信息';
*/
