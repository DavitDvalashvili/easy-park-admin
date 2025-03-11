import mariadb from "mariadb";
import mysql from "mysql2"; // Use mysql2
import session from "express-session";
const MySQLStore = require("express-mysql-session")(session);

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const mariadbPoolConfig: mariadb.PoolConfig = {
  host: DB_HOST,
  port: 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true,
};

const mysqlPoolConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  authPlugins: { mysql_native_password: () => () => Buffer.from("") },
};

// MariaDB pool for queries
const mariadbPool: mariadb.Pool = mariadb.createPool(mariadbPoolConfig);

export const createConnection = async (): Promise<mariadb.PoolConnection> => {
  try {
    const connection = await mariadbPool.getConnection();
    return connection;
  } catch (err) {
    console.log("Error database connection", err);
    throw err;
  }
};

// MySQL pool for session storage
const mysqlPool = mysql.createPool(mysqlPoolConfig);
export const sessionStore = new MySQLStore({}, mysqlPool);
