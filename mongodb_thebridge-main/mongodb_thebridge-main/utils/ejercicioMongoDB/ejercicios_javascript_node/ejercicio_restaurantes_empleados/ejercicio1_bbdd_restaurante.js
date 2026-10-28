/**
 * Ejercicio 1 — Base de datos restaurantes
 *
 * Equivale al shell: db.restaurants.find(...) y operaciones de escritura.
 *
 * Requisitos: npm install (en esta carpeta)
 * Ejecución:  npm run ej1
 *   o:        node ejercicio1_bbdd_restaurante.js
 *
 * Variables de entorno (opcional):
 *   MONGODB_URI  — por defecto mongodb://127.0.0.1:27017
 *   MONGODB_DB   — por defecto test
 */

const { MongoClient } = require("mongodb");

// BBDD en Cloud - MongoDB Atlas
// const MONGO_URI = "mongodb+srv://tu_usuario:tu_password@cluster0.faedgp4agx.mongodb.net/?appName=Cluster0"

// BBDD Local MongoDB
const MONGO_URI = "mongodb://localhost:27017/";

const DB_NAME = "test";

function section(n, title) {
  console.log("\n" + "=".repeat(60));
  console.log(`${n}. ${title}`);
  console.log("=".repeat(60));
}

async function main() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const restaurants = db.collection("restaurants");

  const count = await restaurants.countDocuments({});
  console.log(`Conectado a "${DB_NAME}". Documentos en restaurants: ${count}`);

  // // --- 1 ---
  section(1, "Muestra (3 primeros documentos)");
  console.log(await restaurants.find().limit(3).toArray());

  // // --- 2 ---
  section(2, "Proyección: restaurant_id, name, borough, cuisine sin _id");
  const proj2 = {
    restaurant_id: 1,
    name: 1,
    borough: 1,
    cuisine: 1,
    _id: 0,
  };
  console.log(await restaurants.find({}, { projection: proj2 }).limit(5).toArray());

  // // --- 3 ---
  section(3, "Primeros 5 restaurantes del distrito Bronx");
  console.log(await restaurants.find({ borough: "Bronx" }).limit(5).toArray());

  // // --- 4 ---
  // section(4, "Alguna inspección con score entre 80 y 100 (exclusivo) — $elemMatch");

  // // --- 5 ---
  // section(5, "Algún valor en address.coord < -95.754168");

  // // --- 6 ---
  // section(6, "Sin $and: cocina ≠ americana, score > 70, coord < -65.754168");

  // // --- 7 ---
  // section(7, "No americana, grade A, no Brooklyn; sort cuisine descendente");

  // // --- 8 ---
  // section(8, "Bronx y (americana o china) — $or");

  // // --- 9 ---
  // section(9, "Distrito $in + proyección");

  // // --- 10 ---
  // section(10, "Ningún score > 10 — $not $gt");

  // // --- 11 ---
  // section(11, "Fecha ISO, grade A, score 11");

  // // --- 12 ---
  // section(12, "address.coord.1 entre 42 y 52");

  // // --- 13 ---
  // section(13, "insertOne — restaurante de ejemplo");

// // --- 14 ---

// // --- 15 ---
// // --- 16 ---
// // --- 17 ---


  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
