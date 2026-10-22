# โค้ดชุด sakila — ใช้ชื่อไฟล์ครู
อ่าน HOW-TO ก่อนคัด ใช้ node src/app.js

## src/app.js
```js
// {student-id} - {student-name}
import express from 'express';
import productRouter from './routes-$id/route.js';
import actorRouter from './routes-$id/actor-route.js';
import {AppError,errorHandler} from './middlewares-$id/error-handler.js';
import {apiResponse} from './mappers-$id/api-response.js';
const app = express();
const studentId = 'YOUR_STUDENT_ID'; // เปลี่ยนเป็นของตนตามสเปก; ไม่ใช่ :studentId
app.use(express.json());
app.use('/countries', productRouter);
app.use('/actors', actorRouter);
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
    database: process.env.DB_NAME || 'sakila',
    decimalNumbers: true,
    dateStrings: true,
});
export default db;
```

## src/mappers-$id/api-response.js
```js
// {student-id} - {student-name}
export async function apiResponse(res, data, pagination = null, status = 200) {
    const mode = 'sakila';
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
// Sakila ชุดนี้คืน raw data ตามบทสอน จึงไม่เปลี่ยนชื่อช่อง
export default class EntityDtoMapper {
 static toSummaryDTO(entity){return entity;}
 static toDetailDTO(entity){return entity;}
 static map(entity,viewType){return viewType==='summary'?this.toSummaryDTO(entity):this.toDetailDTO(entity);}
 static maps(entities,viewType){return entities.map(entity=>this.map(entity,viewType));}
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
 const mode='sakila';
 if(mode==='classic')return res.status(status).json({status:'error',error:{code,message}});
 if(mode==='sakila')return res.status(status).json({status,error:code,message,resource:req.originalUrl,timestamp:new Date().toLocaleString('en-US')});
 return res.status(status).json({success:false,error:{code,message},timestamp:new Date().toISOString()});
}
```

## src/repositories-$id/actor-repository.js
```js
import db from '../configs-$id/db-config.js';
export async function findAll(){const [rows]=await db.query('SELECT * FROM actor ORDER BY actor_id');return rows;}
export async function findOne(id){const [rows]=await db.query('SELECT * FROM actor WHERE actor_id=?',[id]);return rows[0] || null;}
export async function create(data){const [result]=await db.query('INSERT INTO actor SET ?',[data]);return findOne(result.insertId);}
export async function update(id,data){await db.query('UPDATE actor SET ? WHERE actor_id=?',[data,id]);return findOne(id);}
export async function remove(id){await db.query('DELETE FROM actor WHERE actor_id=?',[id]);}
```

## src/repositories-$id/repository.js
```js
import db from '../configs-$id/db-config.js';
export async function findAll(){const [rows]=await db.query('SELECT * FROM country ORDER BY country_id');return rows;}
export async function findOne(id){const [rows]=await db.query('SELECT * FROM country WHERE country_id=?',[id]);return rows[0] || null;}
export async function create(data){const [result]=await db.query('INSERT INTO country SET ?',[data]);return findOne(result.insertId);}
export async function update(id,data){await db.query('UPDATE country SET ? WHERE country_id=?',[data,id]);return findOne(id);}
export async function remove(id){await db.query('DELETE FROM country WHERE country_id=?',[id]);}
```

## src/routes-$id/actor-route.js
```js
import express from 'express';
import * as service from '../services-$id/actor-service.js';
import {apiResponse} from '../mappers-$id/api-response.js';
const router=express.Router();
router.get('/',async(req,res)=>apiResponse(res,await service.getAllObjects()));
router.get('/:id',async(req,res)=>apiResponse(res,await service.getObject(req.params.id)));
router.post('/',async(req,res)=>apiResponse(res,await service.createObject(req.body),null,201));
router.put('/:id',async(req,res)=>apiResponse(res,await service.updateObject(req.params.id,req.body)));
router.delete('/:id',async(req,res)=>{await service.removeObject(req.params.id);res.status(204).end();});
export default router;
```

## src/routes-$id/route.js
```js
import express from 'express';
import * as service from '../services-$id/service.js';
import {apiResponse} from '../mappers-$id/api-response.js';
const router=express.Router();
router.get('/',async(req,res)=>apiResponse(res,await service.getAllObjects()));
router.get('/:id',async(req,res)=>apiResponse(res,await service.getObject(req.params.id)));
router.post('/',async(req,res)=>apiResponse(res,await service.createObject(req.body),null,201));
router.put('/:id',async(req,res)=>apiResponse(res,await service.updateObject(req.params.id,req.body)));
router.delete('/:id',async(req,res)=>{await service.removeObject(req.params.id);res.status(204).end();});
export default router;
```

## src/services-$id/actor-service.js
```js
import * as repo from '../repositories-$id/actor-repository.js';
import {AppError} from '../middlewares-$id/error-handler.js';
const fields=["first_name", "last_name"];
function validate(body){
 if(!body || typeof body!=='object' || Array.isArray(body))throw new AppError('JSON object required',400,'VALIDATION_ERROR');
 const result={};
 for(const field of fields){
  if(typeof body[field]!=='string' || !body[field].trim())throw new AppError(`Field '${field}' is required`,400,'VALIDATION_ERROR');
  result[field]=body[field].trim();
 }
 return result;
}
export const getAllObjects=()=>repo.findAll();
export async function getObject(id){const row=await repo.findOne(id);if(!row)throw new AppError('Actor not found',404,'NOT_FOUND');return row;}
export async function createObject(body){return repo.create(validate(body));}
export async function updateObject(id,body){await getObject(id);return repo.update(id,validate(body));}
export async function removeObject(id){await getObject(id);await repo.remove(id);}
```

## src/services-$id/service.js
```js
import * as repo from '../repositories-$id/repository.js';
import {AppError} from '../middlewares-$id/error-handler.js';
const fields=["country"];
function validate(body){
 if(!body || typeof body!=='object' || Array.isArray(body))throw new AppError('JSON object required',400,'VALIDATION_ERROR');
 const result={};
 for(const field of fields){
  if(typeof body[field]!=='string' || !body[field].trim())throw new AppError(`Field '${field}' is required`,400,'VALIDATION_ERROR');
  result[field]=body[field].trim();
 }
 return result;
}
export const getAllObjects=()=>repo.findAll();
export async function getObject(id){const row=await repo.findOne(id);if(!row)throw new AppError('Country not found',404,'NOT_FOUND');return row;}
export async function createObject(body){return repo.create(validate(body));}
export async function updateObject(id,body){await getObject(id);return repo.update(id,validate(body));}
export async function removeObject(id){await getObject(id);await repo.remove(id);}
```
