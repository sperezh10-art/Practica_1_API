 
const db = require("../models");
const Proveedor = db.proveedores;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

    if (!req.body.nombre) {
        res.status(400).send({
            message: "Ningun campo puede quedar vacio"
        });
        return;
    }

    const proveedor = {
        nombre: req.body.nombre,
        apellido: req.body.apellido, 
        correo: req.body.correo,
        telefono: req.body.telefono,

        status: req.body.status ? req.body.status : false
    };


    Proveedor.create(proveedor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al crear un proveedor"
            });
        });
};


exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Proveedor.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error al recuperar los proveedores"
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Proveedor.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar al proveedor con el id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Proveedor.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El proveedor ha sido actualizado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualzar el proveedor con el id=${id}. El proveedor no fue encontrado o req.body esta vacio!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar al proveedor con el id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Proveedor.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El proveedor fue eleiminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar al proveedor con el id=${id}. El proveedor no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el proveedor con id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Proveedor.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Los proveedores han sido eliminados exitosamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error al intentar eliminar a todos los proveedores"
            });
        });
};


exports.findAllStatus = (req, res) => {
    Proveedor.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algun error ha ocurrido al intentar encontrar al proveedor"
            });
        }) 
    
    };