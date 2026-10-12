/*
Carrito con Producto
Producto
Propiedades
id (string)
nombre (string)
precio (número)
cantidad (número)
tieneImpuesto (booleano)
Constructor
toma como argumentos nombre, precio, cantidad y tieneImpuesto y los asigna a sus respectivas propiedades
genera un id automático y lo asigna a su propiedad
Métodos
getters para obteners los valores de todas las propiedades
setter para modificar el valor de cantidad
Observaciones
la cantidad nunca puede ser 0
el precio no puede ser menor a 0
Carrito
Propiedades
productos (array de Producto), inicializa vacío
Métodos
agregarProducto(producto) agrega producto a `productos
actualizarCantidadProducto(id, cantidad) actualiza la cantidad del producto en productos con id
eliminarProducto(id) elimina de productos el producto con id
calcularTotal() devuelve el total del carrito (con impuestos incluidos)
calcularImpuestoTotal() devuelve el total de la suma de los impuestos de cada producto que tieneImpuesto
obtenerCantidadTotal() devuelve la cantidad total de ítems en el producto
toString() devuelve un string con
la lista de productos, detallando nombre, precio por unidad y cantidad
subtotal de todos los productos sin sumar impuesto
subtotal de todos los impuestos sumados
total final (suma de los subtotales)
Observaciones
el impuesto es del 10% sobre el precio del producto
*/

class Producto {
   // Propiedades
   #id;
   #nombre;
   #precio; 
   #cantidad;
   #tieneImpuesto;
   
   constructor(nombre, precio, cantidad, tieneImpuesto) {
     this.#id = crypto.randomUUID();
     this.#nombre = nombre;
     if (precio < 0) throw new Error("El precio no puede ser menor a 0.");
        this.#precio = precio;
     if (cantidad <= 0) throw new Error("La cantidad debe ser mayor a 0");
        this.#cantidad = cantidad;
     this.#tieneImpuesto = tieneImpuesto;
   }

  // Getters
  get nombre() { return this.#nombre; }
  get id() { return this.#id; }
  get precio() { return this.#precio; }
  get cantidad() { return this.#cantidad; }
  get tieneImpuesto() { return this.#tieneImpuesto; }

  // Setters
  set cantidad(nuevaCantidad) { if (nuevaCantidad <= 0) 
    throw new Error("La cantidad debe ser mayor a 0");
        this.#cantidad = nuevaCantidad;
  }
}

class Carrito {
    #productos = [];

    // Métodos
    agregarProducto(producto) {
        this.#productos.push(producto);
    }

    actualizarCantidadProducto(id, cantidad) {
        const productoEncontrado = this.#productos.find(prod => prod.id === id);
        if (productoEncontrado) productoEncontrado.cantidad = cantidad;
    }

    eliminarProducto(id) {
        this.#productos = this.#productos.filter(prod => prod.id !== id);
        
    }

    calcularTotal() {
       return this.#productos.reduce((acc, prod) => {
        let impuesto = prod.tieneImpuesto; 
        if (impuesto) {
            return acc + (prod.cantidad * prod.precio * 1.10);
        } else {
            return acc + (prod.cantidad * prod.precio);
        }
       }, 0);
    }

    calcularImpuestoTotal() {
        return this.#productos.reduce((acc, prod) => {
            if (prod.tieneImpuesto) {
                return acc + (prod.cantidad * prod.precio * 0.10);
            }
            return acc;
        }, 0);
    }

    obtenerCantidadTotal() {
        return this.#productos.reduce((acc, prod) => {
            return acc + prod.cantidad;
        }, 0);
    }

    toString() {
        const detalleProductos = this.#productos.map(
            prod => `- ${prod.nombre}:$${prod.precio} x${prod.cantidad}`
            ).join("\n");
        const impuestos = this.calcularImpuestoTotal();
        const total = this.calcularTotal();
        const subtotalSimp = total - impuestos;
        return `Carrito\n---------------\n${detalleProductos}\n
        Subtotal (sin impuestos): $${subtotalSimp}
        Total Impuestos (10%): $${impuestos}
        Total Final: $${total}`;
    }
}

// --- Pruebas de ejecución ---
const carrito = new Carrito();

const p1 = new Producto("Teclado Mecánico", 10000, 1, true); // $10000 + $1000 imp = $11000
const p2 = new Producto("Mousepad", 2000, 2, false);        // $2000 * 2 = $4000
const p3 = new Producto("Cable HDMI", 1500, 3, true);        // ($1500 * 3) + 10% = $4500 + $450 = $4950

carrito.agregarProducto(p1);
carrito.agregarProducto(p2);
carrito.agregarProducto(p3);

console.log("=== Detalle inicial del carrito ===");
console.log(carrito.toString());

console.log("\nCantidad total de ítems:", carrito.obtenerCantidadTotal()); // 1 + 2 + 3 = 6

// Actualizar cantidad del p2 (Mousepad a 4 unidades)
carrito.actualizarCantidadProducto(p2.id, 4);
console.log("\nCantidad total tras actualizar mousepads:", carrito.obtenerCantidadTotal()); // 8

// Eliminar p3 (Cable HDMI)
carrito.eliminarProducto(p3.id);

console.log("\n=== Detalle final del carrito tras cambios ===");
console.log(carrito.toString());