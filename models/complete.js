module.exports = (sequelize, DataTypes) => {
    const done = sequelize.define("done", {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uniqueId: DataTypes.STRING,
        isCompleted: DataTypes.BOOLEAN,
        reward: DataTypes.STRING,
        })

    return done
}
