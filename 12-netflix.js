/*
Netflix (Series, Episodios y Usuarios)

Episodio
Propiedades: titulo (string), duracion (number, en minutos), numeroEpisodio (number), temporada (number).
Constructor: Recibe titulo, duracion, numeroEpisodio y temporada.
Getters: Para leer las propiedades.

Serie
Propiedades: titulo (string), genero (string), episodios (array de Episodio, inicializa vacio).
Constructor: Recibe titulo y genero.
Getters: Para titulo, genero y episodios.
Métodos:
agregarEpisodio(episodio): Agrega el episodio a la lista si no se encuentra ya agregado (no deben repetirse por titulo y temporada).
obtenerDuracionTotal(): Devuelve la suma de las duraciones de todos los episodios de la serie.
obtenerEpisodiosPorTemporada(numTemporada): Devuelve un array con los episodios pertenecientes a esa temporada.

Usuario
Propiedades: nombre (string), email (string), historialVistos (array de Episodio, inicializa vacio), favoritos (array de Serie, inicializa vacio).
Constructor: Recibe nombre y email.
Getters: Para nombre, email, historialVistos y favoritos.
Métodos:
verEpisodio(episodio): Agrega el episodio a historialVistos si no se encuentra ya agregado.
agregarAFavoritos(serie): Agrega o remueve la serie de favoritos (logica de toggle).
obtenerTiempoTotalVisto(): Devuelve los minutos totales que el usuario paso viendo episodios de su historial.
*/

class Episodio {
    // Propiedades
    #titulo;
    #duracion;
    #numeroEpisodio;
    #temporada;

    constructor(titulo, duracion, numeroEpisodio, temporada) {
        this.#titulo = titulo;
        this.#duracion = duracion;
        this.#numeroEpisodio = numeroEpisodio;
        this.#temporada = temporada;
    }

