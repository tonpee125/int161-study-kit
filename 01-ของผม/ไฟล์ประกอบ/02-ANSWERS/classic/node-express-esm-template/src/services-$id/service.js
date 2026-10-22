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
