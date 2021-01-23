module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const user = app.model.define(
    'user',
    {
      id: {
        type: INTEGER(11),
        primaryKey: true,
      },
      nickname: STRING(100),
      avatar_url: STRING(1000),
      gender: INTEGER(1),
      province: STRING(100),
      city: STRING(100),
      country: STRING(100),
      openid: STRING(100),
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
CREATE TABLE eggTest.`user` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`nickname` varchar(100) DEFAULT NULL COMMENT '用户名',
`avatarUrl` varchar(100) DEFAULT NULL COMMENT '头像地址',
`gender` int(1) DEFAULT NULL COMMENT '性别',
`province`  varchar(100) DEFAULT NULL COMMENT '省份',
`city` varchar(100) DEFAULT NULL COMMENT '城市',
`country` varchar(100) DEFAULT NULL COMMENT '国家',
 PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT='eggTest用户信息';
*/
