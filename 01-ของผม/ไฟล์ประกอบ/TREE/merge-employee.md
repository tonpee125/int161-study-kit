# เพิ่มต่อจากงานเดิม: กรณีศึกษา: แก้พนักงาน emailและFK

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=employee)


ข้อที่ทำ: PUT /employees/:employeeNumber
ผลตอบตามกรณีนี้: 200; ไม่มี404; emailผิด400; FKผิด400

## ก่อนเริ่ม
- [ยังไม่เคยเตรียมโครงCRUD: ทำครั้งแรกก่อน (แม้ทำข้อ2.1แล้ว)](base-classic.md)
เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `employee` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function employee(id){const [r]=await db.query('SELECT * FROM employees WHERE employeeNumber=?',[id]);return r[0] || null;}
```

### 2. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `updateEmployee` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function updateEmployee(id,data){await db.query('UPDATE employees SET ? WHERE employeeNumber=?',[data,id]);return employee(id);}
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
เพิ่มฟังก์ชัน/ตัวแปร `updateEmployee` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function updateEmployee(id,body){
 const old=await repo.employee(id);if(!old)throw new AppError(`Employee with ID '${id}' was not found`,404,'EMPLOYEE_NOT_FOUND');
 object(body);const data={};
 for(const key of ['firstName','lastName','email','officeCode','reportsTo','jobTitle'])if(Object.hasOwn(body,key))data[key]=body[key];
 if(!Object.keys(data).length)fail('No writable fields');
 if(Object.hasOwn(data,'email')&&(typeof data.email!=='string'||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)))fail('Invalid email address format','INVALID_EMAIL');
 for(const key of ['firstName','lastName','officeCode','jobTitle'])if(Object.hasOwn(data,key)&&(typeof data[key]!=='string'||!data[key].trim()))fail(`Invalid ${key}`);
 if(Object.hasOwn(data,'reportsTo')&&data.reportsTo!==null&&(!Number.isSafeInteger(data.reportsTo)||data.reportsTo<=0))fail('Invalid reportsTo');
 try{return await repo.updateEmployee(id,data);}catch(err){if(err.code==='ER_NO_REFERENCED_ROW_2')err.publicMessage='Invalid office code or reporting manager ID';throw err;}
}
```

### 6. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.put('/employees/:employeeNumber',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.put('/employees/:employeeNumber',async(req,res)=>apiResponse(res,await service.updateEmployee(req.params.employeeNumber,req.body)));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
PUT http://localhost:3000/api/YOUR_STUDENT_ID/employees/:employeeNumber
```
Body → raw → JSON:
```json
{
  "email": "guide@example.com",
  "officeCode": "1",
  "reportsTo": null
}
```
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
ใช้รหัสพนักงานมีจริง; emailbad400; officeCode/reportsToไม่มี400; idไม่มี404

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-employee.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
