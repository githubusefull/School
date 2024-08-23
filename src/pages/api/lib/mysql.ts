import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'myschool_benbar',
  password: process.env.MYSQL_PASSWORD || '1932ANAred@',
  database: process.env.MYSQL_DATABASE || 'myschool_testapp',
});

export async function query(sql: string, params?: any[]) {
  const [results] = await pool.execute(sql, params);
  return results;
}
