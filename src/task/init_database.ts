import { openDatabase } from "@/util/database";

const task = async() => {
  const database = await openDatabase()

  await database.run(`CREATE TABLE users (id, name);`);
  await database.run(`CREATE TABLE roles (id, name);`);
  await database.run(`CREATE TABLE permissions (id, key, name);`);
}

task()