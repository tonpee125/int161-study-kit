# วิธีทำทีละส่วน: กรณีศึกษา: อ่านแบรนด์ทั้งหมด

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=brands-list)


ข้อที่ทำ: GET /brands
ผลตอบตามกรณีนี้: 200 success/data/timestamp

## ก่อนเริ่ม
- [ยังไม่เคยเตรียมโครงCRUD: ทำครั้งแรกก่อน (แม้ทำข้อ2.1แล้ว)](base-mobile.md)
เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `brands` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// อ่านแบรนด์โดยคงชื่อคอลัมน์ฐานข้อมูล ตามตัวอย่าง Brands API
export async function brands(){const [r]=await db.query('SELECT * FROM brands ORDER BY id');return r;}
```

### 2. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getBrands` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ข้อ2.2(ก): ขอรายการแบรนด์ทั้งหมดจาก repository
export const getBrands=()=>repo.brands();
```

### 3. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.get('/brands',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
// รับ GET /brands หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/brands',async(req,res)=>apiResponse(res,await service.getBrands()));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
GET http://localhost:3000/api/YOUR_STUDENT_ID/brands
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
GET /api/รหัสตัวเอง/brands →รายการ; seedครู22แถว

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-brands-list.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
