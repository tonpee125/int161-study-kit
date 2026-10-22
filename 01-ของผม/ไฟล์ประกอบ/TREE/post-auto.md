# 2.1 การเพิ่มข้อมูลที่มีรหัสอัตโนมัติ

จุดสังเกต: ชื่อหัวข้อและ Request Body
ไม่ต้องส่งรหัสเลขที่ฐานข้อมูลสร้างให้ หลังเพิ่มสำเร็จให้เก็บรหัสที่responseคืน ไม่ใช้รหัสจากภาพตัวอย่าง
ตัวอย่างโจทย์: “เพิ่มสินค้าใหม่” มี sku, name, brand_id ฯลฯ ในBody → เลือก Mobile products; “เพิ่มนักแสดง” ส่ง first_name,last_name → เลือก actor

## เลือกหัวข้อ

- [เพิ่มประเทศ — Body มี country](leaf-country-create.md)
- [เพิ่มนักแสดง — Body มี first_name และ last_name](leaf-actor-create.md)
- [“[POST] เพิ่มสินค้าใหม่” — Body มี sku, name, brand_id, category, price ฯลฯ](leaf-mobile-create.md)
- [ข้อมูลหรือตารางอื่น](adapt.md)
