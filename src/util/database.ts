import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const openDatabase = async () => open({
  filename: "./temp/database.sqlite",
  driver: sqlite3.Database
})
