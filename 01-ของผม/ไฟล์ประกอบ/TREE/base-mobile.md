# เตรียมโครงกลางภาคครั้งเดียว — Mobile / Week8

ทำครั้งแรกก่อนเริ่มCRUDบนสำเนาเทมเพลตกลางภาค หากทำแค่ข้อ2.1ในapp.jsแล้วก็ยังต้องเตรียมส่วนCRUDนี้ แต่เก็บroute2.1เดิมไว้ ขั้นนี้ไม่แทนapp.jsทั้งไฟล์
ถ้ามีฟังก์ชันCRUDที่ทำเองแล้ว ห้ามแทนโครงสามไฟล์ซ้ำ ให้คงงานเดิมและตรวจimports/helperที่ขาดจากรายการด้านล่าง

## 1. ตั้งฐานข้อมูล
ตั้งsrc/configs-$id/db-config.jsตามหน้าเตรียม ให้ฐานตรงโจทย์ เพิ่มdecimalNumbers:trueและdateStrings:trueในpoolเพื่อให้จำนวนเงินและวันที่ตรงตัวอย่าง ไม่คัดทับรหัสผ่านที่ตั้งถูกแล้ว

## 2. เคลียร์เฉพาะโค้ดต้นแบบที่ยังไม่ใช่งานของเรา
ไฟล์genericสามชั้นมีplaceholderและCRUDทดลองของครู แทนเป็นโครงว่างด้านล่างครั้งเดียว ฟังก์ชันจริงจะเพิ่มทีละข้อ หากมีงานเดิมห้ามแทนทั้งไฟล์ ให้ใช้วิธีเพิ่มเฉพาะส่วนตามหน้าของข้อนั้น

### src/middlewares-$id/error-handler.js
```js
export class AppError extends Error {
 constructor(message,statusCode,errorCode){super(message);this.statusCode=statusCode;this.errorCode=errorCode;}
}
// แปลงข้อผิดพลาดเป็น HTTP/JSON ที่คาดเดาได้ เช่น SKUซ้ำ409, ข้อมูลอ้างอิงไม่มี400
export function errorHandler(err,req,res,next){
 if(res.headersSent)return next(err);
 let status=err.statusCode || err.status || 500, code=err.errorCode || 'INTERNAL_SERVER_ERROR',message=err.message;
 if(err.type==='entity.parse.failed'){status=400;code='INVALID_JSON';message='Invalid JSON body';}
 // MySQLแจ้ง UNIQUEซ้ำ เช่นSKU → HTTP409 ตามโจทย์
 if(err.code==='ER_DUP_ENTRY'){status=409;code='DUPLICATE_KEY';message=err.publicMessage || 'Resource already exists';}
 // brand_id อ้างถึงแบรนด์ที่ไม่มี → HTTP400
 if(err.code==='ER_NO_REFERENCED_ROW_2'){status=400;code='FOREIGN_KEY_NOT_FOUND';message=err.publicMessage || 'Referenced record does not exist';}
 if(err.code==='ER_ROW_IS_REFERENCED_2'){status=409;code='RESOURCE_IN_USE';message=err.publicMessage || 'Resource is referenced by related records';}
 // บันทึกปัญหาฝั่งเซิร์ฟเวอร์ แต่ไม่ส่งรายละเอียด SQL/รหัสผ่านกลับให้ผู้ใช้
 if(status>=500){console.error(err);message='Internal server error';}
 const mode='mobile';
 if(mode==='classic')return res.status(status).json({status:'error',error:{code,message}});
 if(mode==='sakila')return res.status(status).json({status,error:code,message,resource:req.originalUrl,timestamp:new Date().toLocaleString('en-US')});
 return res.status(status).json({success:false,error:{code,message},timestamp:new Date().toISOString()});
}
```

