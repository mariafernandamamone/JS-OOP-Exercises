/*
Auto
Propiedades
encendido (booleano), inicializa en false
velocidad (número), inicializa en 0
marca (string)
modelo (número)
patente (string)
Constructor
pide como argumentos marca, modelo, patente y los asigna a sus respectivas propiedades
Métodos
arrancar() pone encendido en true
apagar() pone encendido en false
acelerar() suma 10 a velocidad y actualiza dicha propiedad
desacelerar() resta 10 a velocidad y actualiza dicha propiedad
toString() devuelve un string con la siguiente plantilla ${marca} ${modelo}, patente ${patente}
Observaciones
sólo se puede acelerar o desacelerar si el auto se encuentra prendido
sólo se puede apagar el auto si la velocidad es 0
la velocidad mínima es 0
*/

class Auto {
  #encendido = false;
  #velocidad = 0;
  #marca;
  #modelo;
  #patente;

  constructor(marca, modelo, patente) {
    this.#marca = marca;
    this.#modelo = modelo;
    this.#patente = patente;
  }

  // Getters para consultar el estado desde afuera
  get encendido() {
    return this.#encendido;
  }

  get velocidad() {
    return this.#velocidad;
  }

  get marca() {
    return this.#marca;
  }

  get modelo() {
    return this.#modelo;
  }

  get patente() {
    return this.#patente;
  }

  // Métodos
  arrancar() {
    this.#encendido = true;
  }

  apagar() {
    if (this.#velocidad > 0) {
      throw new Error("No se puede apagar el auto mientras esté en movimiento.");
    }
    this.#encendido = false;
  }

  acelerar() {
    if (!this.#encendido) {
      throw new Error("No se puede acelerar si el auto está apagado.");
    }
    this.#velocidad += 10;
  }

  desacelerar() {
    if (!this.#encendido) {
      throw new Error("No se puede desacelerar si el auto está apagado.");
    }
    this.#velocidad -= 10;
    if (this.#velocidad < 0) {
      this.#velocidad = 0;
    }
  }

  toString() {
    return `${this.#marca} ${this.#modelo}, patente ${this.#patente}`;
  }
}

// --- Prueba de ejecución ---
const miAuto = new Auto('Toyota', 2022, 'AGT159');

console.log("Información del auto:", miAuto.toString());
console.log("¿Está encendido?:", miAuto.encendido); // false

miAuto.arrancar();
console.log("¿Está encendido después de arrancar?:", miAuto.encendido); // true

miAuto.acelerar();
miAuto.acelerar();
console.log("Velocidad actual:", miAuto.velocidad); // 20

// Intentamos apagarlo en marcha usando try/catch
try {
  miAuto.apagar();
} catch (error) {
  console.log("Error atrapado:", error.message);
}

// Frena hasta detenerse
miAuto.desacelerar();
miAuto.desacelerar();
console.log("Velocidad tras frenar:", miAuto.velocidad); // 0

miAuto.apagar();
console.log("¿Está encendido al final?:", miAuto.encendido); // false