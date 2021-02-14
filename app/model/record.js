module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const record = app.model.define(
    'record',
    {
      openid: {
        type: STRING(100),
        primaryKey: true,
      },
      record_id: {
        type: INTEGER(11),
        primaryKey: true,
      }
    },
    {
      freezeTableName: true,
      tableName: 'record',
      timestamps: false,
      underscored: true,
    }
  );
  return record;
};

/**
 * 
 * 用户表:MYSQL
 *
 #
CREATE TABLE miniprogram.record (
openid int(11) not null comment 'openid',
composition_id int(11) not null comment '作品id',
 PRIMARY KEY (openid, composition_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT='古诗词小程序';
*/
