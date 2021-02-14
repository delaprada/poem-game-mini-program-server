module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  // 属性名的定义要全是小写，驼峰式会出问题
  const shijing = app.model.define(
    'shijing',
    {
      id: {
        type: INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
      },
      title: STRING(100),
      chapter: STRING(100),
      section: STRING(100),
      content: TEXT,
    },
    {
      freezeTableName: true,
      tableName: 'shijing',
      timestamps: false,
      underscored: true,
    }
  );
  return shijing;
};

// CREATE TABLE `shijing` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `title` varchar(255) NOT NULL,
//   `chapter` varchar(255) NOT NULL,
//   `section` varchar(255) NOT NULL,
//   `content` text NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
