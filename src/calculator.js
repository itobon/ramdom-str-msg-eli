const sumar = (a, b) => a + b;

const restar = (a, b) => a - b;

const multiplicar = (a, b) => a * b;

const dividir = (a, b) => {
    if (b === 0) {
        throw new Error("No se puede dividir entre cero");
    }
    return a / b;
};

const operaciones = {
    "+": sumar,
    "-": restar,
    "*": multiplicar,
    "x": multiplicar,
    "/": dividir,
};

const calcular = (a, operador, b) => {
    const operacion = operaciones[operador];
    if (!operacion) {
        throw new Error(`Operador no soportado: ${operador}`);
    }
    if (Number.isNaN(a) || Number.isNaN(b)) {
        throw new Error("Los operandos deben ser numeros");
    }
    return operacion(a, b);
};

module.exports = {
    sumar,
    restar,
    multiplicar,
    dividir,
    calcular
};
