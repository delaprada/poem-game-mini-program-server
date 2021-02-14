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
create table user (
	openid varchar(100) not null comment openid,
	nickname varchar(100) default null comment '昵称',
	avatar_url varchar(1000) default null comment '头像地址',
	gender int(1) default 0 comment '性别',
	province varchar(30) default null comment '省份',
	city varchar(30) default null comment '城市',
	country varchar(30) default null comment '国家',
	primary key openid
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci
COMMENT='古诗词小程序';
*/
