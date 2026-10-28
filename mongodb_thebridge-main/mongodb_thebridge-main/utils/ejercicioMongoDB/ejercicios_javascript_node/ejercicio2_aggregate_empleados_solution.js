/**
 * Ejercicio 2 — Agregaciones con empleados
 *
 * Requisitos: npm install (en esta carpeta)
 * Ejecución:  npm run ej2
 *   o:        node ejercicio2_aggregate_empleados.js
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

const EMPLOYEES = [
  {
    _id: 1,
    firstName: "Muchelle",
    lastName: "Wallys",
    gender: "female",
    email: "muchelle@thebridgeschool.es",
    salary: 5000,
    department: { name: "HR" },
  },
  {
    _id: 2,
    firstName: "Marta",
    lastName: "Perez",
    gender: "female",
    email: "marta@demo.com",
    salary: 8000,
    department: { name: "Finance" },
  },
  {
    _id: 3,
    firstName: "Birja",
    lastName: "Rybera",
    gender: "male",
    email: "birja@thebridgeschool.es",
    salary: 7500,
    department: { name: "Marketing" },
  },
  {
    _id: 4,
    firstName: "Rosa",
    lastName: "Sanchez",
    gender: "female",
    email: "rosa@demo.com",
    salary: 5000,
    department: { name: "HR" },
  },
  {
    _id: 5,
    firstName: "Alvaru",
    lastName: "Aryas",
    gender: "male",
    email: "alvaru@thebridgeschool.es",
    salary: 4500,
    department: { name: "Finance" },
  },
  {
    _id: 6,
    firstName: "Anita",
    lastName: "Rodrigues",
    gender: "female",
    email: "anita@demo.com",
    salary: 7000,
    department: { name: "Marketing" },
  },
  {
    _id: 7,
    firstName: "Alejandru",
    lastName: "Regex",
    gender: "male",
    email: "alejandru@thebridgeschool.es",
    salary: 7000,
    department: { name: "Marketing" },
  },
];

function section(n, title) {
  console.log("\n" + "=".repeat(60));
  console.log(`${n}. ${title}`);
  console.log("=".repeat(60));
}

async function main() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const employees = db.collection("employees");

  await employees.deleteMany({});
  await employees.insertMany(EMPLOYEES);
  console.log(`Base "${DB_NAME}": insertados ${await employees.countDocuments({})} empleados.`);

  // section(1, "Todas las empleadas — $match");
  // const p1 = [{ $match: { gender: "female" } }];
  // console.log(JSON.stringify(await employees.aggregate(p1).toArray(), null, 2));

  // section(2, "Empleados por departamento — $group");
  // const p2 = [{ $group: { _id: "$department.name", totalEmployees: { $sum: 1 } } }];
  // console.log(JSON.stringify(await employees.aggregate(p2).toArray(), null, 2));

  // section(3, "Solo empleadas agrupadas por departamento");
  // const p3 = [
  //   { $match: { gender: "female" } },
  //   { $group: { _id: "$department.name", totalEmployees: { $sum: 1 } } },
  // ];
  // console.log(JSON.stringify(await employees.aggregate(p3).toArray(), null, 2));

  // section(4, "Empleadas ordenadas por salario ascendente");
  // const p4 = [{ $match: { gender: "female" } }, { $sort: { salary: 1 } }];
  // console.log(JSON.stringify(await employees.aggregate(p4).toArray(), null, 2));

  // section(5, "Por departamento: conteo y suma salarios (mujeres), orden por totalSalaries");
  // const p5 = [
  //   { $match: { gender: "female" } },
  //   {
  //     $group: {
  //       _id: { deptName: "$department.name" },
  //       totalEmployees: { $sum: 1 },
  //       totalSalaries: { $sum: "$salary" },
  //     },
  //   },
  //   { $sort: { totalSalaries: 1 } },
  // ];
  // console.log(JSON.stringify(await employees.aggregate(p5).toArray(), null, 2));

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