    // Getters
    get titulo() { return this.#titulo; }
    get duracion() { return this.#duracion; }
    get numeroEpisodio() { return this.#numeroEpisodio; }
    get temporada() { return this.#temporada; }
}

class Serie {
    // Propiedades
    #titulo;
    #genero;
    #episodios = [];

    constructor(titulo, genero) {
        this.#titulo = titulo;
        this.#genero = genero;
    }

    // Getters
    get titulo() { return this.#titulo; }
    get genero() { return this.#genero; }
    get episodios() { return [...this.#episodios]; }

    // Métodos
    agregarEpisodio(episodio) {
        const yaAgregado = this.#episodios.some(ep => ep.titulo === episodio.titulo && ep.temporada === episodio.temporada);
        if (!yaAgregado) {
        this.#episodios.push(episodio);
        } else {
            console.log(`El episodio "${episodio.titulo}" de la Temporada ${episodio.temporada} ya fue agregado.`);
        }
    } 
    obtenerDuracionTotal() {
        return this.#episodios.reduce((acc, ep) => {
          return acc + ep.duracion;  
        }, 0);
    }
    obtenerEpisodiosPorTemporada(numTemporada) {
        return this.#episodios.filter(ep => ep.temporada === numTemporada);
    }
}

class Usuario {
    // Propiedades
    #nombre;
    #email;
    #historialVistos = [];
    #favoritos = [];

    constructor(nombre, email) {
       this.#nombre = nombre;
       this.#email = email;
    }

    // Getters
    get nombre() { return this.#nombre; }
    get email() { return this.#email; }
    get historialVistos() { return [...this.#historialVistos]; }
    get favoritos() { return [...this.#favoritos]; }

    // Métodos

    verEpisodio(episodio) {
        const episodioEncontrado = this.#historialVistos.find(ep => 
            ep.titulo === episodio.titulo && ep.temporada === episodio.temporada);
        if (!episodioEncontrado)
            this.#historialVistos.push(episodio);
    }

    agregarAFavoritos(serie) {
        const indice = this.#favoritos.findIndex(se => se.titulo === serie.titulo);

        if (indice !== - 1) {
            this.#favoritos.splice(indice, 1);
        } else {
            this.#favoritos.push(serie);
        } 
    }
    obtenerTiempoTotalVisto() {
        return this.#historialVistos.reduce((acc, visto) => {
            return acc + visto.duracion;
        }, 0);
    }
}




// --- Pruebas de ejecución ---

// 1. Instanciar episodios
const ep1 = new Episodio('Te he llamado por tu nombre', 54, 1, 1);
const ep2 = new Episodio('Shabbat', 46, 2, 1);
const ep3 = new Episodio('Sigan a Jesús', 50, 1, 2);
const ep4 = new Episodio('Purificación', 58, 2, 3);

// 2. Probar getters de episodio
// 2.1 Prueba individual de getters
console.log(ep1.titulo);         // 'Te he llamado por tu nombre'
console.log(ep1.duracion);       // 54
console.log(ep1.numeroEpisodio); // 1
console.log(ep1.temporada);      // 1

// 2.2 Prueba rápida con console.table de varios episodios
console.table([ep1, ep2, ep3, ep4].map(ep => ({
    Título: ep.titulo,
    Duración: `${ep.duracion} min`,
    Episodio: ep.numeroEpisodio,
    Temporada: ep.temporada
})));

// 3. Instanciar Serie
const theChosen = new Serie('The Chosen', 'Drama Histórico');

// 4. Probar agregarEpisodio
theChosen.agregarEpisodio(ep1);
theChosen.agregarEpisodio(ep2);
theChosen.agregarEpisodio(ep3);
theChosen.agregarEpisodio(ep4);

// 5. Probar validación de duplicados (no debería agregarse)
theChosen.agregarEpisodio(ep2);
// Caso 1: Mismo título y misma temporada (DUPLICADO RECIENTE -> no debe agregarse)
theChosen.agregarEpisodio(new Episodio('Te he llamado por tu nombre', 54, 1, 1));

// Caso 2: Mismo título pero DISTINTA temporada (VÁLIDO -> debe agregarse)
console.log("Agregando un episodio con mismo título pero diferente temporada:")
const epMismoTituloTemp2 = new Episodio('Te he llamado por tu nombre', 60, 1, 2);
theChosen.agregarEpisodio(epMismoTituloTemp2);
console.log("Te he llamado por tu nombre, temporada: 2")

// Verificar resultado
console.log('Cantidad total tras pruebas (debería ser 5):', theChosen.episodios.length);

// 6. Probar obtenerDuracionTotal
console.log('Duración total de la serie:', theChosen.obtenerDuracionTotal(), 'minutos.');

// 7. Probar obtenerEpisodiosPorTemporada
console.log("=== Episodios de la temporada 1 ===");
console.table(theChosen.obtenerEpisodiosPorTemporada(1).map(ep => ({
    Título: ep.titulo,
    Episodio: ep.numeroEpisodio,
    Temporada: ep.temporada,
    Duración: `${ep.duracion} min`
})));

// 8. Instanciar usuario
const fer = new Usuario('Fer', 'fer@dev.com');

// 9. Probar verEpisodio y evitar duplicados
fer.verEpisodio(ep1); // 54 min
fer.verEpisodio(ep2); // 46 min
fer.verEpisodio(new Episodio('Te he llamado por tu nombre', 54, 1, 1)); // Intento de duplicado (no debería agregarse)

console.log('Episodios vistos (debería ser 2):', fer.historialVistos.length);

// 10. Probar obtenerTiempoTotalVisto (54 + 46 = 100 min)
console.log('Tiempo total visto:', fer.obtenerTiempoTotalVisto(), 'minutos.');

// 4. Probar agregarAFavoritos (Toggle)
fer.agregarAFavoritos(theChosen);
console.log('Favoritos tras agregar:', fer.favoritos.map(s => s.titulo)); // ['The Chosen']

fer.agregarAFavoritos(theChosen); // Toggle: debería quitarla
console.log('Favoritos tras intento de volver a agregar (debería estar vacío):', fer.favoritos.map(s => s.titulo)); // []

// 5. Tabla resumen del historial de vistos
console.table(fer.historialVistos.map(ep => ({
    Título: ep.titulo,
    Temporada: ep.temporada,
    Duración: `${ep.duracion} min`
})));