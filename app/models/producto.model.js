module.exports = (sequelize, Sequelize) => {

    const Producto = sequelize.define("producto", {
        nombre: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.FLOAT
        },
        stock: {
            type: Sequelize.INTEGER 
        },
        marca: {
            type: Sequelize.STRING
        }
    }, {
        tableName: "productos",
        timestamps: false
    });

    return Producto;
};