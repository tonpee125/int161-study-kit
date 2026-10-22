# โค้ดชุด mobile — ใช้ชื่อไฟล์ครู
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
app.get('/api/' + studentId + '/student-info', (req,res) => apiResponse(res,{studentId,name:'YOUR_NAME',secretKey:'YOUR_SECRET'}));
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
    database: process.env.DB_NAME || 'mobile_distributor',
    decimalNumbers: true,
    dateStrings: true,
});
export default db;
```

## src/mappers-$id/api-response.js
```js
// {student-id} - {student-name}
export async function apiResponse(res, data, pagination = null, status = 200) {
    const mode = 'mobile';
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

## src/mappers-$id/entity-dto-mapper.js
```js
// {student-id} - {student-name}
export default class EntityDtoMapper {
 static toSummaryDTO(p){return {id:p.id,sku:p.sku,name:p.name,brandId:p.brand_id,category:p.category,price:p.price,status:p.status};}
 static toDetailDTO(p){return {...this.toSummaryDTO(p),brandName:p.brand_name,ramGb:p.ram_gb,storageGb:p.storage_gb,color:p.color,stockQuantity:p.stock_quantity,releaseDate:p.release_date};}
 static map(entity,viewType){return viewType==='summary'?this.toSummaryDTO(entity):this.toDetailDTO(entity);}
 static maps(entities,viewType){
  const data=entities.map(entity=>this.map(entity,viewType));
  if(entities.totalItems!==undefined)data.totalItems=entities.totalItems;
  return data;
 }
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
 const mode='mobile';
 if(mode==='classic')return res.status(status).json({status:'error',error:{code,message}});
 if(mode==='sakila')return res.status(status).json({status,error:code,message,resource:req.originalUrl,timestamp:new Date().toLocaleString('en-US')});
 return res.status(status).json({success:false,error:{code,message},timestamp:new Date().toISOString()});
}
```

## src/middlewares-$id/pagination-middleware.js
```js
import {AppError} from './error-handler.js';
export const queryParser = () => (req,res,next) => {
 function positive(value,fallback){if(value===undefined)return fallback;if(typeof value!=='string'||! /^[1-9]\d*$/.test(value)||!Number.isSafeInteger(Number(value)))throw new AppError('Invalid pagination',400,'VALIDATION_ERROR');return Number(value);}
 const page=positive(req.query.page,1),limit=Math.min(positive(req.query.limit,10),100),offset=(page-1)*limit;
 if(!Number.isSafeInteger(offset))throw new AppError('Page too large',400,'VALIDATION_ERROR');
 req.pagination={page,limit,offset};next();
}
```

## src/repositories-$id/repository.js
```js
import db from '../configs-$id/db-config.js';
export async function brands(){const [r]=await db.query('SELECT * FROM brands ORDER BY id');return r;}
export async function brand(id){const [r]=await db.query('SELECT * FROM brands WHERE id=?',[id]);return r[0] || null;}
export async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}
export async function findAll({limit,offset}){
 const [rows]=await db.query('SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?',[limit,offset]);
 const [[{total}]]=await db.query('SELECT COUNT(*) AS total FROM products');rows.totalItems = Number(total);return rows;
}
export async function create(data){const [result]=await db.query('INSERT INTO products SET ?',[data]);return findOne(result.insertId);}
export async function update(id,data){await db.query('UPDATE products SET ? WHERE id=?',[data,id]);return findOne(id);}
export async function remove(id){await db.query('DELETE FROM products WHERE id=?',[id]);}
```

## src/routes-$id/route.js
```js
import express from 'express';
import * as service from '../services-$id/service.js';
import {apiResponse} from '../mappers-$id/api-response.js';
import {queryParser} from '../middlewares-$id/pagination-middleware.js';
const router=express.Router();
router.get('/brands',async(req,res)=>apiResponse(res,await service.getBrands()));
router.get('/brands/:id',async(req,res)=>apiResponse(res,await service.getBrand(req.params.id)));
router.get('/products',queryParser(),async(req,res)=>{
 const objects = await service.getAllObjects(req.pagination);
 await apiResponse(res, objects, req.pagination);
});
router.get('/products/:id',async(req,res)=>apiResponse(res,await service.getObject(req.params.id)));
router.post('/products',async(req,res)=>apiResponse(res,await service.createObject(req.body),null,201));
router.put('/products/:id',async(req,res)=>apiResponse(res,await service.updateObject(req.params.id,req.body)));
router.delete('/products/:id',async(req,res)=>{await service.removeObject(req.params.id);res.status(204).end();});
export default router;
```

## src/services-$id/service.js
```js
import * as repo from '../repositories-$id/repository.js';
import mapper from '../mappers-$id/entity-dto-mapper.js';
import {AppError} from '../middlewares-$id/error-handler.js';
const required=['sku','name','brand_id','category','price','ram_gb','storage_gb','color'];
const writable=[...required,'stock_quantity','status','release_date'];
function fail(message){throw new AppError(message,400,'VALIDATION_ERROR');}
function object(body){if(!body||typeof body!=='object'||Array.isArray(body))fail('JSON object required');}
function pick(body){object(body);const data={};for(const key of writable)if(Object.hasOwn(body,key))data[key]=body[key];return data;}
function validate(p){
 for(const key of required)if(p[key]===undefined||p[key]===null)fail(`Field '${key}' is required`);
 for(const key of ['sku','name','category','color','status'])if(typeof p[key]!=='string'||!p[key].trim())fail(`Invalid ${key}`);
 for(const key of ['brand_id','ram_gb','storage_gb'])if(!Number.isSafeInteger(p[key])||p[key]<=0)fail(`Invalid ${key}`);
 if(typeof p.price!=='number'||!Number.isFinite(p.price)||p.price<0)fail('Invalid price');
 if(!Number.isSafeInteger(p.stock_quantity)||p.stock_quantity<0)fail('Invalid stock_quantity');
 if(p.release_date!==null){const s=p.release_date,d=new Date(s+'T00:00:00Z');if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s)||!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==s)fail('Invalid release_date');}
 return p;
}
async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}
export const getBrands=()=>repo.brands();
export async function getBrand(id){const row=await repo.brand(id);if(!row)throw new AppError('Brand not found',404,'BRAND_NOT_FOUND');return row;}
export async function getAllObjects(pagination){return mapper.maps(await repo.findAll(pagination),'summary');}
export async function getObject(id){return mapper.toDetailDTO(await existing(id));}
export async function createObject(body){const data=validate({stock_quantity:0,status:'AVAILABLE',release_date:null,...pick(body)});return mapper.toDetailDTO(await repo.create(data));}
export async function updateObject(id,body){
 const old=await existing(id),patch=pick(body);if(!Object.keys(patch).length)fail('No writable fields');
 const data=validate({...pick(old),...patch});return mapper.toDetailDTO(await repo.update(id,data));
}
export async function removeObject(id){await existing(id);await repo.remove(id);}
```
