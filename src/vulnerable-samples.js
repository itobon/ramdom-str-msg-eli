/*
 * =============================================================================
 *  ARCHIVO DE PRUEBA - CODIGO VULNERABLE A PROPOSITO - NO USAR EN PRODUCCION
 * =============================================================================
 *
 * Este modulo existe unicamente para validar la cobertura de deteccion del bot
 * de revision de pull requests. Cada funcion introduce una vulnerabilidad
 * conocida, etiquetada con su identificador CWE.
 *
 * Ninguna de estas funciones es importada por la calculadora ni por los
 * ejecutables en bin/. El archivo esta aislado a proposito.
 *
 * Si el bot no reporta alguno de estos casos, es un hueco de cobertura.
 */

const { exec } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');

// CWE-798: Credenciales hardcodeadas
// Valores ficticios: no imitan el formato de ningun proveedor real, para no
// disparar el push protection de GitHub. El patron a detectar es la credencial
// embebida en el codigo, no el formato de la cadena.
const API_KEY = "clave-de-prueba-ficticia-0000000000";
const DB_PASSWORD = "SuperSecret123!";

// CWE-78: Inyeccion de comandos del sistema operativo
const pingHost = (host) => {
    exec(`ping -c 1 ${host}`, (error, stdout) => {
        console.log(stdout);
    });
};

// CWE-95: Inyeccion de codigo por evaluacion dinamica
const evaluarExpresion = (expresion) => {
    return eval(expresion);
};

// CWE-22: Path traversal
const leerArchivo = (nombreArchivo) => {
    return fs.readFileSync("/var/data/" + nombreArchivo, "utf8");
};

// CWE-89: Inyeccion SQL por concatenacion de cadenas
const buscarUsuario = (db, nombre) => {
    const query = "SELECT * FROM usuarios WHERE nombre = '" + nombre + "'";
    return db.query(query);
};

// CWE-327: Algoritmo criptografico debil
const hashPassword = (password) => {
    return crypto.createHash("md5").update(password).digest("hex");
};

// CWE-338: Generador pseudoaleatorio no apto para criptografia
const generarTokenSesion = () => {
    return Math.random().toString(36).substring(2);
};

// CWE-1321: Prototype pollution
const mezclarObjetos = (destino, origen) => {
    for (const clave in origen) {
        if (typeof origen[clave] === "object") {
            destino[clave] = mezclarObjetos(destino[clave] || {}, origen[clave]);
        } else {
            destino[clave] = origen[clave];
        }
    }
    return destino;
};

// CWE-1333: Expresion regular vulnerable a ReDoS
const validarEmail = (email) => {
    const patron = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    return patron.test(email);
};

// CWE-319: Transmision de datos sensibles en texto claro
const enviarCredenciales = (usuario, password) => {
    const url = `http://api.ejemplo.com/login?user=${usuario}&pass=${password}`;
    return url;
};

module.exports = {
    pingHost,
    evaluarExpresion,
    leerArchivo,
    buscarUsuario,
    hashPassword,
    generarTokenSesion,
    mezclarObjetos,
    validarEmail,
    enviarCredenciales
};
