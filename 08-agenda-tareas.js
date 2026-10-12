/*
Agenda con Tareas
Tarea
Propiedades
id (string)
descripcion (string)
categoria (string)
vencimiento (Date)
finalizada (booleano), inicializa en false
Constructor
toma como argumentos descripcion, categoria, vencimiento y los asigna a sus propiedades
genera un id automático y lo asigna a su propiedad
Métodos
finalizar() cambia finalizada a true
getters para obtener los valores de todas las propiedades
Agenda
Propiedades
tareas (array de Tarea), inicializa vacío
Métodos
agregar(tarea) agrega tarea a tareas
eliminar(id) elimina de tareas la tarea con id
finalizar(id) finaliza la Tarea con id
obtener(id) devuelve la tarea con id
obtenerTodas() devuelve un array con todas las tareas
filtrarActivas() devuelve un array de tareas que no estén finalizadas
filtrarFinalizadas() devuelve un array de tareas que estén finalizadas
filtrarPorCategoria(categoria) devuelve un array de tareas que tenga categoria
filtrarPorVencimiento(fecha) devuelve un array de tareas que tenga vencimiento en fecha
*/

class Tarea {
    // Propiedades
    #id;
    #descripcion;
    #categoria;
    #vencimiento;
    #finalizada = false;

    constructor(descripcion, categoria, vencimiento) {
        this.#id = crypto.randomUUID();
        this.#descripcion = descripcion;
        this.#categoria = categoria;
        this.#vencimiento = vencimiento;
    }

    // Getters
    get id() { return this.#id; }
    get descripcion() { return this.#descripcion; }
    get categoria() { return this.#categoria; }
    get vencimiento() { return this.#vencimiento; }
    get finalizada() { return this.#finalizada; }

    // Métodos
    finalizar() {
        this.#finalizada = true;
    }
}

class Agenda {
    // Propiedades
    #tareas = [];

    // Métodos
    agregar(tarea) {
        this.#tareas.push(tarea);
    }

    eliminar(id) {
        this.#tareas = this.#tareas.filter(tarea => tarea.id !== id);
    }

    finalizar(id) {
        const tarea = this.#tareas.find(tarea => tarea.id === id);
        if(tarea) {
            tarea.finalizar();
        }
    }

    obtener(id) {
        return this.#tareas.find(tarea => tarea.id === id);
    }

    obtenerTodas() {
        return [...this.#tareas];
    }

    filtrarActivas() {
        return this.#tareas.filter(tarea => !tarea.finalizada);
    }

    filtrarFinalizadas() {
        return this.#tareas.filter(tarea => tarea.finalizada);
    }

    filtrarPorCategoria(categoria) {
        return this.#tareas.filter(tarea => tarea.categoria === categoria);
    }
    filtrarPorVencimiento(fecha) {
        return this.#tareas.filter(tarea => tarea.vencimiento.toDateString() === fecha.toDateString());
    }
}

// --- Pruebas de ejecución con console.table ---
const agenda = new Agenda();

const hoy = new Date();
const manana = new Date();
manana.setDate(hoy.getDate() + 1);

const t1 = new Tarea("Estudiar POO", "Estudio", hoy);
const t2 = new Tarea("Comprar comida para el perro", "Hogar", hoy);
const t3 = new Tarea("Pagar internet", "Servicios", manana);

agenda.agregar(t1);
agenda.agregar(t2);
agenda.agregar(t3);

console.log("=== Todas las tareas ===");
console.table(
  agenda.obtenerTodas().map(t => ({
    id: t.id,
    descripcion: t.descripcion,
    categoria: t.categoria,
    vencimiento: t.vencimiento.toLocaleDateString("es-AR"),
    finalizada: t.finalizada
  }))
);

// Finalizar t1
agenda.finalizar(t1.id);

console.log("\n=== Tareas Activas ===");
console.table(agenda.filtrarActivas().map(t => ({
    id: t.id,
    descripcion: t.descripcion,
    categoria: t.categoria,
    vencimiento: t.vencimiento.toLocaleDateString("es-AR"),
    finalizada: t.finalizada
  }))
);

console.log("\n=== Tareas Finalizadas ===");
console.table(agenda.filtrarFinalizadas().map(t => ({
    id: t.id,
    descripcion: t.descripcion,
    categoria: t.categoria,
    vencimiento: t.vencimiento.toLocaleDateString("es-AR"),
    finalizada: t.finalizada
  }))
);

console.log("\n=== Tareas de Categoria 'Estudio' ===");
console.table(agenda.filtrarPorCategoria("Estudio").map(t => ({
    id: t.id,
    descripcion: t.descripcion,
    categoria: t.categoria,
    vencimiento: t.vencimiento.toLocaleDateString("es-AR"),
    finalizada: t.finalizada
  }))
);

console.log("\n=== Tareas para Hoy ===");
console.table(agenda.filtrarPorVencimiento(hoy).map(t => ({
    id: t.id,
    descripcion: t.descripcion,
    categoria: t.categoria,
    vencimiento: t.vencimiento.toLocaleDateString("es-AR"),
    finalizada: t.finalizada
  }))
);

// Eliminar t2
agenda.eliminar(t2.id);

console.log("\n=== Todas tras eliminar 'Comprar comida' ===");
console.table(agenda.obtenerTodas().map(t => ({
    id: t.id,
    descripcion: t.descripcion,
    categoria: t.categoria,
    vencimiento: t.vencimiento.toLocaleDateString("es-AR"),
    finalizada: t.finalizada
  }))
);