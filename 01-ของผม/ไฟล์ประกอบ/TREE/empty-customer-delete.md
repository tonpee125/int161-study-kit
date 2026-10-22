# วิธีทำทีละส่วน: กรณีศึกษา: ลบลูกค้า200พร้อมข้อความ

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=customer-delete)


ข้อที่ทำ: DELETE /customers/:customerNumber
ผลตอบตามกรณีนี้: 200 data.message; ไม่มี404; FK1451→409

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
เพิ่มฟังก์ชัน/ตัวแปร `removeCustomer` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function removeCustomer(id){await db.query('DELETE FROM customers WHERE customerNumber=?',[id]);}
```

### 3. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `removeCustomer` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function removeCustomer(id){
 if(!await repo.customer(id))throw new AppError(`Customer with ID '${id}' was not found`,404,'CUSTOMER_NOT_FOUND');
 try{await repo.removeCustomer(id);}catch(err){if(err.code==='ER_ROW_IS_REFERENCED_2')err.publicMessage='Cannot delete customer because related orders or payment records exist';throw err;}
 return {message:'Customer record successfully deleted'};
}
```

### 4. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.delete('/customers/:customerNumber',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.delete('/customers/:customerNumber',async(req,res)=>apiResponse(res,await service.removeCustomer(req.params.customerNumber)));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
DELETE http://localhost:3000/api/YOUR_STUDENT_ID/customers/:customerNumber
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
ลูกค้าทดลองไม่มีรายการลูก→200; มีorders/payments→409; อย่าลบลูกเพื่อให้ผ่าน

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-customer-delete.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
