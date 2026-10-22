# 3. เชื่อม WebStorm กับ MySQL

ค่าตามภาพสไลด์ครู สำหรับเครื่องแล็บ:
Host = localhost
Port = 3306
Authentication = User & Password
User = root
Password = mysql@sit
Database = เว้นว่างได้ตอนเชื่อมเซิร์ฟเวอร์ก่อนนำเข้า SQL; หลังนำเข้าโจทย์ Week8 ให้ใช้ mobile_distributor
กด Test Connection → ต้องเห็น Succeeded → Apply → OK
ถ้าเป็นเครื่องส่วนตัว ใช้รหัสที่ตั้งไว้ในเครื่องนั้น ค่าในสไลด์ไม่ยืนยันว่าใช้กับเครื่องส่วนตัวได้

เปิด View → Tool Windows → Database → กด + → Data Source → MySQL
กรอก Host เช่น localhost หรือ 127.0.0.1, Port ตามเครื่อง (มัก3306), User ของMySQL และ Password ของMySQL ไม่ใช่รหัสมหาวิทยาลัย
ถ้ามี Download missing driver files ให้เตรียมให้เสร็จก่อนช่วงปิดอินเทอร์เน็ต ไดรเวอร์นี้ใช้สำหรับเครื่องมือฐานข้อมูลใน WebStorm ส่วนแอป Node ใช้ mysql2
หากยังไม่ได้สร้างฐานข้อมูล ให้เว้น Database ว่างเพื่อเชื่อมเซิร์ฟเวอร์ก่อน
กด Test Connection ต้องขึ้น Succeeded แล้วกด Apply/OK เก็บ Host/Port/User/Database ที่ใช้ไว้เพื่อกรอก db-config.js ให้ตรงกัน ไม่ต้องส่งรหัสผ่านให้ผู้อื่น
ถ้า Access denied ให้ตรวจuser/password; ถ้า Connection refused ให้ตรวจMySQLเปิดและportถูก ไม่แก้ไฟล์routeเพื่อแก้ปัญหาส่วนนี้

## เลือกหัวข้อ

- [Test Connection ผ่าน → ขั้น 4 เตรียมตาราง](prep-sql.md)
- [ยังต่อไม่ได้ → วิธีตรวจปัญหาฐานข้อมูล](recover-db.md)
- [กลับภาพรวม](prepare.md)
