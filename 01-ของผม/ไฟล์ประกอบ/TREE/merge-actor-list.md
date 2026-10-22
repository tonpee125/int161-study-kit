# เพิ่มต่อจากงานเดิม: กรณีศึกษา: อ่านรายการนักแสดง

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=actor-list)


ข้อที่ทำ: GET /
ผลตอบตามกรณีนี้: 200 raw array

## ก่อนเริ่ม
- [ยังไม่เคยเตรียมโครงCRUD: ทำครั้งแรกก่อน (แม้ทำข้อ2.1แล้ว)](base-sakila.md)
เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## เพิ่มresource actor โดยไม่ทับ country
สร้างสามไฟล์ชื่อactorด้านล่าง หากมีอยู่แล้วห้ามแทนโครงซ้ำ ให้เพิ่มเฉพาะฟังก์ชันในขั้นต่อไป
### src/repositories-$id/actor-repository.js
```js
import db from '../configs-$id/db-config.js';
```
### src/services-$id/actor-service.js
```js
import * as repo from '../repositories-$id/actor-repository.js';
import mapper from '../mappers-$id/entity-dto-mapper.js';
import {AppError} from '../middlewares-$id/error-handler.js';
```
### src/routes-$id/actor-route.js
```js
import express from 'express';
import * as service from '../services-$id/actor-service.js';
import {AppError} from '../middlewares-$id/error-handler.js';
import {apiResponse} from '../mappers-$id/api-response.js';
import {queryParser} from '../middlewares-$id/pagination-middleware.js';
const router = express.Router();
export default router;
```

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/repositories-$id/actor-repository.js
เพิ่มฟังก์ชัน/ตัวแปร `findAll` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function findAll(){const [rows]=await db.query('SELECT * FROM actor ORDER BY actor_id');return rows;}
```

### 2. src/services-$id/actor-service.js
เพิ่มฟังก์ชัน/ตัวแปร `getAllObjects` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export const getAllObjects=()=>repo.findAll();
```

### 3. src/routes-$id/actor-route.js
เพิ่มหรือแทนเฉพาะ `router.get('/',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.get('/',async(req,res)=>apiResponse(res,await service.getAllObjects()));
```

### 4. src/app.js
เพิ่มimportด้านบนและmountหลังexpress.json ก่อนerror handler เก็บcountriesเดิมไว้
```js
import actorRouter from './routes-$id/actor-route.js';
// วางหลัง express.json และก่อน error handler
app.use('/actors', actorRouter);
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
GET http://localhost:3000/actors
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
GET /actors →200; GET /countriesต้องยังทำงาน

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-actor-list.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
