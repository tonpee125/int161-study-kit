# เพิ่มต่อจากงานเดิม: กรณีศึกษา: แก้ประเทศ

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=country-update)


ข้อที่ทำ: PUT /:id
ผลตอบตามกรณีนี้: 200 raw object; ไม่มี404

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
เพิ่มฟังก์ชัน/ตัวแปร `update` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function update(id,data){await db.query('UPDATE country SET ? WHERE country_id=?',[data,id]);return findOne(id);}
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
เพิ่มฟังก์ชัน/ตัวแปร `getObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function getObject(id){const row=await repo.findOne(id);if(!row)throw new AppError('Country not found',404,'NOT_FOUND');return row;}
```

### 6. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `updateObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function updateObject(id,body){await getObject(id);return repo.update(id,validate(body));}
```

### 7. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.put('/:id',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.put('/:id',async(req,res)=>apiResponse(res,await service.updateObject(req.params.id,req.body)));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
PUT http://localhost:3000/countries/:id
```
Body → raw → JSON:
```json
{
  "country": "GuideUpdated"
}
```
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
PUTรหัสที่สร้างเอง →200; GETอ่านกลับ; ส่งค่าเดิมยัง200

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-country-update.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
