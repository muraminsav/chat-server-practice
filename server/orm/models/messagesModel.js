//models used to create the messages table
//cannot have any exports here as we need to access the db
//if we export the db to this file we will be have an infinite loop

//'messages' - is the name of the table
//timestamp can be a DataType.DATE.

module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define("messages", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: DataTypes.BIGINT,
  });
  //if this were saved a function and not directly exported
  //Messages would need to be replaced by the name of the function
  Messages.associate = (db) => {
    db.messages.belongsTo(db.user, {
      onDelete: "CASCADE",
    });
  };
  return Messages;
};

// module.exports = model;
