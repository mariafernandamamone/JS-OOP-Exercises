/*
Celular
Propiedades
contactos (array de objetos), inicializa vacío
llamadas (array de strings), inicializa vacío
Métodos
agregarContacto(contacto) agrega contacto a contactos
buscarPorNombre(nombre) devuelve el contacto con dicho nombre en el array contactos o undefined si no lo encuentra
buscarPorNumero(numero) devuelve el contacto con dicho número en el array contactos o undefined si no lo encuentra
eliminarContacto(nombre)elimina el contacto con nombrenombredecontactos`
llamar(nombre) si existe un contacto con nombre nombre en la lista contactos, agrega a llamadas un string que representa un registro de la misma, usando la plantilla `Llamada a ${nombre} con número ${numero} realizada
verContactos() devuelve un string listando todos los contactos, con sus nombres y números
verHistorial() devuelve un string con la lista de llamadas realizadas
Observaciones
contacto es un objeto con las propiedades nombre y numero
no se puede agregar un contacto si ya existe en el celular alguno con el mismo nombre o número
*/

class Celular {
  // Propiedades
  #contactos = [];
  #llamadas = [];

  // Getters
  get contactos() { return [...this.#contactos]; }
  get llamadas() { return [...this.#llamadas]; }

  // Métodos
  agregarContacto(contacto) {
    const existe = this.#contactos.some(c => c.nombre === contacto.nombre || c.numero === contacto.numero);
    if (existe) throw new Error ("El contacto ya se encuentra en su lista de contactos");
    this.#contactos.push(contacto);
  }

  buscarPorNombre(nombre) {
    return this.#contactos.find(c => c.nombre === nombre);
  }

  buscarPorNumero(numero) {
    return this.#contactos.find(c => c.numero === numero);
  }

  eliminarContacto(nombre) {
    const index = this.#contactos.findIndex(c => c.nombre === nombre);
    if (index !== -1) {
      this.#contactos.splice(index, 1);
    } else {
      throw new Error("El contacto no existe.")
    }
  }

  llamar(nombre) {
    const contacto = this.buscarPorNombre(nombre);
    if (!contacto) {
      throw new Error("El contacto no existe.")
    }
    const llamada = `Llamada a ${contacto.nombre} con número ${contacto.numero} realizada`
    this.#llamadas.push(llamada);
  }

  verContactos() {
    if (this.#contactos.length === 0) {
      throw new Error("No existen contactos en tu celular.");
    }
    let resultado = `Contactos:\n------------------------\n`;
    const listaFormateada = this.#contactos.map(c => `${c.nombre}: ${c.numero}`);
      resultado += listaFormateada.join("\n");
    return resultado;
  }

  verHistorial() {
    if (this.#llamadas.length === 0) {
      throw new Error("No existen llamadas registradas.");
    }
    let resultado = `Llamadas:\n------------------------\n`;
    this.#llamadas.forEach((llamada, i) => {
        resultado += `${i + 1}. ${llamada}\n`;
    });
    return resultado;
  }
}

// --- Pruebas de ejecución ---
const miCelular = new Celular();

// 1. Probar llamadas y contactos vacíos (debe tirar error)
try {
  miCelular.verContactos();
} catch (error) {
  console.log("Error inicial de contactos:", error.message);
}

// 2. Agregar contactos
miCelular.agregarContacto({ nombre: "Ana", numero: "11223344" });
miCelular.agregarContacto({ nombre: "Pedro", numero: "55667788" });
miCelular.agregarContacto({ nombre: "María", numero: "99001122" });

console.log("\n--- Contactos registrados ---");
console.log(miCelular.verContactos());

// 3. Validar duplicados (mismo nombre o mismo número)
try {
  miCelular.agregarContacto({ nombre: "Ana", numero: "00000000" });
} catch (error) {
  console.log("\nError al agregar duplicado:", error.message);
}

// 4. Buscar contactos
console.log("\nBúsqueda por nombre (Pedro):", miCelular.buscarPorNombre("Pedro"));
console.log("Búsqueda por número (99001122):", miCelular.buscarPorNumero("99001122"));
console.log("Búsqueda inexistente:", miCelular.buscarPorNombre("Carlos")); // Debería devolver undefined

// 5. Realizar llamadas
miCelular.llamar("Ana");
miCelular.llamar("Pedro");

console.log("\n--- Historial de llamadas ---");
console.log(miCelular.verHistorial());

// 6. Eliminar un contacto
miCelular.eliminarContacto("María");
console.log("--- Contactos tras eliminar a María ---");
console.log(miCelular.verContactos());