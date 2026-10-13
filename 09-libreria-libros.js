/*
Librería con Libros con Autor
Autor
Propiedades
nombre (string)
nacionalidad (string)
Constructor
pide como argumentos nombre y nacionalidad y los asigna a sus respectivas propiedades
Métodos
getters para obtener los valores de todas las propiedades
Libro
Propiedades
id (string)
titulo (string)
autor (Autor)
precio (número)
genero (string)
stock (número)
Constructor
genera un id automático y lo asigna a su propiedad
el resto de propiedades las pide como argumentos y las asigna según corresponda
Métodos
tieneStock() devuelve true si stock es mayor a 0, false sino
getters para obtener los valores de todas las propiedades, menos stock
setter para modificar los valores de precio y stock
Observaciones
stock y precio tienen como valor mínimo 0
Libreria
Propiedades
libros (array de `Libro), inicializa vacío
ganancias (número), inicializa en 0
Métodos
agregar(libro) agrega libro a libros
eliminar(id) elimina de libros el libro con id
buscarPorId(id) devuelve la información de un libro con id
buscarPorTitulo(titulo) devuelve la información de un libro con titulo
filtrarPorAutor(autor) devuelve un array de libros escritos por autor
filtrarPorGenero(genero) devuelve un array de libros con genero
comprarLibros(idLibros) toma un array de ids de libros, si tienen stock, reduce el stock de dichos libros en 1 y suma a ganancias el precio de cada libro comprado
obtenerGanancias devuelve ganancias
*/

class Autor {
  // Propiedades
  #nombre;
  #nacionalidad;

  constructor(nombre, nacionalidad) {
    this.#nombre = nombre;
    this.#nacionalidad = nacionalidad;
  }

  // Getters
  get nombre() {
    return this.#nombre;
  }
  get nacionalidad() {
    return this.#nacionalidad;
  }
}

class Libro {
  // Propiedades
  #id;
  #titulo;
  #autor;
  #precio;
  #genero;
  #stock;

  constructor(titulo, autor, precio, genero, stock) {
    this.#id = crypto.randomUUID();
    this.#titulo = titulo;
    this.#autor = autor;
    this.precio = precio;
    this.#genero = genero;
    this.stock = stock;
  }

  // Getters
  get id() {
    return this.#id;
  }
  get titulo() {
    return this.#titulo;
  }
  get autor() {
    return this.#autor;
  }
  get precio() {
    return this.#precio;
  }
  get genero() {
    return this.#genero;
  }

  // Setters
  set precio(nuevoPrecio) {
    if (nuevoPrecio < 0) throw new Error("El precio no puede ser menor a 0.");
    this.#precio = nuevoPrecio;
  }

  set stock(nuevoStock) {
    if (nuevoStock < 0) throw new Error("El stock no puede ser menor a 0.");
    this.#stock = nuevoStock;
  }

  // Métodos
  tieneStock() {
    return this.#stock > 0;
  }
}

class Libreria {
  // Propiedades
  #libros = [];
  #ganancias = 0;

  // Métodos
  agregar(libro) {
    this.#libros.push(libro);
  }

  eliminar(id) {
    this.#libros = this.#libros.filter((libro) => libro.id !== id);
  }

  buscarPorId(id) {
    return this.#libros.find((libro) => libro.id === id);
  }

  buscarPorTitulo(titulo) {
    return this.#libros.find((libro) => libro.titulo === titulo);
  }

  filtrarPorAutor(autor) {
    return this.#libros.filter(
      (libro) => libro.autor.nombre === autor || libro.autor === autor,
    );
  }
  filtrarPorGenero(genero) {
    return this.#libros.filter((libro) => libro.genero === genero);
  }

  comprarLibros(idLibros) {
    idLibros.forEach((id) => {
      const libro = this.buscarPorId(id);
      if (libro && libro.tieneStock()) {
        libro.stock -= 1;
        this.#ganancias += libro.precio;
      }
    });
  }

  obtenerGanancias() {
    return this.#ganancias;
  }
}

