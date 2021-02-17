module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const like = app.model.define(
    'like',
    {
      id: {
        type: INTEGER(11),
        primaryKey: true,
      },
      openid: STRING(100),
      composition_id: INTEGER(11),
      category: INTEGER(1),
    },
    {
      freezeTableName: true,
      tableName: 'like',
      timestamps: false,
      underscored: true,
    }
  );
  return like;
};

/**
 * 
 * 用户表:MYSQL
 *
 #
CREATE TABLE miniprogram.like (
id int(11) not null auto_increment comment 'id',
openid varchar(100) not null comment 'openid',
composition_id int(11) not null comment '作品id',
category int(1) not null comment '种类',
 PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT='古诗词小程序';
*/
