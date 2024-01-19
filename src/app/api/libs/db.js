import mysql from 'mysql';

const createConnection = () => {
  return mysql.createConnection({
    host: process.env.NEXT_PUBLIC_DB_HOST,
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASS,
    database: process.env.NEXT_PUBLIC_DB_NAME,
  });
};

const query = (sql, values) => {
  const connection = createConnection();
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      connection.end(); // Close the connection after the query
      if (error) {
        console.log("Error query to MySQL:: ", error)
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export default query;