# 4. นำเข้า SQL ของโจทย์และตรวจตาราง

สำหรับWeek8 เปิด database/init-database.sql ในสำเนาฝึก หรือไฟล์ init-database.sql ที่ครูให้ สคริปต์นี้สร้างฐาน mobile_distributor และเติมbrands/products
อ่านชื่อฐานข้อมูลและคำสั่ง DROP/TRUNCATE ก่อนรัน ใช้ฐานฝึกที่ตั้งใจเท่านั้น การรันซ้ำอาจล้างข้อมูลที่เพิ่มไว้แล้ว
ในWebStormคลิกขวาไฟล์SQL → Run แล้วเลือก Target data source เป็นMySQLที่เพิ่งTest Connectionผ่าน ตรวจว่าทุกstatementทำสำเร็จ
ถ้าไฟล์ไม่ปรากฏเมนูRun ให้เปิดQuery ConsoleของData Source แล้วเปิด/วางสคริปต์ที่ตรวจแล้วรันกับconnectionนั้น; อย่ารันสลับเครื่องหรือฐานอื่น
เลือกDatabaseเป็นmobile_distributor แล้วRefresh ต้องเห็นbrandsและproducts
ตรวจด้วยSQLอ่านอย่างเดียว:
```sql
SELECT DATABASE();
SELECT COUNT(*) AS brandCount FROM mobile_distributor.brands;
SELECT COUNT(*) AS productCount FROM mobile_distributor.products;
SELECT id, name FROM mobile_distributor.brands LIMIT 1;
```
หากใช้seedWeek8ใหม่ครบ ควรมีbrands22และproducts75 ถ้าเคยแก้ข้อมูลจำนวนอาจเปลี่ยน อย่าล้างฐานเพียงเพื่อให้ตัวเลขตรง
Sakilaใช้sakilaและตารางcountry/actor ส่วนclassicmodelsใช้ฐานตามไฟล์งานนั้น ห้ามเปลี่ยนทุกงานเป็นmobile_distributor

## เลือกหัวข้อ

- [เห็นตารางและSELECTได้ → ขั้น 5 ตั้ง db-config.js](prep-config.md)
- [Unknown database / Table does not exist](recover-db.md)
- [กลับภาพรวม](prepare.md)
