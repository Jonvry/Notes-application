import mysql, { ConnectionOptions } from "mysql2/promise";

export const db = (async () => {
  const access: ConnectionOptions = {
    port: Number(process.env.MYSQL_PORT), // Parse the port as a number
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 100,
  };

  const Connection = await mysql.createConnection(access);
  console.log("connected as id " + Connection.threadId);
  return Connection;
})();
