# บทที่ 2 การเพิ่มข้อมูลด้วย POST

จุดสังเกต: Request Body ในโจทย์ และคอลัมน์รหัสในไฟล์ SQL
AUTO_INCREMENT แปลว่าฐานข้อมูลสร้างเลขให้ เช่น country_id / actor_id / products.id
ถ้าโจทย์ให้ส่ง productLine ซึ่งเป็นชื่อข้อความมาเอง ให้เลือกช่องข้อความ
payments ใช้รหัสลูกค้า customerNumber คู่กับ checkNumber จึงเป็นรหัสสองช่อง
ตัวอย่างโจทย์: “[POST] เพิ่มสินค้าใหม่” โดย SQL ระบุ id AUTO_INCREMENT → เลือกฐานข้อมูลออกเลขให้; “Create Product Line” รับ productLine ในBody → เลือกรหัสข้อความ

## เลือกหัวข้อ

- [ฐานข้อมูลออกเลขให้ — ใน SQL มี AUTO_INCREMENT ที่ช่องรหัส](post-auto.md)
- [ส่งรหัสข้อความมาเอง — เช่น “Create Product Line” มี productLine ใน Body](leaf-productline.md)
- [“Create Payment” — ใช้ customerNumber จาก URL คู่กับ checkNumber ใน Body](leaf-payment.md)
- [ไม่รู้ / ไม่พบ AUTO_INCREMENT — ดูคีย์ใน SQL ทีละจุด](help-sql.md)
