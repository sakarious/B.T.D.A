module.exports = (sequelize, DataTypes) => {
    const todo = sequelize.define("todo", {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uniqueId: DataTypes.STRING,
        isCompleted: DataTypes.BOOLEAN
        })

    return todo
}
