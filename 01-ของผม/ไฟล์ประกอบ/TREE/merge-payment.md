# เพิ่มต่อจากงานเดิม: กรณีศึกษา: เพิ่มpayment คีย์คู่

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=payment)


ข้อที่ทำ: POST /customers/:customerNumber/payments
ผลตอบตามกรณีนี้: 201; parent404; amount/dateผิด400; คู่ซ้ำ409

## ก่อนเริ่ม
- [ยังไม่เคยเตรียมโครงCRUD: ทำครั้งแรกก่อน (แม้ทำข้อ2.1แล้ว)](base-classic.md)
เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `customer` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function customer(id){const [r]=await db.query('SELECT * FROM customers WHERE customerNumber=?',[id]);return r[0] || null;}
```

### 2. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `payment` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function payment(customerNumber,checkNumber){const [r]=await db.query('SELECT * FROM payments WHERE customerNumber=? AND checkNumber=?',[customerNumber,checkNumber]);return r[0] || null;}
```

### 3. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `createPayment` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function createPayment(data){await db.query('INSERT INTO payments SET ?',[data]);return payment(data.customerNumber,data.checkNumber);}
```

### 4. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `object` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
function object(body){if(!body || typeof body!=='object' || Array.isArray(body))throw new AppError('JSON object required',400,'VALIDATION_ERROR');}
```

### 5. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `fail` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
function fail(message,code='VALIDATION_ERROR'){throw new AppError(message,400,code);}
```

### 6. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `dateOK` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
function dateOK(value){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const d=new Date(value+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===value;}
```

### 7. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `createPayment` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function createPayment(id,body){
 if(!await repo.customer(id))throw new AppError(`Customer with ID '${id}' was not found`,404,'CUSTOMER_NOT_FOUND');
 object(body);
 if(typeof body.amount!=='number'||!Number.isFinite(body.amount)||body.amount<=0)fail('Payment amount must be greater than zero','INVALID_PAYMENT_DATA');
 if(!dateOK(body.paymentDate))fail('Payment date must be YYYY-MM-DD','INVALID_PAYMENT_DATA');
 if(typeof body.checkNumber!=='string'||!body.checkNumber.trim()||body.checkNumber.length>50)fail('Invalid check number','INVALID_PAYMENT_DATA');
 const data={customerNumber:id,checkNumber:body.checkNumber,paymentDate:body.paymentDate,amount:body.amount};
 try{return await repo.createPayment(data);}catch(err){if(err.code==='ER_DUP_ENTRY')err.publicMessage=`Check number '${data.checkNumber}' has already been registered for this customer`;throw err;}
}
```

### 8. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.post('/customers/:customerNumber/payments',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.post('/customers/:customerNumber/payments',async(req,res)=>apiResponse(res,await service.createPayment(req.params.customerNumber,req.body),null,201));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
POST http://localhost:3000/api/YOUR_STUDENT_ID/customers/:customerNumber/payments
```
Body → raw → JSON:
```json
{
  "checkNumber": "GUIDE-001",
  "paymentDate": "2026-01-01",
  "amount": 1
}
```
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
customerNumberจากURL; checkNumberจากBody; คู่เดิมซ้ำ409; amount0→400; วันที่ไม่มีจริง400

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-payment.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
