module.exports = (app) => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const dynamic = app.model.define(
    'dynamic',
    {
      id: {
        type: INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
      },
      openid: STRING(100),
      dynamic_type: INTEGER(1),
      category: INTEGER(1),
      composition_id: INTEGER(11),
      record_id: {
        type: INTEGER(11),
        defaultValue: null,
      },
      exec_time: BIGINT(19),
    },
    {
      freezeTableName: true,
      tableName: 'dynamic',
      timestamps: false,
      underscored: true,
    }
  );
  return dynamic;
};
