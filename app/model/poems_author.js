module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const poemsAuthor = app.model.define(
    'poemsAuthor',
    {
      id: {
        type: INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
      },
      name: STRING(100),
      intro_l: TEXT,
      intro_s: TEXT,
      dynasty: STRING(100),
    },
    {
      freezeTableName: true,
      tableName: 'poems_author',
      timestamps: false,
      underscored: true,
    }
  );
  return poemsAuthor;
};
