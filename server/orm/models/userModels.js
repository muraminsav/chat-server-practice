module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    name: DataTypes.STRING,
  });
  User.associate = (db) => {
    //sets that each user can have many messages
    db.User.hasMany(db.Messages);
  };
  return User;
};

// module.exports = userModel;
