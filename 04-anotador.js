/*
Anotador
Propiedades

titulo (string)
notas (array de strings), inicializa vacío
Constructor

pide como argumento titulo y lo asigna a sus respectiva propiedad
Método

agregarNota(nota) agrega nota al array de notas
actualizarNota(id, nota) actualiza el ítem con índice id, reemplazándolo por nota
obtenerNota(id) devuelve el ítem del array notas con índice id
eliminarNota(id) elimina de notas el ítem con índice id
eliminarNotas() borra todos los ítems de notas
listarNotas() devuelve un string con todas las notas y sus respectivos ids, por ejemplo

Cosas para hacer
------------------------
1. Ir al súper
2. Ver serie
3. Programar
4. Leer libro
*/

class Anotador {
  // Propiedades
  #titulo;
  #notas = [];
  

  constructor(titulo) {
    this.#titulo = titulo;
  }

  // Getters
  get titulo() { return this.#titulo; }
  get notas() { return [...this.#notas]; }

  // Métodos
  agregarNota(nota) {
    this.#notas.push(nota);
  }
  actualizarNota(id, nota) {
    this.#notas[id - 1] = nota;
  }
  obtenerNota(id) {
    return this.#notas[id - 1];
  }
  eliminarNota(id) {
    this.#notas.splice(id - 1, 1);
  }
  eliminarNotas() {
    this.#notas = [];
  }
  listarNotas() {
    let resultado = `${this.#titulo}\n------------------------\n`;
    this.#notas.forEach((nota, i) => {
        resultado += `${i + 1}. ${nota}\n`;
    });
    return resultado;
  }
}

// --- Pruebas de ejecución ---
const miAnotador = new Anotador('Cosas para hacer');

miAnotador.agregarNota('Ir al súper');
miAnotador.agregarNota('Ver serie');
miAnotador.agregarNota('Programar');
miAnotador.agregarNota('Leer libro');

console.log("--- Lista inicial ---");
console.log(miAnotador.listarNotas());

console.log(miAnotador.obtenerNota(1));

miAnotador.actualizarNota(1, 'Pasear al perro');

miAnotador.eliminarNota(3);

console.log("\n--- Lista modificada ---");
console.log(miAnotador.listarNotas());

const copiaNotas = miAnotador.notas;
copiaNotas.push('Tratar de modificar desde afuera');

console.log("\n--- Verificación de copia (no debe incluir la nota externa) ---");
console.log(miAnotador.listarNotas());

miAnotador.eliminarNotas();
console.log("--- Tras eliminar todas ---");
console.log(miAnotador.listarNotas());