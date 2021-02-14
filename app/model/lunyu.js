module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const lunyu = app.model.define(
    'lunyu',
    {
      id: {
        type: INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
      },
      chapter: STRING(100),
      content: TEXT,
    },
    {
      freezeTableName: true,
      tableName: 'lunyu',
      timestamps: false,
      underscored: true,
    }
  );
  return lunyu;
};
