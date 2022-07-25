module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("post", {
    type: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    }, 
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB("long"),
    },
    title: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
  return Image;
};