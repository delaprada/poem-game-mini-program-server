module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const record = app.model.define(
    'record',
    {
      record_id: {
        type: INTEGER(11),
        primaryKey: true,
      },
      record_name: {
        type: STRING(100),
        defaultValue: '朗诵作品',
      },
      record_url: STRING(1000),
      poem_id: INTEGER(11),
      category: INTEGER(1),
      openid: STRING(100),
      dt: INTEGER(11),
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

// CREATE TABLE miniprogram.record (
//   record_id int(11) not null auto_increment comment '音频id',
//   record_name varchar(100) not null comment '音频名称',
//   record_url varchar(1000) not null comment '音频MP3地址',
//   poem_id int(11) not null comment '诗词id',
//   category int(1) not null comment '诗词类别',
//   openid varchar(100) not null comment '用户openid',
//    PRIMARY KEY (record_id)
//   )
//   ENGINE=InnoDB
//   DEFAULT CHARSET=utf8mb4
//   COLLATE=utf8mb4_0900_ai_ci
//   COMMENT='古诗词小程序';
