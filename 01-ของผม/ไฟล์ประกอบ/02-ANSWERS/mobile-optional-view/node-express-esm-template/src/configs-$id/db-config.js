// {student-id} - {student-name}
import mysql from 'mysql2/promise';
const db = mysql.createPool({
    host: process.env.DB_HOST || 'db-host', // แก้ db-host ให้ตรงเครื่อง
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'db-username',
    password: process.env.DB_PASSWORD ?? 'db-password', // รหัสของเครื่อง ไม่ใช่รหัสมหาวิทยาลัย
    database: process.env.DB_NAME || 'mobile_distributor',
    decimalNumbers: true,
    dateStrings: true,
});
export default db;
