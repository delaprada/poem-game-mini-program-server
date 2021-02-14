module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const sentence = app.model.define(
    'sentence',
    {
      id: {
        type: INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
      },
      category: INTEGER(11),
      composition_id: INTEGER(11),
      author: STRING(100),
      title: STRING(100),
      content: TEXT,
      dynasty: STRING(1),
    },
    {
      freezeTableName: true,
      tableName: 'sentence',
      timestamps: false,
      underscored: true,
    }
  );
  return sentence;
};

// create table sentence (
// 	id int(11) not null auto_increment comment 'id',
// 	category int(1) not null comment '什么类型的作品',
// 	composition_id int(11) not null comment '作品id',
// 	author varchar(255) default null comment '作者',
// 	title varchar(255) not null comment '作品标题',
// 	content text not null comment '作品内容',
// 	dynasty varchar(1) default null comment '朝代',
// 	primary key (`id`)
// )
// ENGINE=InnoDB
// DEFAULT CHARSET=utf8mb4
// COLLATE=utf8mb4_general_ci
// COMMENT='古诗词小程序';