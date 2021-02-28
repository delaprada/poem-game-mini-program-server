module.exports = (app) => {
  const { STRING, INTEGER, BIGINT, TEXT } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const poems = app.model.define(
    'poems',
    {
      id: {
        type: INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
      },
      author_id: INTEGER(11),
      title: STRING(100),
      content: TEXT,
      author: STRING(100),
      category: INTEGER(1),
    },
    {
      freezeTableName: true,
      tableName: 'poems',
      timestamps: false,
      underscored: true,
    }
  );
  return poems;
};
