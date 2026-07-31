module.exports = (sequelize, Sequelize) => {

    const Proveedor = sequelize.define("proveedor", {
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    }, {
        tableName: "proveedores",
        timestamps: false
    });

    return Proveedor;
};