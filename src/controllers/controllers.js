// src/controllers/controllers.js

const listPersonal = (req, res, next) => {
    const db = req.app.get("db");
    const query = "SELECT * from personal";
    db.query(query, function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("listPersonal", { listPersonal: rows, title: "Lista de personal" });
    });
};

const agregarPersonal = (req, res, next) => {
    res.render('agregarPersonal', { title: "Agregar personal" });
};

const postAgregarPersonal = (req, res, next) => {
    const db = req.app.get("db");
    const nombre = req.body.nombre;
    const email = req.body.email;
    const oficina_id = req.body.oficina_id;
    const query = "INSERT into personal(nombre, email, oficina_id) VALUES (?, ?, ?)";
    db.query(query, [nombre, email, oficina_id], function (err) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/personal");
    });
};

const getEditarPersonal = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM personal WHERE id= (?)", [id], function (err, row) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('editPersona', { item: row[0], title: "Editar persona" });
    });
};

const postUpdatePersonal = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    var nombre = req.body.nombre;
    var email = req.body.email;
    var oficina_id = req.body.oficina_id;
    db.query("UPDATE personal SET nombre=?, email=?, oficina_id= ? WHERE id=?", [nombre, email, oficina_id, id], function (err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personal');
    });
};

const getDeletePersonal = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM personal WHERE id=?", id, function (err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('borrarPersonal', { item: rows[0], title: "Borrar" });
    });
};

const postDeletePersonal = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("DELETE FROM personal WHERE id=?", id, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personal');
    });
};

const buscarPersonal = (req, res, next) => {
    res.render('busquedaPersonal', { title: "Buscar" });
};

const buscarPersonalResultados = (req, res, next) => {
    var db = req.app.get("db");
    var keyword = req.body.keyword;
    const query = 'SELECT personal.nombre, personal.email WHERE nombre LIKE ?';
    db.query(query, [`%${keyword}%`], (err, rows) => {
        if (err) throw err;
        res.render('resultadosPersonal', { personal: rows, title: "Resultados" });
    });
};

module.exports = { 
    listPersonal,
    agregarPersonal,
    postAgregarPersonal,
    getEditarPersonal,
    postUpdatePersonal,
    getDeletePersonal,
    postDeletePersonal,
    buscarPersonal,
    buscarPersonalResultados,
};
