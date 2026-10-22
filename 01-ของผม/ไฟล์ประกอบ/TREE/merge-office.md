# เพิ่มต่อจากงานเดิม: กรณีศึกษา: สำนักงานรหัสข้อความ

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=office)


ข้อที่ทำ: GET /offices/:officeCode
ผลตอบตามกรณีนี้: 200 status/data;404 OFFICE_NOT_FOUND

## ก่อนเริ่ม
- [ยังไม่เคยเตรียมโครงCRUD: ทำครั้งแรกก่อน (แม้ทำข้อ2.1แล้ว)](base-classic.md)
เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `office` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function office(id){const [r]=await db.query('SELECT * FROM offices WHERE officeCode=?',[id]);return r[0] || null;}
```

### 2. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getOffice` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function getOffice(id){const row=await repo.office(id);if(!row)throw new AppError(`Office with code '${id}' was not found`,404,'OFFICE_NOT_FOUND');return row;}
```

### 3. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.get('/offices/:officeCode',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.get('/offices/:officeCode',async(req,res)=>apiResponse(res,await service.getOffice(req.params.officeCode)));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
GET http://localhost:3000/api/YOUR_STUDENT_ID/offices/:officeCode
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
GET /api/รหัสตัวเอง/offices/NA ตามข้อมูลจริง; ห้ามNumber(officeCode)

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-office.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
