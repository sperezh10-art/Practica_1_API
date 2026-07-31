 
const db = require("../models");
const Producto = db.productos;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

    if (!req.body.nombre) {
        res.status(400).send({
            message: "Ningun campo puede quedar vacio"
        });
        return;
    }

    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio, 
        stock: req.body.stock,
        marca: req.body.marca
    };


    Producto.create(producto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al crear el producto"
            });
        });
};


exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Producto.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error al recuperar los productos"
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Producto.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el producto con el id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Producto.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El producto ha sido actualizado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualzar el producto con el id=${id}. El producto no fue encontrado o req.body esta vacio!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar al producto con el id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Producto.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El producto fue eleiminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el producto con el id=${id}. El producto no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el producto con id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Producto.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Los productos han sido eliminados exitosamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido algun error al intentar eliminar a todos los productos"
            });
        });
};


exports.findAllStatus = (req, res) => {
    Producto.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algun error ha ocurrido al intentar encontrar el producto"
            });
        }) 
    
    };