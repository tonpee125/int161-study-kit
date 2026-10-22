# ตาราง คีย์ และความสัมพันธ์ในฐานข้อมูล

จุดสังเกต: Resource ในโจทย์เพื่อรู้ชื่อตาราง แล้วค้น CREATE TABLE ชื่อนั้นใน init-database.sql
PRIMARY KEY = ช่องรหัสที่ใช้ระบุรายการ; AUTO_INCREMENT = ฐานข้อมูลสร้างเลข; UNIQUE = ค่าห้ามซ้ำ; FOREIGN KEY = ช่องที่อ้างรายการในอีกตาราง
ตัวอย่าง: products มี id BIGINT AUTO_INCREMENT PRIMARY KEY → ฐานข้อมูลสร้างรหัสสินค้า
productlines ใช้ productLine VARCHAR เป็นคีย์ → รับข้อความจากผู้ใช้
payments ใช้ PRIMARY KEY(customerNumber,checkNumber) → ต้องใช้สองค่าคู่กัน
ถ้ามีตารางในWebStormแล้ว ใช้ SHOW CREATE TABLE ตามชื่อตารางจริง โดยไม่รันคำสั่งแก้หรือล้างฐานข้อมูล

## เลือกหัวข้อ

- [กลับไปเริ่มเลือกใหม่](start.md)
- [กำลังทำ GET](get.md)
- [กำลังทำ POST](post.md)
- [กำลังทำ PUT](put.md)
- [กำลังทำ DELETE](delete.md)
- [ยังหาค่าที่โจทย์กำหนดไม่เจอ](unknown.md)
