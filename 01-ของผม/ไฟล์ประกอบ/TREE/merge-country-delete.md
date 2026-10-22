# เพิ่มต่อจากงานเดิม: กรณีศึกษา: ลบประเทศ204

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=country-delete)


ข้อที่ทำ: DELETE /:id
ผลตอบตามกรณีนี้: 204 bodyว่าง; ไม่มี404; ถูกอ้างอิง409ในชุดปรับปรุง

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

### 2. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `remove` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function remove(id){await db.query('DELETE FROM country WHERE country_id=?',[id]);}
```

### 3. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function getObject(id){const row=await repo.findOne(id);if(!row)throw new AppError('Country not found',404,'NOT_FOUND');return row;}
```

### 4. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `removeObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function removeObject(id){await getObject(id);await repo.remove(id);}
```

### 5. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.delete('/:id',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.delete('/:id',async(req,res)=>{await service.removeObject(req.params.id);res.status(204).end();});
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
DELETE http://localhost:3000/countries/:id
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
DELETEรหัสที่สร้างเอง→204; GET→404; ห้ามลบข้อมูลลูกเพื่อหลบFK

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-country-delete.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
