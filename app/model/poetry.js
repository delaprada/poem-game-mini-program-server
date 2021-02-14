module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const poetry = app.model.define(
    'poetry',
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
    },
    {
      freezeTableName: true,
      tableName: 'poetry',
      timestamps: false,
      underscored: true,
    }
  );
  return poetry;
};
