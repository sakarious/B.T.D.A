module.exports = (sequelize, DataTypes) => {
    const todo = sequelize.define("todo", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {         // User belongsTo Company 1:1
              model: 'users',
              key: 'id'
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uniqueId: DataTypes.STRING,
        reward: DataTypes.STRING,
        isCompleted: DataTypes.BOOLEAN
        })

    return todo
}
