# ถอดโจทย์ก่อนเลือกทาง
ไม่ต้องพิมพ์คำถามให้เอกสารเข้าใจ ให้วางโจทย์ไว้ข้างคู่มือนี้แล้วคัดข้อความจริง

| ช่องที่ต้องเติม | ดูจากไหน | ตัวอย่าง | ถ้าไม่พบ |
|---|---|---|---|
| Method | GET/POST/PUT/DELETE หน้าหัวข้อ | POST | อ่านหัวข้อเพิ่ม/อ่าน/แก้/ลบ แล้วตรวจ endpoint อีกครั้ง |
| URL ทั้งเส้น | Method & URI / Endpoint | /api/YOUR_STUDENT_ID/productlines | ดูการ mount router ใน app.js ด้วย |
| ค่าหลัง : | เช่น :officeCode | officeCode | ถ้าไม่มีอาจเป็นรายการ ไม่ใช่รายตัว |
| ชื่อตารางจริง | Resource และ CREATE TABLE | productlines | เปิด SQL หรือหน้าต่าง Database |
| ชื่อคีย์และชนิด | PRIMARY KEY และชนิดคอลัมน์ | productLine VARCHAR(50) | SHOW CREATE TABLE ชื่อตาราง; |
| สร้างรหัสเองไหม | AUTO_INCREMENT | ไม่มี → รับจาก Body | ห้ามอนุมานจากชื่อ id |
| ช่องรับเข้า | Request Body และเงื่อนไข | productLine,textDescription | อย่าใช้ response แทน request |
| ช่องตอบกลับ | Response Body / DTO | id,name,price | แยกชื่อ JSON ออกจากชื่อ SQL |
| query | Query Parameters | page,limit,view | ไม่มีข้อกำหนดอย่าเติมฟีเจอร์เอง |
| สำเร็จ | Response Status | 201 | ดูสเปก ไม่คัด default จาก template |
| ล้มเหลว | เงื่อนไข/JSON error | 400/404/409 | จด code และ message ตามโจทย์ |
| รูปห่อ JSON | ตัวอย่างทั้งก้อน | status หรือ success | เปิด 07-AUDIT.md |

## ตัวอย่างถอดงานครู
Week 6 เพิ่ม productline: POST; ตาราง productlines; PK productLine เป็นข้อความ; Body ส่ง PK มาเอง; ชื่อว่าง 400; ซ้ำ 409; สำเร็จ 201 → classic
Week 6 payment: POST; customerNumber มาจาก URL, checkNumber มาจาก Body; คีย์คู่; ตรวจลูกค้าก่อน; amount > 0; วันที่ YYYY-MM-DD → classic
Week 8 รายการสินค้า: GET; page/limit; response data เป็น array เฉพาะ summary; pagination.total ต้องนับทุกแถว ไม่ใช่ความยาวของหน้านี้ → mobile
Sakila country: ตาราง country แต่ URL countries; PK country_id ไม่ใช่ id; country_id/last_update ไม่ต้องส่งตอนเพิ่ม → sakila

## อ่านไม่เข้าใจ ให้เริ่มจากรูปแทนศัพท์
- data: [...] = หลายรายการ; data: {...} = รายตัว; ดูเงื่อนไขประกอบ ไม่ใช่ตัดสินจากรูปเพียงอย่างเดียว
- :id ไม่ใช่ข้อความที่พิมพ์ส่งจริง เช่น /products/12 ไม่ใช่ /products/:id
- ?page=2&limit=10 คือ query; /products/12 คือ path; {...} ใต้ Request Body คือ body
- brand_name ไม่มีใน products แต่ response ต้องมี → ดู FK brand_id และตาราง brands ก่อนเปิดชุด JOIN
- ถ้าสเปกกับตัวอย่างขัดกัน ให้จดจุดขัดกันแล้วสอบถามผู้คุม/ครูตามช่องทางที่อนุญาต ไม่ใช้ความเคยชินตัดสิน

## ยืนยันก่อนคัดลอก
เขียนประโยค: ฉันทำ [METHOD] [URL] อ่าน/เขียน [TABLE] ด้วยคีย์ [KEY] รับ [BODY] คืน [FIELDS] สำเร็จ [STATUS] ผิดพลาด [CODES]
ถ้ายังเติมไม่ได้ ให้กลับดูสเปกหรือ SQL จุดนั้นก่อน ไม่สุ่มเลือกชุด
