module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const audio = app.model.define(
    'audio',
    {
      audio_id: { 
        type: INTEGER(11),
        primaryKey: true,
      },
      audio_name: STRING(100),
      audio_url: STRING(1000),
      audio_dt: INTEGER(11),
      singer: STRING(100),
      al_pic_url: STRING(1000),
      al_name: STRING(100),
      poem_id: INTEGER(11),
      category: INTEGER(1),
    },
    {
      freezeTableName: true,
      tableName: 'audio',
      timestamps: false,
      underscored: true,
    }
  );
  return audio;
};

// CREATE TABLE miniprogram.audio (
//   audio_id int(11) not null auto_increment comment '音频id',
//   audio_name varchar(100) not null comment '音频名称',
//   audio_url varchar(1000) not null comment '音频MP3地址',
//   audio_dt int(11) not null comment '音频时长',
//   singer varchar(100) not null comment '朗诵者',
//   al_pic_url varchar(1000) not null comment '专辑封面地址',
//   al_name varchar(100) not null comment '专辑名称',
//   poem_id int(11) not null comment '诗词id',
//   category int(1) not null comment '诗词类别',
//    PRIMARY KEY (audio_id)
//   )
//   ENGINE=InnoDB
//   DEFAULT CHARSET=utf8mb4
//   COLLATE=utf8mb4_0900_ai_ci
//   COMMENT='古诗词小程序';