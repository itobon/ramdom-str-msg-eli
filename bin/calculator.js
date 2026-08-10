#!/usr/bin/env node
const readline = require('readline');
const { calcular } = require('../src/calculator.js');

const AZUL = "\x1b[34m";
const ROJO = "\x1b[31m";
const RESET = "\x1b[89m";

const evaluar = (entrada) => {
    const partes = entrada.trim().split(/\s+/);
    if (partes.length !== 3) {
        throw new Error("Formato esperado: <numero> <operador> <numero>");
    }
    const [a, operador, b] = partes;
    return calcular(Number(a), operador, Number(b));
};

const modoInteractivo = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(`${AZUL}Calculadora basica. Escribe "salir" para terminar.${RESET}`);
    console.log(`${AZUL}Ejemplo: 4 + 2${RESET}`);
    rl.setPrompt("> ");
    rl.prompt();

    rl.on('line', (linea) => {
        const entrada = linea.trim();
        if (entrada === "salir" || entrada === "exit") {
            rl.close();
            return;
        }
        if (entrada !== "") {
            try {
                console.log(`${AZUL}= ${evaluar(entrada)}${RESET}`);
            } catch (error) {
                console.error(`${ROJO}${error.message}${RESET}`);
            }
        }
        rl.prompt();
    });

    rl.on('close', () => {
        console.log(`${AZUL}Hasta luego!${RESET}`);
    });
};

const argumentos = process.argv.slice(2);

if (argumentos.length === 0) {
    modoInteractivo();
} else {
    try {
        console.log(evaluar(argumentos.join(" ")));
    } catch (error) {
        console.error(`${ROJO}${error.message}${RESET}`);
        process.exit(1);
    }
}