// --- Pruebas de ejecución ---
const libreria = new Libreria();

// 1. Instanciar autores y probar Getters de Autor
const autor1 = new Autor("Gabriel García Márquez", "Colombiana");
const autor2 = new Autor("Jorge Luis Borges", "Argentina");

console.log("=== Getters de Autor ===");
console.log(`Autor 1: ${autor1.nombre} (${autor1.nacionalidad})`);

// 2. Instanciar libros
const libro1 = new Libro("Cien años de soledad", autor1, 15000, "Novela", 3);
const libro2 = new Libro("El Aleph", autor2, 12000, "Ficción", 2);
const libro3 = new Libro("Ficciones", autor2, 11000, "Ficción", 1);

// 3. Probar Getters y Setters de Libro
console.log("\n=== Getters y Setters de Libro ===");
console.log(`Precio original de ${libro1.titulo}: $${libro1.precio}`);
libro1.precio = 16000; // Uso de Setter
console.log(`Nuevo precio actualizado con Setter: $${libro1.precio}`);

// 4. Agregar a la librería
libreria.agregar(libro1);
libreria.agregar(libro2);
libreria.agregar(libro3);

console.log("\n=== Catálogo inicial ===");
console.table(
  [libro1, libro2, libro3].map((l) => ({
    id: l.id,
    titulo: l.titulo,
    autor: l.autor.nombre,
    precio: l.precio,
    genero: l.genero,
    tieneStock: l.tieneStock()
  }))
);

// 5. Probar búsquedas y filtros de Librería
const libroEncontradoId = libreria.buscarPorId(libro1.id);

console.log("=== Búsqueda por ID ===");
if (libroEncontradoId) {
  console.log({
    id: libroEncontradoId.id,
    titulo: libroEncontradoId.titulo,
    autor: libroEncontradoId.autor.nombre,
    precio: libroEncontradoId.precio,
    genero: libroEncontradoId.genero,
    tieneStock: libroEncontradoId.tieneStock()
  });
}

const libroEncontrado = libreria.buscarPorTitulo("El Aleph");

console.log("=== Búsqueda por Título ===");
if (libroEncontrado) {
  console.log({
    id: libroEncontrado.id,
    titulo: libroEncontrado.titulo,
    autor: libroEncontrado.autor.nombre,
    precio: libroEncontrado.precio,
    genero: libroEncontrado.genero,
    tieneStock: libroEncontrado.tieneStock()
  });
}

console.log("\n=== Filtro por Autor ('Jorge Luis Borges') ===");
console.table(
  libreria.filtrarPorAutor("Jorge Luis Borges").map((l) => ({
    titulo: l.titulo,
    autor: l.autor.nombre
  }))
);

console.log("\n=== Filtro por Género ('Ficción') ===");
console.table(
  libreria.filtrarPorGenero("Ficción").map((l) => ({
    titulo: l.titulo,
    genero: l.genero
  }))
);

// 6. Probar compras y ganancias
console.log("\n=== Procesar Compras ===");
libreria.comprarLibros([libro1.id, libro3.id]); // Compra Cien años de soledad ($16000) y Ficciones ($11000)
console.log(`Ganancias acumuladas: $${libreria.obtenerGanancias()}`); // $27000

console.log("\n=== Intentar comprar 'Ficciones' sin stock ===");
libreria.comprarLibros([libro3.id]); // No debe sumar porque stock pasó a 0
console.log(`Ganancias tras intento fallido: $${libreria.obtenerGanancias()}`); // Sigue en $27000

// 7. Probar método eliminar
console.log("\n=== Eliminar libro 'El Aleph' ===");
libreria.eliminar(libro2.id);
console.log("Buscar 'El Aleph' tras eliminar:", libreria.buscarPorId(libro2.id)); // undefined