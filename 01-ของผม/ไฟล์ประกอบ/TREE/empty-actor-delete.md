# วิธีทำทีละส่วน: กรณีศึกษา: ลบนักแสดง204

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=actor-delete)


ข้อที่ทำ: DELETE /:id
ผลตอบตามกรณีนี้: 204 bodyว่าง; ไม่มี404

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
เพิ่มฟังก์ชัน/ตัวแปร `findOne` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function findOne(id){const [rows]=await db.query('SELECT * FROM actor WHERE actor_id=?',[id]);return rows[0] || null;}
```

### 2. src/repositories-$id/actor-repository.js
เพิ่มฟังก์ชัน/ตัวแปร `remove` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function remove(id){await db.query('DELETE FROM actor WHERE actor_id=?',[id]);}
```

### 3. src/services-$id/actor-service.js
เพิ่มฟังก์ชัน/ตัวแปร `getObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function getObject(id){const row=await repo.findOne(id);if(!row)throw new AppError('Actor not found',404,'NOT_FOUND');return row;}
```

### 4. src/services-$id/actor-service.js
เพิ่มฟังก์ชัน/ตัวแปร `removeObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
export async function removeObject(id){await getObject(id);await repo.remove(id);}
```

### 5. src/routes-$id/actor-route.js
เพิ่มหรือแทนเฉพาะ `router.delete('/:id',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
router.delete('/:id',async(req,res)=>{await service.removeObject(req.params.id);res.status(204).end();});
```

### 6. src/app.js
เพิ่มimportด้านบนและmountหลังexpress.json ก่อนerror handler เก็บcountriesเดิมไว้
```js
import actorRouter from './routes-$id/actor-route.js';
// วางหลัง express.json และก่อน error handler
app.use('/actors', actorRouter);
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
DELETE http://localhost:3000/actors/:id
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
ลบรหัสที่เพิ่มเอง→204; GET→404; นักแสดงเดิมอาจมีหนังผูกอยู่

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-actor-delete.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
