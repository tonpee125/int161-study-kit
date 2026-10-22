# เตรียมก่อนเริ่มทำโจทย์ — ให้โปรเจกต์เชื่อมฐานข้อมูลได้ก่อน

ส่วนนี้ทำครั้งเดียวก่อนเริ่มทำ API ไม่ต้องคัดชุดเฉลยมาทับไฟล์ทั้งโปรเจกต์
สิ่งที่ต้องเชื่อม: WebStorm → MySQL เพื่อเปิดดู/รัน SQL, และ Node.js → MySQL ผ่าน db-config.js เพื่อให้โค้ดอ่านข้อมูลได้ ทั้งสองส่วนต้องตั้งค่าให้ตรงเครื่องเดียวกัน
การกด Test Connection ใน WebStorm ผ่าน ยังไม่ยืนยันว่าไฟล์ db-config.js ของแอปถูกต้อง ต้องตรวจทั้งคู่
ลำดับ: เปิดโฟลเดอร์ถูก → ติดตั้ง dependencies → ต่อ MySQL → เตรียมตาราง → ตั้ง config → ตรวจจาก Node → เปิดเซิร์ฟเวอร์


## โค้ดตั้งค่า — เปิดไฟล์แล้ววางได้ตรงนี้

เปิด `src/configs-$id/db-config.js` ของเทมเพลตกลางภาค แทนเนื้อหาไฟล์นี้ด้วยโค้ดด้านล่างเพียงไฟล์เดียว ถ้าค่าปัจจุบันเชื่อมได้อยู่แล้ว ให้เก็บค่าจริงของตนไว้ ไม่แทนด้วยข้อความตัวอย่าง

```js
// ใช้ mysql2/promise เพื่อ await การเชื่อมต่อและคำสั่ง SQL
import mysql from 'mysql2/promise';

// แก้เฉพาะค่าการเชื่อมต่อให้ตรงกับ MySQL ในเครื่องตน
const db = mysql.createPool({
    host: '127.0.0.1', // เปลี่ยนเมื่อ MySQL อยู่เครื่องอื่น; เครื่องเดียวกันใช้ค่านี้
    port: 3306, // ใช้พอร์ตเดียวกับ Data Source ที่ Test Connection ผ่าน
    user: 'root', // เปลี่ยนเป็นชื่อผู้ใช้ MySQL ของตน
    password: 'YOUR_MYSQL_PASSWORD', // เปลี่ยนเฉพาะข้อความในคำพูดเป็นรหัสผ่าน MySQL
    database: 'mobile_distributor', // Week8 ใช้ชื่อนี้ หลังนำเข้า init-database.sql แล้ว
    decimalNumbers: true, // ให้ DECIMAL เช่น price เป็นตัวเลขใน JSON
    dateStrings: true, // ให้ DATE เช่น release_date เป็น YYYY-MM-DD
    connectionLimit: 5, // จำนวน connection ใน pool ไม่ต้องแก้สำหรับตัวอย่างนี้
});

export default db; // ให้ repository import ไปใช้; ไม่สร้าง pool เพิ่มอีกตัว
```

### ต้องเปลี่ยนอะไรบ้าง

1. `YOUR_MYSQL_PASSWORD` → รหัสผ่าน MySQL ของเครื่องตน ไม่ใช่ Secret Key ในสเปก ถ้ารหัสผ่านว่างจริงใช้ `password: ''`
2. `root` → ชื่อผู้ใช้ MySQL ถ้า Data Source ใช้rootอยู่แล้วคงเดิม
3. `3306` และ `127.0.0.1` → เปลี่ยนเฉพาะเมื่อ connection ที่ทดสอบผ่านใช้พอร์ตหรือโฮสต์อื่น
4. `mobile_distributor` → ใช้กับWeek8; งานcountry/actorใช้ `sakila`; งานWeek6ใช้ชื่อฐานในSQLของงานนั้น
5. คงชื่อโฟลเดอร์ `configs-$id` ตามไฟล์จริง ไม่เปลี่ยน `$id` ในชื่อโฟลเดอร์เป็นรหัสนักศึกษา

### วางแล้วทำอะไรต่อ

Ctrl+S แล้วตรวจการเชื่อมต่อจาก Node ก่อนทำ CRUD ถ้ายังไม่มีตาราง ให้ทำขั้นนำเข้าSQLก่อน อย่ารันSQLล้างฐานซ้ำเพียงเพื่อแก้config

- [วาง config แล้ว → ตรวจการเชื่อมจาก Node พร้อมโค้ด](prep-check-midterm.md)
- [ยังไม่ได้นำเข้าSQL → วิธีนำเข้าและคำสั่งตรวจ](prep-sql.md)

## ขั้นตอนเตรียมอื่น


- [WebStorm ขอ License — ดูวิธีตั้งค่าตามสไลด์ครู](prep-license.md)
- [1. เริ่มจากเปิดโปรเจกต์ให้ถูกโฟลเดอร์](prep-project.md)
- [เปิดโปรเจกต์แล้ว — ตรวจแพ็กเกจที่ต้องใช้](prep-deps.md)
- [ต่อ MySQL ใน WebStorm ยังไม่ได้](prep-db.md)
- [มีตารางแล้ว — ตั้งไฟล์ db-config.js](prep-config.md)
- [ตรวจครบแล้ว — ไปเลือกทำโจทย์](start.md)
