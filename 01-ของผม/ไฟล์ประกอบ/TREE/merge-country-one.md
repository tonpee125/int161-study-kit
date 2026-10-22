# เพิ่มต่อจากงานเดิม: กรณีศึกษา: อ่านประเทศรายตัว

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=country-one)


ข้อที่ทำ: GET /:id
ผลตอบตามกรณีนี้: 200 raw object; ไม่พบ404

## ก่อนเริ่ม
- [ยังไม่เคยเตรียมโครงCRUD: ทำครั้งแรกก่อน (แม้ทำข้อ2.1แล้ว)](base-sakila.md)
เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `findOne` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function findOne(id){const [rows]=await db.query('SELECT * FROM country WHERE country_id=?',[id]);return rows[0] || null;}
```

### 2. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function getObject(id){const row=await repo.findOne(id);if(!row)throw new AppError('Country not found',404,'NOT_FOUND');return row;}
```

### 3. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.get('/:id',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.get('/:id',async(req,res)=>apiResponse(res,await service.getObject(req.params.id)));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
GET http://localhost:3000/countries/:id
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
GET /countries/รหัสมีจริง →200; รหัสไม่มี →404; คีย์SQL country_id

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-country-one.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
