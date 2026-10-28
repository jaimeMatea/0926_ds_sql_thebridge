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
  // section(1, "Muestra (3 primeros documentos)");
  // console.log(await restaurants.find().limit(3).toArray());

  // // --- 2 ---
  // section(2, "Proyección: restaurant_id, name, borough, cuisine sin _id");
  // const proj2 = {
  //   restaurant_id: 1,
  //   name: 1,
  //   borough: 1,
  //   cuisine: 1,
  //   _id: 0,
  // };
  // console.log(await restaurants.find({}, { projection: proj2 }).limit(5).toArray());

  // // --- 3 ---
  // section(3, "Primeros 5 restaurantes del distrito Bronx");
  // console.log(await restaurants.find({ borough: "Bronx" }).limit(5).toArray());

  // // --- 4 ---
  // section(4, "Alguna inspección con score entre 80 y 100 (exclusivo) — $elemMatch");
  // const filtro4 = { grades: { $elemMatch: { score: { $gt: 80, $lt: 100 } } } };
  // console.log(await restaurants.find(filtro4).limit(3).toArray());

  // // --- 5 ---
  // section(5, "Algún valor en address.coord < -95.754168");
  // console.log(await restaurants.find({ "address.coord": { $lt: -95.754168 } }).limit(3).toArray());

  // // --- 6 ---
  // section(6, "Sin $and: cocina ≠ americana, score > 70, coord < -65.754168");
  // const filtro6 = {
  //   cuisine: { $ne: "American " },
  //   "grades.score": { $gt: 70 },
  //   "address.coord": { $lt: -65.754168 },
  // };
  // console.log(await restaurants.find(filtro6).limit(3).toArray());

  // console.log("\n--- Alternativa con regex (cocina sin 'American') ---");
  // const filtro6regex = {
  //   cuisine: { $not: /.*American.*/ },
  //   "grades.score": { $gt: 70 },
  //   "address.coord": { $lt: -65.754168 },
  // };
  // console.log(await restaurants.find(filtro6regex).limit(3).toArray());

  // // --- 7 ---
  // section(7, "No americana, grade A, no Brooklyn; sort cuisine descendente");
  // const filtro7 = {
  //   cuisine: { $ne: "American " },
  //   "grades.grade": "A",
  //   borough: { $ne: "Brooklyn" },
  // };
  // console.log(await restaurants.find(filtro7).sort({ cuisine: -1 }).limit(5).toArray());

  // // --- 8 ---
  // section(8, "Bronx y (americana o china) — $or");
  // const filtro8 = {
  //   borough: "Bronx",
  //   $or: [{ cuisine: "American " }, { cuisine: "Chinese" }],
  // };
  // console.log(await restaurants.find(filtro8).limit(5).toArray());

  // // --- 9 ---
  // section(9, "Distrito $in + proyección");
  // const filtro9 = { borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } };
  // const proj9 = { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 };
  // console.log(await restaurants.find(filtro9, { projection: proj9 }).limit(5).toArray());

  // // --- 10 ---
  // section(10, "Ningún score > 10 — $not $gt");
  // const filtro10 = { "grades.score": { $not: { $gt: 10 } } };
  // const proj10 = { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 };
  // console.log(await restaurants.find(filtro10, { projection: proj10 }).limit(5).toArray());

  // // --- 11 ---
  // section(11, "Fecha ISO, grade A, score 11");
  // const dt = new Date("2014-08-11T00:00:00.000Z");
  // const filtro11 = { "grades.date": dt, "grades.grade": "A", "grades.score": 11 };
  // const proj11 = { restaurant_id: 1, name: 1, grades: 1, _id: 0 };
  // console.log(await restaurants.find(filtro11, { projection: proj11 }).limit(3).toArray());

  // // --- 12 ---
  // section(12, "address.coord.1 entre 42 y 52");
  // const filtro12 = { "address.coord.1": { $gt: 42, $lte: 52 } };
  // const proj12 = { restaurant_id: 1, name: 1, address: 1, _id: 0 };
  // console.log(await restaurants.find(filtro12, { projection: proj12 }).limit(3).toArray());

  // // --- 13 ---
  // section(13, "insertOne — restaurante de ejemplo");
  // const doc13 = {
  //   address: {
  //     building: "37",
  //     coord: [40.421459516270865, -3.696834221545593],
  //     street: "San Marcos",
  //     zipcode: "28004",
  //   },
  //   borough: "Chueca",
  //   cuisine: "Mediterranean",
  //   name: "Diurno",
  //   restaurant_id: "873683997",
  // };
  // const ins = await restaurants.insertOne(doc13);
  // console.log("insertedId:", ins.insertedId);


  // const r14 = await restaurants.updateMany(
  //   { cuisine: "Ice Cream, Gelato, Yogurt, Ices" },
  //   { $set: { cuisine: "sweets" } }
  // );
  // console.log("14. Documentos modificados:", r14.modifiedCount);

  // const r15 = await restaurants.updateOne({ name: "Wild Asia" }, { $set: { name: "Wild Wild West" } });
  // console.log("15. Coincidencias / modificados:", r15.matchedCount, r15.modifiedCount);

  // const r16 = await restaurants.deleteMany({ "address.coord.0": { $lt: -95.754168 } });
  // console.log("16. Borrados:", r16.deletedCount);

  // const r17 = await restaurants.deleteMany({ name: { $regex: "^C" } });
  // console.log("17. Borrados:", r17.deletedCount);

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
