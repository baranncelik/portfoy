/*const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utility/database");

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comments', {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true
        }
    }, {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: false
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });
        Comment.belongsTo(models.Post, {
            foreignKey: {
                name: 'postId',
                allowNull: false
            }
        });
    };
};

module.exports = Comment;
*/