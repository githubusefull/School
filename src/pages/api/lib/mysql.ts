import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'your-username',
  password: process.env.MYSQL_PASSWORD || 'your-password',
  database: process.env.MYSQL_DATABASE || 'your-database',
});

export async function query(sql: string, params?: any[]) {
  const [results] = await pool.execute(sql, params);
  return results;
}
