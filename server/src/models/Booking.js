module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        name: DataTypes.STRING,
        date: DataTypes.STRING,
        num: DataTypes.INTEGER,
        tel :DataTypes.STRING,
    })
    return Booking
}