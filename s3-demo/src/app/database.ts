import mariadb from "mariadb";

// MariaDB 연결 풀 설정
const pool = mariadb.createPool({
  // 집에서 하기 위해 잠깐 바꿧습니다.
  host: process.env.NEXT_PUBLIC_DB_HOST,
  port: 3306,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  database: process.env.NEXT_PUBLIC_DB_DATABASE,
  connectionLimit: 5,
  supportBigNumbers: true,
  bigNumberStrings: true,
});

export default pool;
