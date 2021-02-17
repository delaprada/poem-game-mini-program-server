module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const poetryAuthor = app.model.define(
    'poetryAuthor',
    {
      id: {
        type: INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
      },
      name: STRING(100),
      intro: TEXT,
      dynasty: STRING(100),
    },
    {
      freezeTableName: true,
      tableName: 'poetry_author',
      timestamps: false,
      underscored: true,
    }
  );
  return poetryAuthor;
};
