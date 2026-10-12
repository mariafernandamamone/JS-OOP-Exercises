/*
Calculadora
Propiedades
resultado (número), inicializa en 0
Métodos
sumar(numero): suma numero a resultado, y actualiza resultado con el valor de dicha operación
restar(numero): suma numero a resultado, y actualiza resultado con el valor de dicha operación
multiplicar(numero): suma numero a resultado, y actualiza resultado con el valor de dicha operación
dividir(numero): divide resultado por numero, y actualiza resultado con el valor de dicha operación
obtenerResultado(): devuelve resultado
reiniciar(): pone resultado en 0
Observaciones
arrojar un error cuando el argumento ingresado no sea un número, con Number.isFinite()
arrojar un error cuando se intenta dividir por 0
*/

class Calculadora {

  #resultado = 0;

  sumar(numero) {
    if (!Number.isFinite(numero)) throw new Error("Debe ser un número");
    this.#resultado += numero;
  }

  restar(numero) {
    if (!Number.isFinite(numero)) throw new Error("Debe ser un número");
    this.#resultado -= numero;
  }

  multiplicar(numero) {
    if (!Number.isFinite(numero)) throw new Error("Debe ser un número");
    this.#resultado *= numero;
  }

  dividir(numero) {
    if (!Number.isFinite(numero)) throw new Error("Debe ser un número");
    if (numero === 0) throw new Error("No se puede dividir por 0");
    this.#resultado /= numero;
  }

  obtenerResultado() {
    return this.#resultado;
  }
    
  reiniciar() {
    this.#resultado = 0;
  }
}

const calc = new Calculadora();

calc.sumar(10);
calc.multiplicar(5);
calc.restar(4);
calc.dividir(2);

console.log("Resultado final:", calc.obtenerResultado());

calc.reiniciar();
console.log("Luego de reiniciar:", calc.obtenerResultado());