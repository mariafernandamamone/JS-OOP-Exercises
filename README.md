# Programación Orientada a Objetos (POO) en JavaScript

Este repositorio reúne una serie de ejercicios y mini proyectos prácticos orientados al dominio de la **Programación Orientada a Objetos (POO)** en JavaScript (ES6+). 

El objetivo principal es aplicar buenas prácticas de software: encapsulamiento mediante campos privados, inmutabilidad externa mediante clonación defensiva, validación de datos y manipulación funcional de colecciones.

---

## 🛠️ Principios de Diseño y Buenas Prácticas
- **Propiedades Privadas (`#`):** Todas las clases protegen su estado interno impidiendo el acceso o modificación directa sin pasar por métodos validadores.
- **Encapsulamiento y Copias Defensivas:** Al devolver arrays u objetos desde un getter o método, se retornan copias (usando el operador spread `[...]` o `.map()`) para evitar mutaciones externas indeseadas.
- **Programación Funcional en Arrays:** Uso intensivo de métodos iterativos ES6+ (`.map()`, `.filter()`, `.reduce()`, `.some()`, `.find()`, `.findIndex()`) para operar sobre colecciones.
- **Manejo de Errores y Validaciones:** Uso de `Number.isFinite()`, manejo de casos de borde (ej. división por cero, límites de volumen/canales) y lanzamientos de excepciones explicitos.

---

## 📚 Listado de Ejercicios y Proyectos

### 1. Calculadora
- Operaciones matemáticas fundamentales (suma, resta, multiplicación, división) con acumulador interno.
- Validaciones numéricas estrictas con `Number.isFinite()` y control de división por cero.

### 2. Auto
- Gestión de estado del vehículo (encendido, velocidad, marca, modelo, patente).
- Reglas de negocio: aceleración/desaceleración condicionada al estado encendido y restricciones para el apagado a velocidad cero.

### 3. Televisor
- Control de estado (encendido, canal, volumen, canales máximos).
- Comportamiento cíclico de canales (efecto "carrusel" entre el canal mínimo 0 y el máximo) y límites de volumen (0 a 100).

### 4. Anotador
- CRUD de notas con gestión por índice.
- Métodos para agregar, actualizar, obtener, eliminar y listar notas con formato visual tabulado.

### 5. Celular
- Agenda de contactos y registro de historial de llamadas.
- Validaciones para evitar contactos duplicados por nombre o número de teléfono.

### 6. BilleteraVirtual
- Registro de transacciones clasificadas en ganancias y gastos.
- Cálculo de balances por mes o por categoría utilizando filtros y acumuladores.

### 7. Carrito con Producto
- Generación automática de IDs únicos por producto.
- Cálculo de subtotales, recargo de impuestos (10%) y formateo de resumen de compra en texto.

### 8. Agenda con Tareas
- Control de ciclo de vida de tareas (pendientes vs. finalizadas).
- Filtrados dinámicos por estado, categoría o fecha de vencimiento.

### 9. Librería con Libros y Autor
- Asociación entre modelos `Autor`, `Libro` y `Libreria`.
- Control de stock, búsquedas avanzadas y simulación de proceso de compra con actualización de ganancias.

### 10. Chat con Usuarios y Mensajes
- Envío de mensajes entre usuarios restringido a listas de contactos.
- Filtrados de historial de conversaciones por contacto o por fecha.

### 11. Twitter con Tweets y Usuarios
- Interacciones de seguimiento, likes y retweets con toggle dinámico.
- Algoritmo para la generación de `timeline` consolidado, ordenado cronológicamente y libre de duplicados mediante referencias cruzadas.

### 12. Netflix (Series, Episodios y Usuarios)
- Modelado de catálogo interactivo (`Episodio`, `Serie` y `Usuario`).
- Acumulación de tiempo de reproducción con `.reduce()`, filtrado de episodios por temporada y sistema de favoritos con lógica de toggle (`.splice()`).

---

## 💻 Ejecución de Pruebas
Todos los ejercicios cuentan con scripts de prueba integrados ejecutables mediante Node.js:

```bash
# Ejemplo de ejecución
node netflix.js
```