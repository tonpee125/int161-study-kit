# เพิ่มต่อจากงานเดิม: กรณีศึกษา: เพิ่มประเทศ autoID

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=country-create)


ข้อที่ทำ: POST /
ผลตอบตามกรณีนี้: 201 {result:{...}}

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
เพิ่มฟังก์ชัน/ตัวแปร `create` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function create(data){const [result]=await db.query('INSERT INTO country SET ?',[data]);return findOne(result.insertId);}
```

### 3. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `fields` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
const fields=["country"];
```

### 4. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `validate` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
function validate(body){
 if(!body || typeof body!=='object' || Array.isArray(body))throw new AppError('JSON object required',400,'VALIDATION_ERROR');
 const result={};
 for(const field of fields){
  if(typeof body[field]!=='string' || !body[field].trim())throw new AppError(`Field '${field}' is required`,400,'VALIDATION_ERROR');
  result[field]=body[field].trim();
 }
 return result;
}
```

### 5. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `createObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function createObject(body){return repo.create(validate(body));}
```

### 6. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.post('/',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.post('/',async(req,res)=>apiResponse(res,await service.createObject(req.body),null,201));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
POST http://localhost:3000/countries
```
Body → raw → JSON:
```json
{
  "country": "GuidePractice"
}
```
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
POST →201; จดresult.country_id; GETรหัสนั้นยืนยัน

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-country-create.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
