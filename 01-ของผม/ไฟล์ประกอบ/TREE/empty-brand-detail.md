# วิธีทำทีละส่วน: กรณีศึกษา: อ่านแบรนด์รายตัว

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=brand-detail)


ข้อที่ทำ: GET /brands/:id
ผลตอบตามกรณีนี้: 200; ไม่มี404

## ก่อนเริ่ม
- [ยังไม่เคยเตรียมโครงCRUD: ทำครั้งแรกก่อน (แม้ทำข้อ2.1แล้ว)](base-mobile.md)
เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `brand` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ค้นหาแบรนด์ด้วย id; ถ้าไม่มีแถวให้ชั้น service ตัดสินใจตอบ404
export async function brand(id){const [r]=await db.query('SELECT * FROM brands WHERE id=?',[id]);return r[0] || null;}
```

### 2. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getBrand` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ข้อ2.2(ข): ขอแบรนด์ตาม id ถ้าไม่พบตอบ404
export async function getBrand(id){const row=await repo.brand(id);if(!row)throw new AppError('Brand not found',404,'BRAND_NOT_FOUND');return row;}
```

### 3. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.get('/brands/:id',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
// รับ GET /brands/:id หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/brands/:id',async(req,res)=>apiResponse(res,await service.getBrand(req.params.id)));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
GET http://localhost:3000/api/YOUR_STUDENT_ID/brands/:id
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
GET /brands/1 Appleเมื่อใช้seedครู; /brands/999999→404

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-brand-detail.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
