/*
Chat con Usuarios y Mensajes
Usuario
Propiedades
id (string)
nombre (string)
Constructor
genera un id automático y lo asigna a su propiedad
el resto de propiedades las pide como argumentos y las asigna según corresponda
Métodos
getters para obtener los valores de todas las propiedades
Mensaje
Propiedades
remitente (Usuario)
destinatario (Usuario)
texto (string)
fecha (Date), inicializa con la fecha actual (new Date())
Constructor
pide las propiedades no inicializadas como argumentos y las asigna según corresponda
Métodos
getters para obtener los valores de todas las propiedades
Chat
Propiedades
usuario (Usuario)
contactos (array de Usuario), inicializa vacío
mensajes (array de Mensaje), inicializa vacío
Constructor
pide usuario como argumento y lo agrega a su respectiva propiedad
Métodos
agregarContacto(usuario) agregar usuario a contactos
obtenerContactos() devuelve un array con la lista de contactos
obtenerMensaje() devuelve un array con la lista de mensajes
filtrarPorContacto(id) devuelve un array con la lista de mensajes que tienen como destinatario un usuario con id
filtrarPorFecha(fecha) devuelve un array con la lista de mensajes que tienen fecha (mismo día, mes y año)
mandarMensaje(mensaje) agrega mensaje a mensajes, si destinatario es un usuario de la lista de contactos con y si mensaje no se encuentra ya en el array de mensajes
Observaciones
solo se pueden mandar mensajes a usuarios de la lista de contactos. En caso contrario, arrojar un error.
*/

class Usuario {
    // Propiedades
    #id;
    #nombre;

    constructor(nombre) {
        this.#id = crypto.randomUUID();
        this.#nombre = nombre;
    }

    // Getters
    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
}

class Mensaje {
    // Propiedades
    #remitente;
    #destinatario;
    #texto;
    #fecha = new Date();

    constructor(remitente, destinatario, texto) {
        this.#remitente = remitente;
        this.#destinatario = destinatario;
        this.#texto = texto;
    }

    // Getters
    get remitente() { return this.#remitente; }
    get destinatario() { return this.#destinatario; }
    get texto() { return this.#texto; }
    get fecha() { return this.#fecha; }
}

class Chat {
    // Propiedades
    #usuario;
    #contactos = [];
    #mensajes = [];

    constructor(usuario) {
        this.#usuario = usuario;
    }

    // Getters
    get usuario() { return this.#usuario; }
    get contactos() { return this.#contactos; }
    get mensajes() { return this.#mensajes; }

    // Métodos
    agregarContacto(usuario) {
        this.#contactos.push(usuario);
    }

    obtenerContactos() {
        return [...this.#contactos];
    }

    obtenerMensaje() {
        return [...this.#mensajes];
    }
    filtrarPorContacto(id) {
        return this.#mensajes.filter(m => m.destinatario.id === id);
    }

    filtrarPorFecha(fecha) {
        return this.#mensajes.filter(m => m.fecha.toDateString() === fecha.toDateString());
    }

    mandarMensaje(mensaje) {
        const esContacto = this.#contactos.some(c => c.id === mensaje.destinatario.id);
        if (!esContacto) throw new Error("El destinatario no se encuentra en su lista de contactos");
        const yaExiste = this.#mensajes.includes(mensaje);
        if (!yaExiste) {
            this.#mensajes.push(mensaje);
        }
    }
}

// --- Pruebas de ejecución ---

// 1. Instanciar usuarios
const usuario1 = new Usuario("Jazmín");
const usuario2 = new Usuario("Fer");
const usuario3 = new Usuario("Carlos"); // Usuario que NO estará en contactos

// 2. Instanciar el Chat (el dueño del chat)
const chatFer = new Chat(usuario2);
const chatJaz = new Chat(usuario1);

console.log("=== 1. Getters de Usuario ===");
console.log(`Usuario 1: ${usuario1.nombre} (ID: ${usuario1.id})`);
console.log(`Usuario 2: ${usuario2.nombre} (ID: ${usuario2.id})`);

// 3. Instanciar todos los mensajes que usaremos
const mensaje1 = new Mensaje(usuario2, usuario1, "Hola cómo estás??");
const mensaje2 = new Mensaje(usuario1, usuario2, "Todo bien. vos??");
const mensaje3 = new Mensaje(usuario2, usuario1, "Todo bien también gracias a Dios");
const mensajeAExtraño = new Mensaje(usuario2, usuario3, "Hola Carlos, ¿cómo va?");

// 4.1 Agregar a usuario1 (Jazmín) como contacto de Fer
chatFer.agregarContacto(usuario1);
// 4.1 Agregar a usuario1 (Fer) como contacto de Jaz
chatJaz.agregarContacto(usuario2)

console.log("\n=== 2. Lista de Contactos ===");
console.table(
  chatFer.obtenerContactos().map((c) => ({
    id: c.id,
    nombre: c.nombre
  }))
);
console.table(
  chatJaz.obtenerContactos().map((c) => ({
    id: c.id,
    nombre: c.nombre
  }))
);

// 5. Enviar mensajes a un contacto válido
chatFer.mandarMensaje(mensaje1);
chatJaz.mandarMensaje(mensaje2);
chatFer.mandarMensaje(mensaje3);

console.log("\n=== 3. Historial de Mensajes Enviados ===");
console.table(
  chatFer.obtenerMensaje().map((m) => ({
    remitente: m.remitente.nombre,
    destinatario: m.destinatario.nombre,
    texto: m.texto,
    fecha: m.fecha.toLocaleString()
  }))
);
console.table(
  chatJaz.obtenerMensaje().map((m) => ({
    remitente: m.remitente.nombre,
    destinatario: m.destinatario.nombre,
    texto: m.texto,
    fecha: m.fecha.toLocaleString()
  }))
);

// 6. Probar capturar el ERROR al enviar a alguien que NO es contacto
console.log("\n=== 4. Prueba de Error (Usuario fuera de contactos) ===");
try {
  chatFer.mandarMensaje(mensajeAExtraño);
} catch (error) {
  console.log(`❌ Error capturado correctamente: "${error.message}"`);
}

// 7. Probar intento de mensaje duplicado (no debería agregarlo dos veces)
console.log("\n=== 5. Intentar mandar mensaje1 duplicado ===");
chatFer.mandarMensaje(mensaje1);
console.log(`Total de mensajes guardados: ${chatFer.obtenerMensaje().length}`); // Sigue siendo 2

// 8. Probar Filtro por Contacto (Jazmín)
console.log("\n=== 6. Filtrar por Contacto (Jazmín) ===");
console.table(
  chatFer.filtrarPorContacto(usuario1.id).map((m) => ({
    destinatario: m.destinatario.nombre,
    texto: m.texto
  }))
);

// 9. Probar Filtro por Fecha (Hoy)
console.log("\n=== 7. Filtrar por Fecha (Hoy) ===");
console.table(
  chatFer.filtrarPorFecha(new Date()).map((m) => ({
    remitente: m.remitente.nombre,
    texto: m.texto,
    fecha: m.fecha.toLocaleDateString()
  }))
);