### src/mappers-$id/api-response.js
```js
// {student-id} - {student-name}
// ห่อผลลัพธ์เป็น success/data/timestamp; status เป็นอาร์กิวเมนต์ตัวที่4 ส่วนตัวที่3คือpagination
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

### src/repositories-$id/repository.js
```js
// ใช้ pool ที่ตั้งค่า MySQL ของเครื่องตนใน db-config.js
import db from '../configs-$id/db-config.js';
```

### src/services-$id/service.js
```js
// ชั้น service เรียก repository เพื่อแยก SQL ออกจากกฎการทำงาน
import * as repo from '../repositories-$id/repository.js';
// ใช้ mapper เลือกและเปลี่ยนชื่อช่องข้อมูลให้ตรง DTO ที่โจทย์ต้องการ
import mapper from '../mappers-$id/entity-dto-mapper.js';
// ใช้ AppError ระบุ status/code และ errorHandler รวมการตอบข้อผิดพลาด
import {AppError} from '../middlewares-$id/error-handler.js';
```

### src/routes-$id/route.js
```js
// ใช้ Express สร้างแอปหรือ Router สำหรับรับ HTTP request
import express from 'express';
// route เรียก service เพื่อทำงานและตรวจเงื่อนไขก่อนตอบกลับ
import * as service from '../services-$id/service.js';
// ใช้ AppError ระบุ status/code และ errorHandler รวมการตอบข้อผิดพลาด
import {AppError} from '../middlewares-$id/error-handler.js';
// ใช้ตัวห่อ response ร่วม เพื่อให้ success/data/timestamp มีรูปแบบเดียวกัน
import {apiResponse} from '../mappers-$id/api-response.js';
// นำ middleware แบ่งหน้ามาใช้เฉพาะ endpoint รายการสินค้า
import {queryParser} from '../middlewares-$id/pagination-middleware.js';
const router = express.Router();
export default router;
```

## 3. แก้ app.js เฉพาะจุด
เก็บimport expressและการสร้างapp/express.json/listenเดิมไว้ ไม่เพิ่มlistenตัวที่สอง
เพิ่มimportนี้ด้านบนแทนerror-handlerตัวอื่นถ้าใช้ชุดนี้:
```js
// ใช้ AppError ระบุ status/code และ errorHandler รวมการตอบข้อผิดพลาด
import {AppError, errorHandler} from './middlewares-$id/error-handler.js';
```
ประกาศIDรหัสจากสเปกก่อนrouteหนึ่งครั้ง ถ้ามีแล้วเปลี่ยนเฉพาะค่า ไม่ประกาศซ้ำ:
```js
// เปลี่ยนเป็นรหัสในสเปกที่เลือก; รหัสนี้ต้องตรงกับ base path ใน Postman
const ID = 'YOUR_STUDENT_ID';
```
หาบรรทัด app.use ที่mount productRouter ของต้นฉบับ แล้วเปลี่ยนบรรทัดนั้นเป็น:
```js
// ต่อ prefix /api/รหัสนักศึกษา เข้ากับ paths ใน route.js อย่าเติม prefix ซ้ำใน Router
app.use(`/api/${ID}`, productRouter);
```
แทนerror middlewareว่างของครูด้วยก้อนนี้ที่ท้ายส่วนrouter ถ้ามีerror handlerอื่นที่กำลังตอบอยู่ให้ใช้เพียงตัวเดียวตามสเปกชุดนี้:
```js
// catch-all404 ต้องอยู่หลัง route ทั้งหมด มิฉะนั้นจะดัก request ก่อนถึงคำตอบ
app.use((req, res, next) => next(new AppError('Route not found', 404, 'ROUTE_NOT_FOUND')));
// error middleware อยู่หลัง routes และ catch-all เพื่อรับข้อผิดพลาดจากทุกข้อ
app.use(errorHandler);
```
ทุกapp.get/app.useของrouteที่จะเพิ่มภายหลังต้องอยู่ก่อนตัวตอบ404นี้ โค้ดข้อ2.1ที่เพิ่มไว้ก่อนหน้านี้ต้องอยู่ครบ

## ทำครั้งเดียวต่อโปรเจกต์
อย่าสลับhelperของงานMobileกับWeek6หรือSakilaในโปรเจกต์เดียวกัน เพราะรูปแบบresponseต่างกัน ถ้าเปลี่ยนงานหรือฐานให้ใช้สำเนาใหม่ของเทมเพลตกลางภาคเดิม ไม่ใช่เปลี่ยนเทมเพลต

## ทำข้อแรก
- [ทำข้อแรกของชุดนี้](empty-brands-list.md)
- [กลับเลือกข้อ](start.md)
