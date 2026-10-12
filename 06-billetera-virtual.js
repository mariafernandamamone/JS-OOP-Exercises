/*
BilleteraVirtual
Propiedades
monto
operaciones (array de objetos), inicializa vacío
Constructor
toma como argumento montoInicial y lo asigna a monto
Métodos
agregarGasto(gasto) agrega gasto a operaciones
agregarGanancia(ganancia) agrega ganancia a operaciones
obtenerGastosPorMes(mes) devuelve un array con todos los gastos hechos en mes
obtenerGanaciasPorMes(mes) devuelve un array con todas los ganancias obtenidas en mes
obtenerGastosPorCategoria(categoria) devuelve un array con todos los gastos de cierta categoria
obtenerGanaciasPorCategoria(categoria) devuelve un array con todas las ganancias de cierta categoria
calcularTotalPorMes(mes) devuelve el total resultante de restar todos los gastos hechos y sumar todas las ganancias obtenidas en un cierto mes
calcularTotalPorCategoria(categoria) devuelve el total resultante de restar todos los gastos hechos y sumar todas las ganancias obtenidas en cierta `categoria
**obtenerMonto()** devuelve monto
Observaciones
los objetos gasto y ganancia contiene las propiedades:
descripcion (string)
cantidad (número)
fecha (Date)
categoria (string)
cuando se agrega gasto o ganancia al array operaciones, hay que agregarle a dicha objeto la propiedad tipo con el valor "GASTO" o "GANANCIA" según corresponda, para poder identificarlos en las siguientes operaciones
cuando se devuelve un array con gastos o ganancias, hay que borrar de los objetos que se devuelven la propiedad tipo
*/

class BilleteraVirtual {
  // Propiedades
  #monto;
  #operaciones = [];
  

  constructor(montoInicial) {
    this.#monto = montoInicial;
  }

  // Getters
  get monto() { return this.#monto; }
  get operaciones() { return [...this.#operaciones]; }

  // Métodos
  agregarGasto(gasto) {
    if (gasto.cantidad > this.#monto) throw new Error("Saldo insuficiente");
    this.#monto -= gasto.cantidad;
    const operacion = {...gasto, tipo: "GASTO"};
    this.#operaciones.push(operacion);
  }

  agregarGanancia(ganancia) {
    this.#monto += ganancia.cantidad;
    const operacion = {...ganancia, tipo: "GANANCIA"};
    this.#operaciones.push(operacion);
  }

  obtenerGastosPorMes(mes) {
    const gastosFiltrados = this.#operaciones.filter(op => 
        op.tipo === "GASTO" && op.fecha.getMonth() === mes - 1
    );
    return gastosFiltrados.map(({ tipo, ...resto }) => resto);
  }

  obtenerGananciasPorMes(mes) {
    const gananciasFiltradas = this.#operaciones.filter(op => 
        op.tipo === "GANANCIA" && op.fecha.getMonth() === mes - 1
    );
    return gananciasFiltradas.map(({ tipo, ...resto }) => resto);
  }

  obtenerGastosPorCategoria(categoria) {
    const gastosFiltrados = this.#operaciones.filter(op => 
        op.tipo === "GASTO" && op.categoria === categoria
    );
    return gastosFiltrados.map(({ tipo, ...resto }) => resto);
  }

  obtenerGananciasPorCategoria(categoria) {
    const gananciasFiltradas = this.#operaciones.filter(op => 
        op.tipo === "GANANCIA" && op.categoria === categoria
    );
    return gananciasFiltradas.map(({ tipo, ...resto }) => resto);
  }

  calcularTotalPorMes(mes) {
    return this.#operaciones.reduce((acc, op) => {
        if (op.fecha.getMonth() === mes - 1) {
            if (op.tipo === "GASTO") {
                return acc - op.cantidad;
            }
            if (op.tipo === "GANANCIA") {
                return acc + op.cantidad;
            }
        }
        return acc;
    }, 0);
  }

  calcularTotalPorCategoria(categoria) {
    return this.#operaciones.reduce((acc, op) => {
        if (op.categoria === categoria) {
            if (op.tipo === "GASTO") {
                return acc - op.cantidad;
            }
            if (op.tipo === "GANANCIA") {
                return acc + op.cantidad;
            }
        }
        return acc;
    }, 0);
  }

  obtenerMonto() {
    return this.#monto;
  }
}

// --- Pruebas de ejecución ---
const miBilletera = new BilleteraVirtual(100000);

console.log("Monto inicial:", miBilletera.obtenerMonto()); // 100000

// 1. Agregar ganancias y gastos
miBilletera.agregarGanancia({
  descripcion: "Sueldo",
  cantidad: 150000,
  fecha: new Date("2026, 9, 5"),
  categoria: "Trabajo"
});

miBilletera.agregarGasto({
  descripcion: "Supermercado",
  cantidad: 30000,
  fecha: new Date("2026, 9, 10"),
  categoria: "Comida"
});

miBilletera.agregarGasto({
  descripcion: "Restaurante",
  cantidad: 15000,
  fecha: new Date("2026, 9, 12"),
  categoria: "Comida"
});

console.log("\nMonto actual tras movimientos:", miBilletera.obtenerMonto()); // 205000

// 2. Probar error por saldo insuficiente
try {
  miBilletera.agregarGasto({
    descripcion: "Viaje",
    cantidad: 500000,
    fecha: new Date(),
    categoria: "Ocio"
  });
} catch (error) {
  console.log("\nError atajado correctamente:", error.message);
}

// 3. Consultar gastos por categoría (debe venir SIN la propiedad tipo)
console.log("\nGastos en categoría 'Comida':", miBilletera.obtenerGastosPorCategoria("Comida"));

// 4. Probar cálculos por mes (Mes 10 = Octubre) y por categoría
console.log("\nBalance de Septiembre (Mes 9):", miBilletera.calcularTotalPorMes(9)); // +150000 - 30000 - 15000 = 105000
console.log("Balance categoría 'Comida':", miBilletera.calcularTotalPorCategoria("Comida")); // -45000
