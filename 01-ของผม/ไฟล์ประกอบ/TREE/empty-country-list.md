# วิธีทำทีละส่วน: กรณีศึกษา: อ่านรายการประเทศ

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=country-list)


ข้อที่ทำ: GET /
ผลตอบตามกรณีนี้: 200 raw array ไม่มีwrapper

## ก่อนเริ่ม
- [ยังไม่เคยเตรียมโครงCRUD: ทำครั้งแรกก่อน (แม้ทำข้อ2.1แล้ว)](base-sakila.md)
เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `findAll` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function findAll(){const [rows]=await db.query('SELECT * FROM country ORDER BY country_id');return rows;}
```

### 2. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getAllObjects` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export const getAllObjects=()=>repo.findAll();
```

### 3. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.get('/',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.get('/',async(req,res)=>apiResponse(res,await service.getAllObjects()));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
GET http://localhost:3000/countries
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
GET /countries →200 array; เทียบSELECTจากฐานจริง

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-country-list.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
