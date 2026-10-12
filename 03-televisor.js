/*
Televisor
Propiedades

encendido (booleano), inicializa en false
canal (número), inicializa en 0
canales (número)
volumen (número), inicializa en 0
marca (string)
Constructor

pide como argumentos marca y canales y los asigna a sus respectivas propiedades
Métodos

prender() pone encendido en true
apagar() pone encendido en false
verCanalSiguiente() suma 1 a canal y actualiza dicha propiedad
verCanalAnterior() resta 1 a canal y actualiza dicha propiedad
cambiarCanal(canal) actualiza la propiedad canal con el valor del parámetro canal
subirVolumen() suma 1 a volumen y actualiza dicha propiedad
bajarVolumen() resta 1 a volumen y actualiza dicha propiedad
toString() devuelve un string como el siguiente ejemplo:

Televisor Samsung
- Canales: 100
- Canal actual: 23
- Volumen actual: 34
Observaciones

solo se puede modificar el canal y el volumen si el televisor se encuentra prendido
canales representa el máximo de canales posibles. Si se está en el canal máximo o mínimo (0), y se avanza o retrocede, debe dar toda la vuelta. P. ej.: si el canal máximo es 100, se está en el canal 100, y se avanza de canal, debe volver al 0
solo se puede cambiar a un canal que exista
el volumen mínimo es 0 y el máximo 100
*/

class Televisor {
  // Propiedades
  #encendido = false;
  #canal = 0;
  #canales;
  #volumen = 0;
  #marca;

  constructor(marca, canales) {
    this.#marca = marca;
    this.#canales = canales;
  }

  // Getters
  get encendido() { return this.#encendido; }
  get canal() { return this.#canal; }
  get canales() { return this.#canales; }
  get volumen() { return this.#volumen; }
  get marca() { return this.#marca; }

  // Métodos
  prender() {
    this.#encendido = true;
  }
  apagar() {
    this.#encendido = false;
  }
  verCanalSiguiente() {
    if (!this.#encendido) throw new Error("El televisor está apagado.");
    this.#canal = (this.#canal === this.#canales) ? 0 : this.#canal + 1;
  }

  verCanalAnterior() {
    if (!this.#encendido) throw new Error("El televisor está apagado.");
    this.#canal = (this.#canal === 0) ? this.#canales : this.#canal - 1;
  }

  cambiarCanal(canal) {
    if (!this.#encendido) throw new Error("El televisor está apagado.");
    if (canal < 0 || canal > this.#canales) throw new Error("Canal no disponible");
    this.#canal = canal;
  }

  subirVolumen() {
    if (!this.#encendido) throw new Error("El televisor está apagado.");
    if (this.#volumen < 100) this.#volumen++;
  }

  bajarVolumen() {
    if (!this.#encendido) throw new Error("El televisor está apagado.");
    if (this.#volumen > 0) this.#volumen--;
  }

  toString() {
    return `Televisor ${this.#marca}\n- Canales: ${this.#canales}\n- Canal actual: ${this.#canal}\n- Volumen actual: ${this.#volumen}`;
  }
}

// --- Prueba de ejecución ---
const tv = new Televisor('Samsung', 100);

// 1. Intentar cambiar canal estando apagado
try {
  tv.verCanalSiguiente();
} catch (error) {
  console.log("Error atrapado:", error.message);
}

// 2. Encender y probar volumen / canal
tv.prender();
tv.subirVolumen();
tv.subirVolumen();
tv.cambiarCanal(23);

console.log("\n--- Estado actual de la TV ---");
console.log(tv.toString());

// 3. Probar rotación de canales (dar la vuelta)
tv.cambiarCanal(100);
tv.verCanalSiguiente(); // Pasa al canal 0
console.log("\nCanal tras avanzar desde el máximo (100 -> 0):", tv.canal);

tv.verCanalAnterior(); // Pasa al canal 100
console.log("Canal tras retroceder desde 0 (0 -> 100):", tv.canal);

// 4. Intentar ir a un canal que no existe
try {
  tv.cambiarCanal(150);
} catch (error) {
  console.log("\nError al cambiar a canal inexistente:", error.message);
}

tv.apagar();
console.log("\n¿TV encendida al final?:", tv.encendido);

try {
  tv.verCanalAnterior();
} catch (error) {
  console.error(error.message);
}

