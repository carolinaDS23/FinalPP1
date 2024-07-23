const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    //host: 'mysql',
    user: 'root',
    password: '1234'
});

// Conectar al servidor
db.connect((err) => {
    if(err){
        console.log("Error en la conexión al servidor");
        return;
    }

    // Verificar si existe la base de datos
    db.query("CREATE DATABASE IF NOT EXISTS empleados" ,(err) => {
        if(err){
            console.log("Error al crear la base de datos");
            return;
        }
        console.log("BD creada o ya existente");
    });

    // Seleccionar la base de datos
    db.query("USE empleados", (err) =>{
        if(err){
            console.log("Error al seleccionar la base de datos");
            return;
        }
        console.log("Conexión exitosa");
    });
  
 
    //verificar si existe la tabla personal o crear tabla personal
    const createTablePersonalSQL = `
        CREATE TABLE IF NOT EXISTS personal (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(45) NOT NULL,
            email VARCHAR(45) NOT NULL
);
  `
    db.query(createTablePersonalSQL, (err) => {
        if(err){
            console.log("Error al crear la tabla personal");
            console.log(err);
            return;
        }
        console.log("Tabla personal creada o ya existente");
    });
});

module.exports = db;