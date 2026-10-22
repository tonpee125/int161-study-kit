# โค้ดชุด classic — ใช้ชื่อไฟล์ครู
อ่าน HOW-TO ก่อนคัด ใช้ node src/app.js

## src/app.js
```js
// {student-id} - {student-name}
import express from 'express';
import productRouter from './routes-$id/route.js';
import {AppError,errorHandler} from './middlewares-$id/error-handler.js';
import {apiResponse} from './mappers-$id/api-response.js';
const app = express();
const studentId = 'YOUR_STUDENT_ID'; // เปลี่ยนเป็นของตนตามสเปก; ไม่ใช่ :studentId
app.use(express.json());
app.use('/api/' + studentId, productRouter);
app.use((req,res,next) => next(new AppError('Route not found',404,'ROUTE_NOT_FOUND')));
app.use(errorHandler);
app.listen(Number(process.env.PORT || 3000), () => {
 console.log('Example app listening on port ' + (process.env.PORT || 3000));
});
```

## src/configs-$id/db-config.js
```js
// {student-id} - {student-name}
import mysql from 'mysql2/promise';
const db = mysql.createPool({
    host: process.env.DB_HOST || 'db-host', // แก้ db-host ให้ตรงเครื่อง
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'db-username',
    password: process.env.DB_PASSWORD ?? 'db-password', // รหัสของเครื่อง ไม่ใช่รหัสมหาวิทยาลัย
    database: process.env.DB_NAME || 'classicmodels',
    decimalNumbers: true,
    dateStrings: true,
});
export default db;
```

## src/mappers-$id/api-response.js
```js
// {student-id} - {student-name}
export async function apiResponse(res, data, pagination = null, status = 200) {
    const mode = 'classic';
    if (mode === 'sakila') return res.status(status).json(status === 201 ? {result: data} : data);
    if (mode === 'classic') return res.status(status).json({status: 'success', data});
    const response = {success: true, data, timestamp: new Date().toISOString()};
    if (pagination) {
        const {page, limit} = pagination;
        const total = data.totalItems;
        response.pagination = {total, page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page * limit < total, hasPrevPage: page > 1};
    }
    return res.status(status).json(response);
}
```

## src/middlewares-$id/error-handler.js
```js
export class AppError extends Error {
 constructor(message,statusCode,errorCode){super(message);this.statusCode=statusCode;this.errorCode=errorCode;}
}
export function errorHandler(err,req,res,next){
 if(res.headersSent)return next(err);
 let status=err.statusCode || err.status || 500, code=err.errorCode || 'INTERNAL_SERVER_ERROR',message=err.message;
 if(err.type==='entity.parse.failed'){status=400;code='INVALID_JSON';message='Invalid JSON body';}
 if(err.code==='ER_DUP_ENTRY'){status=409;code='DUPLICATE_KEY';message=err.publicMessage || 'Resource already exists';}
 if(err.code==='ER_NO_REFERENCED_ROW_2'){status=400;code='FOREIGN_KEY_NOT_FOUND';message=err.publicMessage || 'Referenced record does not exist';}
 if(err.code==='ER_ROW_IS_REFERENCED_2'){status=409;code='RESOURCE_IN_USE';message=err.publicMessage || 'Resource is referenced by related records';}
 if(status>=500){console.error(err);message='Internal server error';}
 const mode='classic';
 if(mode==='classic')return res.status(status).json({status:'error',error:{code,message}});
 if(mode==='sakila')return res.status(status).json({status,error:code,message,resource:req.originalUrl,timestamp:new Date().toLocaleString('en-US')});
 return res.status(status).json({success:false,error:{code,message},timestamp:new Date().toISOString()});
}
```

## src/repositories-$id/repository.js
```js
import db from '../configs-$id/db-config.js';
export async function office(id){const [r]=await db.query('SELECT * FROM offices WHERE officeCode=?',[id]);return r[0] || null;}
export async function productline(id){const [r]=await db.query('SELECT * FROM productlines WHERE productLine=?',[id]);return r[0] || null;}
export async function createLine(data){await db.query('INSERT INTO productlines SET ?',[data]);return productline(data.productLine);}
export async function employee(id){const [r]=await db.query('SELECT * FROM employees WHERE employeeNumber=?',[id]);return r[0] || null;}
export async function updateEmployee(id,data){await db.query('UPDATE employees SET ? WHERE employeeNumber=?',[data,id]);return employee(id);}
export async function customer(id){const [r]=await db.query('SELECT * FROM customers WHERE customerNumber=?',[id]);return r[0] || null;}
export async function removeCustomer(id){await db.query('DELETE FROM customers WHERE customerNumber=?',[id]);}
export async function payment(customerNumber,checkNumber){const [r]=await db.query('SELECT * FROM payments WHERE customerNumber=? AND checkNumber=?',[customerNumber,checkNumber]);return r[0] || null;}
export async function createPayment(data){await db.query('INSERT INTO payments SET ?',[data]);return payment(data.customerNumber,data.checkNumber);}
```

## src/routes-$id/route.js
```js
import express from 'express';
import * as service from '../services-$id/service.js';
import {apiResponse} from '../mappers-$id/api-response.js';
const router=express.Router();
router.get('/offices/:officeCode',async(req,res)=>apiResponse(res,await service.getOffice(req.params.officeCode)));
router.post('/productlines',async(req,res)=>apiResponse(res,await service.createLine(req.body),null,201));
router.put('/employees/:employeeNumber',async(req,res)=>apiResponse(res,await service.updateEmployee(req.params.employeeNumber,req.body)));
router.delete('/customers/:customerNumber',async(req,res)=>apiResponse(res,await service.removeCustomer(req.params.customerNumber)));
router.post('/customers/:customerNumber/payments',async(req,res)=>apiResponse(res,await service.createPayment(req.params.customerNumber,req.body),null,201));
export default router;
```

## src/services-$id/service.js
```js
import * as repo from '../repositories-$id/repository.js';
import {AppError} from '../middlewares-$id/error-handler.js';
function object(body){if(!body || typeof body!=='object' || Array.isArray(body))throw new AppError('JSON object required',400,'VALIDATION_ERROR');}
function fail(message,code='VALIDATION_ERROR'){throw new AppError(message,400,code);}
function dateOK(value){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const d=new Date(value+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===value;}
export async function getOffice(id){const row=await repo.office(id);if(!row)throw new AppError(`Office with code '${id}' was not found`,404,'OFFICE_NOT_FOUND');return row;}
export async function createLine(body){
 object(body);
 if(typeof body.productLine!=='string'||!body.productLine.trim())fail("Field 'productLine' is required and cannot be empty");
 const data={productLine:body.productLine.trim()};
 if(data.productLine.length>50)fail('productLine must be at most 50 characters');
 if(Object.hasOwn(body,'textDescription')){if(body.textDescription!==null&&typeof body.textDescription!=='string')fail('Invalid textDescription');data.textDescription=body.textDescription;}
 try{return await repo.createLine(data);}catch(err){if(err.code==='ER_DUP_ENTRY')err.publicMessage=`Product line '${data.productLine}' already exists`;throw err;}
}
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
export async function removeCustomer(id){
 if(!await repo.customer(id))throw new AppError(`Customer with ID '${id}' was not found`,404,'CUSTOMER_NOT_FOUND');
 try{await repo.removeCustomer(id);}catch(err){if(err.code==='ER_ROW_IS_REFERENCED_2')err.publicMessage='Cannot delete customer because related orders or payment records exist';throw err;}
 return {message:'Customer record successfully deleted'};
}
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
