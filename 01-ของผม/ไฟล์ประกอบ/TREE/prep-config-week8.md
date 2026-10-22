# 5.1 ตั้งค่า config — Week8

เปิด src/configs/db-config.js เปลี่ยนค่าของpoolเดิม ไม่สร้างpoolซ้ำในไฟล์เดียว
ใช้Host/Port/User/PasswordชุดเดียวกับData Sourceที่Test Connectionผ่าน และDatabaseตรงงาน
ตัวอย่างด้านล่างใช้ค่าตามสไลด์ครูสำหรับเครื่องแล็บ: host localhost, port3306, user root, password mysql@sit และฐาน mobile_distributor ของWeek8 ถ้าเป็นเครื่องส่วนตัวให้เปลี่ยนuser/password/portตามที่เชื่อมผ่านจริง
```js
// ใช้ mysql2/promise เพื่อ await การเชื่อมต่อและคำสั่ง SQL
import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mysql@sit',
    database: 'mobile_distributor',
    decimalNumbers: true,
    dateStrings: true,
});

export default db;
```
ถ้ากำลังฝึกcountryให้Databaseเป็นsakila ถ้าทำงานclassicmodelsให้ใช้ชื่อตามSQLของงานนั้น ไม่คัดชื่อฐานของWeek8ไปทุกงาน
หากไฟล์ใช้process.env.DB_HOSTหรือDB_NAMEอยู่ ค่าจากenvironmentอาจมาก่อนค่าหลัง|| ต้องตรวจว่าไม่มีค่าเก่าค้างก่อนสรุปว่าค่าที่แก้ถูกใช้แล้ว
บันทึกCtrl+S แล้วตรวจการเชื่อมจากNodeในขั้นต่อไป

## เลือกหัวข้อ

- [บันทึกconfigแล้ว → ขั้น 6 ตรวจเชื่อมจากNode](prep-check-week8.md)
- [ยังไม่รู้user/password/port → ตรวจData Source](prep-db.md)
- [เลือกชนิดเทมเพลตใหม่](prep-config.md)
