# วิธีทำทีละส่วน: กรณีศึกษา: เพิ่มproductline string PK

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=productline)


ข้อที่ทำ: POST /productlines
ผลตอบตามกรณีนี้: 201; ชื่อว่าง400; ซ้ำ409

## ก่อนเริ่ม
- [ยังไม่เคยเตรียมโครงCRUD: ทำครั้งแรกก่อน (แม้ทำข้อ2.1แล้ว)](base-classic.md)
เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `productline` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function productline(id){const [r]=await db.query('SELECT * FROM productlines WHERE productLine=?',[id]);return r[0] || null;}
```

### 2. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `createLine` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function createLine(data){await db.query('INSERT INTO productlines SET ?',[data]);return productline(data.productLine);}
```

### 3. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `object` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
function object(body){if(!body || typeof body!=='object' || Array.isArray(body))throw new AppError('JSON object required',400,'VALIDATION_ERROR');}
```

### 4. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `fail` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
function fail(message,code='VALIDATION_ERROR'){throw new AppError(message,400,code);}
```

### 5. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `createLine` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function createLine(body){
 object(body);
 if(typeof body.productLine!=='string'||!body.productLine.trim())fail("Field 'productLine' is required and cannot be empty");
 const data={productLine:body.productLine.trim()};
 if(data.productLine.length>50)fail('productLine must be at most 50 characters');
 if(Object.hasOwn(body,'textDescription')){if(body.textDescription!==null&&typeof body.textDescription!=='string')fail('Invalid textDescription');data.textDescription=body.textDescription;}
 try{return await repo.createLine(data);}catch(err){if(err.code==='ER_DUP_ENTRY')err.publicMessage=`Product line '${data.productLine}' already exists`;throw err;}
}
```

### 6. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.post('/productlines',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.post('/productlines',async(req,res)=>apiResponse(res,await service.createLine(req.body),null,201));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
POST http://localhost:3000/api/YOUR_STUDENT_ID/productlines
```
Body → raw → JSON:
```json
{
  "productLine": "GuidePractice",
  "textDescription": "Practice"
}
```
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
POSTชื่อใหม่201; ส่งซ้ำ409; ชื่อว่าง400; อ่านกลับด้วยproductLineไม่ใช่insertId

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-productline.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
