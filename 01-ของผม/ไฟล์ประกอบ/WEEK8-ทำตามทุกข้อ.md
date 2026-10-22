# Week 8 — ทำตามตั้งแต่เริ่มจนจบทุกข้อ

หน้านี้อ่านเลื่อนลงได้ทั้งหมด ไม่ต้องเลือกแขนง ทำตามลำดับ 0 → 2.1 → 2.2 → 2.3 แล้วตรวจท้ายหน้า

เป็นเฉลยอธิบายสำหรับฝึกจากใบงาน Mobile Phone Distributor ของครู โดยย้ายโจทย์มาทำบนเทมเพลตกลางภาคเดิม ชื่อโฟลเดอร์จึงเป็น configs-$id / routes-$id ไม่ใช่ชื่อใน ZIP Week8

ข้อความโจทย์ด้านล่างอ้างจากสเปกชุด00001 และแทนข้อมูลส่วนบุคคลด้วย YOUR_STUDENT_ID / YOUR_NAME / YOUR_SECRET ให้เปิดสเปกที่ตนใช้ข้างกันแล้วกรอกค่าจริงให้ตรงกันทุกจุด นี่ไม่ใช่การยืนยันข้อสอบจริง

## ใช้หน้านี้อย่างไร

1. เปิดโปรเจกต์ 01-WORK/node-express-esm-template ใน WebStorm และเปิดหน้านี้ในเบราว์เซอร์
2. หากมีงานเดิม ให้สำรองทั้งโฟลเดอร์ก่อน เริ่มฝึกในสำเนาใหม่เพื่อไม่ทับงานเดิม ห้ามสลับไป Week8-Try ระหว่างทำหน้านี้
3. ทำส่วน0ครั้งเดียว แล้วทำแต่ละข้อจากบนลงล่าง อ่านโจทย์ → วางโค้ดตามชื่อไฟล์ → บันทึก → restart → ทดสอบ
4. คำว่าเพิ่มหมายถึงเก็บโค้ดข้อก่อน คำว่าแทนเฉพาะฟังก์ชันหมายถึงลบก้อนชื่อเดิมก่อนวาง ห้ามประกาศชื่อเดิมซ้ำ
5. ในชื่อโฟลเดอร์ -$id ให้คงตามเทมเพลตจริง ไม่เปลี่ยนเป็นรหัสนักศึกษา; รหัสจริงใส่ในตัวแปร ID และ URL


# เลือกใบงาน Week8 — มี4ไฟล์

ตรวจเทียบไฟล์ต้นฉบับครบแล้ว: ทั้ง4ไฟล์เป็นงาน Mobile Phone Distributor เดียวกัน ครบข้อ2.1, 2.2(สองendpoint), 2.3(ห้าendpoint) ต่างกันเฉพาะข้อมูลประจำตัว ไม่ใช่4ระบบหรือ4ชุดCRUDที่ต่างกัน

ให้ใช้ไฟล์ที่ครูกำหนดหรือไฟล์ที่เลือกฝึกเพียงชุดเดียว แล้วทำขั้นตอน0และเฉลยทุกข้อด้านล่างร่วมกัน ห้ามผสมรหัสจากไฟล์หนึ่งกับชื่อหรือsecretจากอีกไฟล์

## ชุด00001 — exam-spec-67130500001.md

ใน app.js ใช้ ID=67130500001 อ่านชื่อและsecretKeyจากหัว Student Profile ของไฟล์00001 ทุก URL เริ่ม /api/67130500001/ เช่น /api/67130500001/student-info

## ชุด00002 — exam-spec-67130500002.md

ใน app.js ใช้ ID=67130500002 อ่านชื่อและsecretKeyจากหัว Student Profile ของไฟล์00002 ทุก URL เริ่ม /api/67130500002/ เช่น /api/67130500002/student-info

## ชุด00003 — exam-spec-67130500003.md

ใน app.js ใช้ ID=67130500003 อ่านชื่อและsecretKeyจากหัว Student Profile ของไฟล์00003 ทุก URL เริ่ม /api/67130500003/ เช่น /api/67130500003/student-info

## ชุด00004 — exam-spec-67130500004.md

ใน app.js ใช้ ID=67130500004 อ่านชื่อและsecretKeyจากหัว Student Profile ของไฟล์00004 ทุก URL เริ่ม /api/67130500004/ เช่น /api/67130500004/student-info

## ไฟล์ประกอบอื่นต้องทำอะไร

init-database.sql: ฐานข้อมูลร่วมทั้ง4ชุด นำเข้าในขั้นตอน0ครั้งแรก ระวังการล้างข้อมูลเดิม

node-express-esm-template.zip ของWeek8: เป็นโครงที่แจกคู่ใบงาน ชื่อไฟล์ต่างจากกลางภาค หน้านี้ใช้เทมเพลตกลางภาคตามที่ตกลง ไม่ต้องนำโค้ดจากสองโครงมาปน

tests/test-runner.mjs: ตัวตรวจงานหนึ่งรหัส ต้องเปิดแอปและใช้ฐานฝึกก่อนเรียก ดูหัวข้อตรวจท้ายหน้า

tests/batch-grade.mjs: เครื่องมือตรวจหลายรหัส ไม่ใช่โจทย์APIเพิ่มสำหรับนักศึกษา ไม่จำเป็นต่อการทำ8endpoint

tests/test-report-67130500001.json: รายงานผลเดิม ไม่ใช่ข้อใหม่และไม่ยืนยันว่าโปรเจกต์ของเราผ่านแล้ว

ทุกชุดทำตามลำดับเดียวกัน: 0 → 2.1 → 2.2(ก) → 2.2(ข) → 2.3(1) → 2.3(2) → 2.3(3) → 2.3(4) → 2.3(5) → ตรวจครบก่อนจบ


# 0. เตรียมเครื่องและโปรเจกต์ครั้งเดียว

เปิด Terminal ของ WebStorm ตรวจว่าโฟลเดอร์ปัจจุบันมี package.json แล้วรัน npm install ขณะยังมีอินเทอร์เน็ต เตรียม dependencies ก่อนฝึกออฟไลน์

```text
npm install
```

ใน WebStorm เปิด Database → + → Data Source → MySQL ใส่ Host=localhost, Port=3306, User=root และรหัสผ่าน MySQL ของเครื่องตน กด Test Connection → Apply → OK ถ้าไม่มี driver ให้เตรียมก่อนออฟไลน์

เปิด database/init-database.sql อ่านก่อนรัน ถ้ามี DROP DATABASE จะล้างข้อมูลเดิม ให้ใช้ฐานฝึกที่สำรองแล้ว รัน SQL ครั้งแรกเพื่อสร้าง mobile_distributor ไม่รันซ้ำหลังเริ่ม POST/PUT/DELETE

เลือก data source และ schema ให้ถูกแล้วรันคำสั่งตรวจนี้ ควรมี brands22 และ products75 เมื่อเพิ่งนำเข้า seed ครู

```sql
SELECT COUNT(*) AS brands FROM mobile_distributor.brands;
SELECT COUNT(*) AS products FROM mobile_distributor.products;
```

เปิด src/configs-$id/db-config.js แทนค่าตัวอย่างด้วยข้อมูลของเครื่องตน Database ต้อง mobile_distributor การตั้ง Data Source ผ่านไม่ได้ตั้งค่าฝั่ง Node ให้โดยอัตโนมัติ

```js
// ใช้ mysql2/promise เพื่อ await การเชื่อมต่อและคำสั่ง SQL
import mysql from 'mysql2/promise';
export default mysql.createPool({
 host: '127.0.0.1', port: 3306,
 user: 'root', password: 'YOUR_MYSQL_PASSWORD',
 database: 'mobile_distributor',
 decimalNumbers: true, dateStrings: true, connectionLimit: 5
});
```

YOUR_MYSQL_PASSWORD ไม่ใช่ secretKey ของข้อ2.1 ใช้รหัสผ่าน MySQL ของตน ถ้าเครื่องตั้งรหัสว่างจริงจึงใช้สตริงว่าง

ต่อไปเตรียมไฟล์ร่วมด้านล่างครั้งเดียว จากนั้นอย่าล้าง repository/service/route ซ้ำเมื่อขึ้นข้อใหม่

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


# 2.1 ระบุตัวตน

## โจทย์จากใบงานครู

### 2.1 ระบบระบุตัวตน (Identity Verification) - 10 คะแนน
* **Method:** `GET`
* **Endpoint:** `/api/YOUR_STUDENT_ID/student-info`
* **Response Status:** `200 OK`
* **JSON Body:**
```json
{
  "success": true,
  "data": {
    "studentId": "YOUR_STUDENT_ID",
    "name": "YOUR_NAME",
    "secretKey": "YOUR_SECRET"
  },
  "timestamp": "2026-10-08T15:00:00.000Z"
}
```

## เข้าใจก่อนวางโค้ด

เพิ่ม route ใน app.js เท่านั้น ข้อนี้ไม่อ่านฐานข้อมูล ใช้ชื่อ รหัส และ secretKey จากสเปกชุดเดียวกัน ส่วน timestamp สร้างใหม่ตอนรับ request

## ลงมือทำตามลำดับ

# 2.1 ระบบระบุตัวตน — เพิ่มเฉพาะใน src/app.js

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=mobile-identity)

ใช้กับทั้งเทมเพลต Week8 และกลางภาค ข้อนี้ตอบข้อมูลประจำตัวจากสเปก ไม่อ่านตาราง MySQL และไม่ต้องเพิ่ม repository, service, mapper หรือ import ใหม่
คงโค้ดข้ออื่นในโปรเจกต์ไว้ ไม่แทน app.js ทั้งไฟล์

## 1. ตรวจรหัสที่ประกาศอยู่แล้ว

เปิด `src/app.js` หาบรรทัด `const ID = ...` เช่นใน ZIP Week8 ให้เปลี่ยนค่าเป็นรหัสในสเปกที่กำลังฝึก
ตัวอย่างรูปแบบบรรทัดนี้: แทน YOUR_STUDENT_ID ด้วยรหัสจริงก่อนรัน

```js
// เปลี่ยนเป็นรหัสในสเปกที่เลือก; รหัสนี้ต้องตรงกับ base path ใน Postman
const ID = 'YOUR_STUDENT_ID';
```

ถ้ามี const ID อยู่แล้ว ให้แก้บรรทัดเดิม ไม่ประกาศซ้ำ
ถ้าไม่มี ให้เพิ่มเพียงหนึ่งบรรทัดในระดับบนสุด ก่อน route ด้านล่าง
ถ้าใช้ตัวแปร studentId อยู่แล้ว ให้ใช้ชื่อนั้นแทน ID ในก้อน route ทั้งสองตำแหน่ง หรือใช้ ID ตามตัวอย่างให้ครบ อย่าใช้สลับกัน
เมื่อฝึกสเปก exam-spec-67130500001.md ใช้รหัส 67130500001; ถ้าใช้สเปกอีกไฟล์ให้ใช้รหัสของไฟล์นั้น

## 2. เพิ่ม route ก้อนนี้ในตำแหน่งที่กำหนด

วางหลัง `app.use(express.json())` และก่อน `app.listen(...)` รวมถึงก่อน middleware ที่ตอบ 404 หากมี
ไม่วางไว้ใน callback ของ app.listen หรือใน route อื่น
หากมี `/student-info` อยู่แล้ว ให้แทนเฉพาะ route นั้น ไม่เพิ่มซ้ำ
แทน YOUR_NAME และ YOUR_SECRET ด้วยค่าจากสเปกของตัวเอง

```js
// ข้อ2.1: routeระบุตัวตน ใช้ข้อมูลจากสเปกชุดเดียวกัน ไม่ต้อง query ฐานข้อมูล
app.get(`/api/${ID}/student-info`, (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            studentId: ID,
            name: 'YOUR_NAME',
            secretKey: 'YOUR_SECRET'
        },
        timestamp: new Date().toISOString()
    });
});
```

ใช้ก้อนนี้ได้โดยไม่อ้างไฟล์ `routes-$id` หรือ `apiResponse` เพราะใช้ Express ที่ app.js เดิมมีอยู่แล้ว
การเปิดแอปอาจยังต้องมี dependencies ของเทมเพลตครบ แต่ route นี้ไม่จำเป็นต้องต่อ DB เพื่อสร้าง response
ไม่ต้องแก้ mount ของ offices/productlines/products เพื่อทำข้อ 2.1

## 3. รันและส่ง Postman

บันทึก Ctrl+S หากแอปรันอยู่ให้ Ctrl+C ใน Terminal ของแอป แล้วรันใหม่จากรากโปรเจกต์:

```text
node src/app.js
```

Postman เลือก GET, Body none ใช้ URL ตามรหัสเดียวกับตัวแปร ID
สำหรับสเปก 67130500001 ที่กำลังฝึก:

```text
http://localhost:3000/api/67130500001/student-info
```

ต้องได้ HTTP 200 OK และ JSON แบบนี้ โดยชื่อ/ค่าลับต้องตรงสเปกที่ใช้ ไม่คัด placeholder ไปส่ง:

```json
{
  "success": true,
  "data": {
    "studentId": "YOUR_STUDENT_ID",
    "name": "YOUR_NAME",
    "secretKey": "YOUR_SECRET"
  },
  "timestamp": "2026-10-22T00:00:00.000Z"
}
```

timestamp ในกล่องเป็นตัวอย่างรูปแบบเท่านั้น โค้ดด้านบนสร้างเวลาใหม่จริงทุกครั้ง อย่าพิมพ์วันตัวอย่างเป็นค่าคงที่

## ตรวจเมื่อยังไม่ผ่าน

- 404: เทียบรหัสใน URL กับ ID, ตรวจตำแหน่ง route ว่าอยู่ก่อนตัวตอบ404, แล้ว restart
- ชื่อหรือ secretKey ไม่ตรง: เทียบข้อมูลในสเปกไฟล์ที่กำลังฝึก ไม่ใช้ข้อมูลของอีกคน
- ID has already been declared: มี const ID ซ้ำ ให้เหลือการประกาศเดิมเพียงครั้งเดียว
- ID is not defined: ยังไม่ประกาศ ID หรือใช้ชื่อ studentId อยู่ ให้ใช้ชื่อตรงกัน
- Import ไม่พบ: ย้อนคืนการคัด app.js ทั้งชุดกลางภาคถ้าเผลอทำไป แล้วเพิ่มเฉพาะ route ตามหน้านี้ในไฟล์ Week8
- ไม่เห็นผลเปลี่ยน: บันทึกไฟล์และหยุดแอปเก่าก่อนเปิดใหม่

## อ่านต่อ







# 2.2 (ก) แบรนด์ทั้งหมด

## โจทย์จากใบงานครู

#### [GET] รายการแบรนด์ทั้งหมด
* **Endpoint:** `/api/YOUR_STUDENT_ID/brands`
* **Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Apple",
      "country_of_origin": "United States",
      "website": "https://www.apple.com",
      "is_active": 1,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "timestamp": "2026-10-08T15:00:00.000Z"
}
```

## เข้าใจก่อนวางโค้ด

repository อ่านตาราง brands → service ส่งรายการ → route ห่อ success/data/timestamp ไม่แปลงชื่อคอลัมน์แบรนด์เป็น DTO ของสินค้า

## ลงมือทำตามลำดับ

# วิธีทำทีละส่วน: กรณีศึกษา: อ่านแบรนด์ทั้งหมด

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=brands-list)


ข้อที่ทำ: GET /brands
ผลตอบตามกรณีนี้: 200 success/data/timestamp

## ก่อนเริ่ม

เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `brands` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// อ่านแบรนด์โดยคงชื่อคอลัมน์ฐานข้อมูล ตามตัวอย่าง Brands API
export async function brands(){const [r]=await db.query('SELECT * FROM brands ORDER BY id');return r;}
```

### 2. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getBrands` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ข้อ2.2(ก): ขอรายการแบรนด์ทั้งหมดจาก repository
export const getBrands=()=>repo.brands();
```

### 3. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.get('/brands',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
// รับ GET /brands หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/brands',async(req,res)=>apiResponse(res,await service.getBrands()));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
GET http://localhost:3000/api/YOUR_STUDENT_ID/brands
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
GET /api/รหัสตัวเอง/brands →รายการ; seedครู22แถว





# 2.2 (ข) แบรนด์ตาม ID

## โจทย์จากใบงานครู

#### [GET] ข้อมูลแบรนด์ตามรหัส ID
* **Endpoint:** `/api/YOUR_STUDENT_ID/brands/:id`
* **Status:** `200 OK` (พบข้อมูล) หรือ `404 Not Found` (ไม่พบข้อมูล)

## เข้าใจก่อนวางโค้ด

รับ id จาก URL แล้วใช้ SQL parameter ? หากไม่มีแถว service ต้องโยน 404 ไม่ตอบ 200 พร้อม null

## ลงมือทำตามลำดับ

# วิธีทำทีละส่วน: กรณีศึกษา: อ่านแบรนด์รายตัว

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=brand-detail)


ข้อที่ทำ: GET /brands/:id
ผลตอบตามกรณีนี้: 200; ไม่มี404

## ก่อนเริ่ม

เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `brand` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ค้นหาแบรนด์ด้วย id; ถ้าไม่มีแถวให้ชั้น service ตัดสินใจตอบ404
export async function brand(id){const [r]=await db.query('SELECT * FROM brands WHERE id=?',[id]);return r[0] || null;}
```

### 2. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getBrand` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ข้อ2.2(ข): ขอแบรนด์ตาม id ถ้าไม่พบตอบ404
export async function getBrand(id){const row=await repo.brand(id);if(!row)throw new AppError('Brand not found',404,'BRAND_NOT_FOUND');return row;}
```

### 3. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.get('/brands/:id',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
// รับ GET /brands/:id หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/brands/:id',async(req,res)=>apiResponse(res,await service.getBrand(req.params.id)));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
GET http://localhost:3000/api/YOUR_STUDENT_ID/brands/:id
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
GET /brands/1 Appleเมื่อใช้seedครู; /brands/999999→404





# 2.3 (1) สินค้าแบ่งหน้า

## โจทย์จากใบงานครู

#### 1) [GET] รายการสินค้าแบบแบ่งหน้าและแปลง DTO (30 คะแนน)
* **Endpoint:** `/api/YOUR_STUDENT_ID/products`
* **Query Parameters:**
  * `page`: หมายเลขหน้า (เริ่มต้นที่ 1, ค่า default คือ 1)
  * `limit`: จำนวนรายการต่อหน้า (เช่น 10)
* **การแปลง DTO (Summary DTO):**
  ข้อมูลใน `data` จะต้องแสดงเฉพาะฟิลด์สรุป:
  * `id`
  * `sku`
  * `name`
  * `brandId` (หรือ `brand_id`)
  * `category`
  * `price`
  * `status`
* **Response Body:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "sku": "APL-IP15PM-256-NT",
      "name": "iPhone 15 Pro Max",
      "brandId": 1,
      "category": "FLAGSHIP",
      "price": 48900.00,
      "status": "AVAILABLE"
    }
  ],
  "pagination": {
    "total": 75,
    "page": 1,
    "limit": 10,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "timestamp": "2026-10-08T15:00:00.000Z"
}
```

## เข้าใจก่อนวางโค้ด

middleware แปลง page/limit เป็น offset → repository อ่านรายการและนับทั้งหมด → mapper เลือก Summary DTO 7 ช่อง → response เพิ่ม pagination ค่า default limit=10 และเพดาน100 เป็นค่าที่ตัวอย่างนี้เลือก เพราะสเปกยกตัวอย่าง10แต่ไม่ได้ระบุเพดาน

## ลงมือทำตามลำดับ

# วิธีทำทีละส่วน: กรณีศึกษา: สินค้ารายการแบ่งหน้า Summary DTO

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=mobile-page)


ข้อที่ทำ: GET /products
ผลตอบตามกรณีนี้: 200 summary7ช่อง + pagination + timestamp

## ก่อนเริ่ม

เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/mappers-$id/entity-dto-mapper.js
แทนทั้งไฟล์นี้ หากมีข้อก่อนใช้อยู่ ให้ทดสอบข้อก่อนหลังแก้ด้วย
```js
// {student-id} - {student-name}
export default class EntityDtoMapper {
 // Summary DTO ส่งเพียง7ช่อง ใช้กับGETรายการสินค้า ไม่ส่งสต็อก/สี/วันวางขายเกินโจทย์
 static toSummaryDTO(p){return {id:p.id,sku:p.sku,name:p.name,brandId:p.brand_id,category:p.category,price:p.price,status:p.status};}
 // Detail DTO เพิ่มชื่อแบรนด์ RAM ความจุ สี สต็อก และวันวางขาย รวม13ช่อง
 static toDetailDTO(p){return {...this.toSummaryDTO(p),brandName:p.brand_name,ramGb:p.ram_gb,storageGb:p.storage_gb,color:p.color,stockQuantity:p.stock_quantity,releaseDate:p.release_date};}
 // เลือกชนิด DTO ตาม viewType ที่ service กำหนด
 static map(entity,viewType){return viewType==='summary'?this.toSummaryDTO(entity):this.toDetailDTO(entity);}
 // แปลงทุกแถวและเก็บ totalItems ไว้ใช้สร้าง pagination แม้ผลลัพธ์จะเป็น arrayว่าง
 static maps(entities,viewType){
  const data=entities.map(entity=>this.map(entity,viewType));
  if(entities.totalItems!==undefined)data.totalItems=entities.totalItems;
  return data;
 }
}
```

### 2. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `findAll` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// อ่านเฉพาะหน้าที่ขอและนับสินค้าทั้งหมด แยกจำนวนทั้งหมดออกจากจำนวนในหน้านี้
export async function findAll({limit,offset}){
 // อ่านข้อมูลด้วย SQL; ค่าจาก request ส่งผ่าน placeholders ไม่ต่อเข้า SQL โดยตรง
 const [rows]=await db.query('SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?',[limit,offset]);
 // อ่านข้อมูลด้วย SQL; ค่าจาก request ส่งผ่าน placeholders ไม่ต่อเข้า SQL โดยตรง
 const [[{total}]]=await db.query('SELECT COUNT(*) AS total FROM products');rows.totalItems = Number(total);return rows;
}
```

### 3. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getAllObjects` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ข้อ2.3(1): อ่านสินค้าตาม pagination แล้วเลือก Summary DTO สำหรับรายการ
export async function getAllObjects(pagination){return mapper.maps(await repo.findAll(pagination),'summary');}
```

### 4. src/middlewares-$id/pagination-middleware.js
แทนทั้งไฟล์นี้ หากมีข้อก่อนใช้อยู่ ให้ทดสอบข้อก่อนหลังแก้ด้วย
```js
// ใช้ AppError ระบุ status/code และ errorHandler รวมการตอบข้อผิดพลาด
import {AppError} from './error-handler.js';
// อ่าน page/limit จาก URL ตรวจจำนวนเต็มบวก แล้วคำนวณ offset=(page-1)*limit
export const queryParser = () => (req,res,next) => {
 // query เป็นข้อความ จึงตรวจรูปแบบก่อนแปลงเป็นตัวเลข ไม่ยอมรับ 2abc หรือค่าซ้ำแบบarray
 function positive(value,fallback){if(value===undefined)return fallback;if(typeof value!=='string'||! /^[1-9]\d*$/.test(value)||!Number.isSafeInteger(Number(value)))throw new AppError('Invalid pagination',400,'VALIDATION_ERROR');return Number(value);}
 const page=positive(req.query.page,1),limit=Math.min(positive(req.query.limit,10),100),offset=(page-1)*limit;
 if(!Number.isSafeInteger(offset))throw new AppError('Page too large',400,'VALIDATION_ERROR');
 req.pagination={page,limit,offset};next();
}
```

### 5. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.get('/products',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
// รับ GET /products หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/products',queryParser(),async(req,res)=>{
 const objects = await service.getAllObjects(req.pagination);
 await apiResponse(res, objects, req.pagination);
});
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
GET http://localhost:3000/api/YOUR_STUDENT_ID/products
```
สำหรับแบ่งหน้า เติม `?page=2&limit=10`
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
?page=2&limit=10 →idแรก11 total75เมื่อใช้seedครู; page999→[]; queryผิด400; total0ยังมีค่า





# 2.3 (2) รายละเอียดสินค้า

## โจทย์จากใบงานครู

#### 2) [GET] ดูรายละเอียดสินค้าตาม ID (Detail DTO) (10 คะแนน)
* **Endpoint:** `/api/YOUR_STUDENT_ID/products/:id`
* **Status:** `200 OK` เมื่อพบสินค้า หรือ `404 Not Found` หากไม่พบ
* **Response Body (Detail DTO):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "sku": "APL-IP15PM-256-NT",
    "name": "iPhone 15 Pro Max",
    "brandId": 1,
    "brandName": "Apple",
    "category": "FLAGSHIP",
    "price": 48900.00,
    "ramGb": 8,
    "storageGb": 256,
    "color": "Natural Titanium",
    "stockQuantity": 15,
    "status": "AVAILABLE",
    "releaseDate": "2023-09-22"
  },
  "timestamp": "2026-10-08T15:00:00.000Z"
}
```

## เข้าใจก่อนวางโค้ด

repository JOIN brands เพื่อได้ brandName → service ตรวจว่าพบ → mapper แปลง Detail DTO 13 ช่อง ต้องใช้ชื่อ camelCase ตามตัวอย่างตอบกลับ

## ลงมือทำตามลำดับ

# วิธีทำทีละส่วน: กรณีศึกษา: รายละเอียดสินค้า JOIN Detail DTO

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=mobile-detail)


ข้อที่ทำ: GET /products/:id
ผลตอบตามกรณีนี้: 200 detail13ช่อง; ไม่มี404

## ก่อนเริ่ม

เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/mappers-$id/entity-dto-mapper.js
แทนทั้งไฟล์นี้ หากมีข้อก่อนใช้อยู่ ให้ทดสอบข้อก่อนหลังแก้ด้วย
```js
// {student-id} - {student-name}
export default class EntityDtoMapper {
 // Summary DTO ส่งเพียง7ช่อง ใช้กับGETรายการสินค้า ไม่ส่งสต็อก/สี/วันวางขายเกินโจทย์
 static toSummaryDTO(p){return {id:p.id,sku:p.sku,name:p.name,brandId:p.brand_id,category:p.category,price:p.price,status:p.status};}
 // Detail DTO เพิ่มชื่อแบรนด์ RAM ความจุ สี สต็อก และวันวางขาย รวม13ช่อง
 static toDetailDTO(p){return {...this.toSummaryDTO(p),brandName:p.brand_name,ramGb:p.ram_gb,storageGb:p.storage_gb,color:p.color,stockQuantity:p.stock_quantity,releaseDate:p.release_date};}
 // เลือกชนิด DTO ตาม viewType ที่ service กำหนด
 static map(entity,viewType){return viewType==='summary'?this.toSummaryDTO(entity):this.toDetailDTO(entity);}
 // แปลงทุกแถวและเก็บ totalItems ไว้ใช้สร้าง pagination แม้ผลลัพธ์จะเป็น arrayว่าง
 static maps(entities,viewType){
  const data=entities.map(entity=>this.map(entity,viewType));
  if(entities.totalItems!==undefined)data.totalItems=entities.totalItems;
  return data;
 }
}
```

### 2. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `findOne` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// อ่านสินค้ารายตัวพร้อมชื่อแบรนด์สำหรับ Detail DTO ใช้ ? รับค่า id อย่างปลอดภัย
export async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}
```

### 3. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `existing` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ค้นหาสินค้าก่อน ถ้าไม่พบโยน 404 เพื่อให้ GET/PUT/DELETE ตอบตรงโจทย์
async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}
```

### 4. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ข้อ2.3(2): ตรวจว่าสินค้ามีจริงแล้วแปลงเป็น Detail DTO
export async function getObject(id){return mapper.toDetailDTO(await existing(id));}
```

### 5. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.get('/products/:id',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
// รับ GET /products/:id หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/products/:id',async(req,res)=>apiResponse(res,await service.getObject(req.params.id)));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
GET http://localhost:3000/api/YOUR_STUDENT_ID/products/:id
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
id1brandName Appleเมื่อใช้seed; dateYYYY-MM-DD; ไม่มีช่องอื่นหลุด





# 2.3 (3) เพิ่มสินค้า

## โจทย์จากใบงานครู

#### 3) [POST] เพิ่มสินค้าใหม่ (10 คะแนน)
* **Endpoint:** `/api/YOUR_STUDENT_ID/products`
* **Status:** `201 Created` เมื่อบันทึกสำเร็จ หรือ `409 Conflict` เมื่อ SKU ซ้ำ
* **Request Body:**
```json
{
  "sku": "TEST-SKU-999",
  "name": "Test Phone 2026",
  "brand_id": 1,
  "category": "FLAGSHIP",
  "price": 29900.00,
  "ram_gb": 8,
  "storage_gb": 256,
  "color": "Black",
  "stock_quantity": 10,
  "status": "AVAILABLE",
  "release_date": "2026-01-01"
}
```

## เข้าใจก่อนวางโค้ด

รับ Body เป็น snake_case ตามโจทย์ → ตรวจค่าที่จำเป็น → INSERT → ใช้ insertId อ่านสินค้าที่เพิ่มกลับมาตอบ201 ถ้า SKU ซ้ำ error handler แปลงเป็น409 จด data.id ที่สร้างได้ไว้ใช้สองข้อถัดไป

## ลงมือทำตามลำดับ

# วิธีทำทีละส่วน: กรณีศึกษา: เพิ่มสินค้า autoID UNIQUE FK

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=mobile-create)


ข้อที่ทำ: POST /products
ผลตอบตามกรณีนี้: 201; SKUซ้ำ409; FKไม่มี400

## ก่อนเริ่ม

เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/mappers-$id/entity-dto-mapper.js
แทนทั้งไฟล์นี้ หากมีข้อก่อนใช้อยู่ ให้ทดสอบข้อก่อนหลังแก้ด้วย
```js
// {student-id} - {student-name}
export default class EntityDtoMapper {
 // Summary DTO ส่งเพียง7ช่อง ใช้กับGETรายการสินค้า ไม่ส่งสต็อก/สี/วันวางขายเกินโจทย์
 static toSummaryDTO(p){return {id:p.id,sku:p.sku,name:p.name,brandId:p.brand_id,category:p.category,price:p.price,status:p.status};}
 // Detail DTO เพิ่มชื่อแบรนด์ RAM ความจุ สี สต็อก และวันวางขาย รวม13ช่อง
 static toDetailDTO(p){return {...this.toSummaryDTO(p),brandName:p.brand_name,ramGb:p.ram_gb,storageGb:p.storage_gb,color:p.color,stockQuantity:p.stock_quantity,releaseDate:p.release_date};}
 // เลือกชนิด DTO ตาม viewType ที่ service กำหนด
 static map(entity,viewType){return viewType==='summary'?this.toSummaryDTO(entity):this.toDetailDTO(entity);}
 // แปลงทุกแถวและเก็บ totalItems ไว้ใช้สร้าง pagination แม้ผลลัพธ์จะเป็น arrayว่าง
 static maps(entities,viewType){
  const data=entities.map(entity=>this.map(entity,viewType));
  if(entities.totalItems!==undefined)data.totalItems=entities.totalItems;
  return data;
 }
}
```

### 2. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `findOne` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// อ่านสินค้ารายตัวพร้อมชื่อแบรนด์สำหรับ Detail DTO ใช้ ? รับค่า id อย่างปลอดภัย
export async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}
```

### 3. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `existing` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ค้นหาสินค้าก่อน ถ้าไม่พบโยน 404 เพื่อให้ GET/PUT/DELETE ตอบตรงโจทย์
async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}
```

### 4. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `required` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ช่องที่สินค้าต้องมีเมื่อผ่านการเติมค่าเริ่มต้นแล้ว; ชื่อรับเข้าใช้ snake_case ตาม Bodyครู
const required=['sku','name','brand_id','category','price','ram_gb','storage_gb','color'];
```

### 5. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `writable` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// รายชื่อช่องที่ผู้ใช้แก้ได้ ไม่รับ id หรือช่องระบบจาก Body
const writable=[...required,'stock_quantity','status','release_date'];
```

### 6. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `fail` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// หยุดทำงานด้วย HTTP 400 เมื่อค่าที่รับเข้าไม่ถูกต้อง แล้วส่งต่อให้ errorHandler จัดรูป JSON
function fail(message){throw new AppError(message,400,'VALIDATION_ERROR');}
```

### 7. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `object` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// รับเฉพาะ JSON object ป้องกัน null, array และชนิดข้อมูลที่ไม่ใช่ object
function object(body){if(!body||typeof body!=='object'||Array.isArray(body))fail('JSON object required');}
```

### 8. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `pick` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// เลือกเฉพาะช่องที่อนุญาตให้เขียน ไม่เอาทุกช่องจาก Body ไปสร้าง SQL โดยตรง
function pick(body){object(body);const data={};for(const key of writable)if(Object.hasOwn(body,key))data[key]=body[key];return data;}
```

### 9. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `validate` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ตรวจข้อมูลก่อนบันทึก ทั้งช่องจำเป็น ชนิดข้อมูล ราคา สต็อก และวันที่
function validate(p){
 // ตรวจว่าไม่มีช่องจำเป็นหายไปหรือเป็น null
 for(const key of required)if(p[key]===undefined||p[key]===null)fail(`Field '${key}' is required`);
 // ช่องข้อความต้องเป็น string และไม่ว่าง
 for(const key of ['sku','name','category','color','status'])if(typeof p[key]!=='string'||!p[key].trim())fail(`Invalid ${key}`);
 // รหัสแบรนด์ RAM และความจุต้องเป็นจำนวนเต็มบวก
 for(const key of ['brand_id','ram_gb','storage_gb'])if(!Number.isSafeInteger(p[key])||p[key]<=0)fail(`Invalid ${key}`);
 // ราคาเป็นตัวเลขจริงที่ไม่ติดลบ ไม่รับข้อความหรือ NaN
 if(typeof p.price!=='number'||!Number.isFinite(p.price)||p.price<0)fail('Invalid price');
 // สต็อกต้องเป็นจำนวนเต็มตั้งแต่0ขึ้นไป
 if(!Number.isSafeInteger(p.stock_quantity)||p.stock_quantity<0)fail('Invalid stock_quantity');
 // ถ้าใส่วันวางขาย ต้องเป็น YYYY-MM-DD และเป็นวันที่มีจริง เช่นไม่รับ 2026-02-30
 if(p.release_date!==null){const s=p.release_date,d=new Date(s+'T00:00:00Z');if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s)||!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==s)fail('Invalid release_date');}
 return p;
}
```

### 10. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `create` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// INSERT สินค้า แล้วอ่านกลับด้วย insertId ที่ MySQL สร้าง ไม่คาดเดาเลข id เอง
export async function create(data){const [result]=await db.query('INSERT INTO products SET ?',[data]);return findOne(result.insertId);}
```

### 11. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `createObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ข้อ2.3(3): เติมค่าเริ่มต้น ตรวจ Body แล้วเพิ่มสินค้าและตอบ Detail DTO ของรายการใหม่
export async function createObject(body){const data=validate({stock_quantity:0,status:'AVAILABLE',release_date:null,...pick(body)});return mapper.toDetailDTO(await repo.create(data));}
```

### 12. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.post('/products',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
// รับ POST /products หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.post('/products',async(req,res)=>apiResponse(res,await service.createObject(req.body),null,201));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
POST http://localhost:3000/api/YOUR_STUDENT_ID/products
```
Body → raw → JSON:
```json
{
  "sku": "GUIDE-001",
  "name": "Guide",
  "brand_id": 1,
  "category": "STANDARD",
  "price": 100,
  "ram_gb": 8,
  "storage_gb": 128,
  "color": "Black",
  "stock_quantity": 0,
  "status": "AVAILABLE",
  "release_date": "2026-01-01"
}
```
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
POST201จดdata.id; SKUเดิม409; brand_idไม่มี400; ช่องขาด400





# 2.3 (4) แก้สินค้า

## โจทย์จากใบงานครู

#### 4) [PUT] แก้ไขข้อมูลสินค้า (10 คะแนน)
* **Endpoint:** `/api/YOUR_STUDENT_ID/products/:id`
* **Status:** `200 OK` เมื่อแก้ไขสำเร็จ หรือ `404 Not Found` หากไม่พบ ID

## เข้าใจก่อนวางโค้ด

ตัวอย่างนี้รองรับส่งเฉพาะช่องที่แก้ ตามชุดทดสอบ Week8 ที่ส่ง name/price/stock_quantity ตรวจสินค้าว่ามีก่อนแล้ว UPDATE เฉพาะช่องที่อนุญาต ช่องที่ไม่ส่งคงค่าเดิม หากโจทย์อื่นกำหนดส่งครบทุกช่องต้องเลือกแบบ PUT ครบช่องในคู่มือหลัก

## ลงมือทำตามลำดับ

# วิธีทำทีละส่วน: กรณีศึกษา: แก้สินค้าแบบส่งบางช่อง

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=mobile-update)


ข้อที่ทำ: PUT /products/:id
ผลตอบตามกรณีนี้: 200; ไม่มี404; bodyผิด400

## ก่อนเริ่ม

เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/mappers-$id/entity-dto-mapper.js
แทนทั้งไฟล์นี้ หากมีข้อก่อนใช้อยู่ ให้ทดสอบข้อก่อนหลังแก้ด้วย
```js
// {student-id} - {student-name}
export default class EntityDtoMapper {
 // Summary DTO ส่งเพียง7ช่อง ใช้กับGETรายการสินค้า ไม่ส่งสต็อก/สี/วันวางขายเกินโจทย์
 static toSummaryDTO(p){return {id:p.id,sku:p.sku,name:p.name,brandId:p.brand_id,category:p.category,price:p.price,status:p.status};}
 // Detail DTO เพิ่มชื่อแบรนด์ RAM ความจุ สี สต็อก และวันวางขาย รวม13ช่อง
 static toDetailDTO(p){return {...this.toSummaryDTO(p),brandName:p.brand_name,ramGb:p.ram_gb,storageGb:p.storage_gb,color:p.color,stockQuantity:p.stock_quantity,releaseDate:p.release_date};}
 // เลือกชนิด DTO ตาม viewType ที่ service กำหนด
 static map(entity,viewType){return viewType==='summary'?this.toSummaryDTO(entity):this.toDetailDTO(entity);}
 // แปลงทุกแถวและเก็บ totalItems ไว้ใช้สร้าง pagination แม้ผลลัพธ์จะเป็น arrayว่าง
 static maps(entities,viewType){
  const data=entities.map(entity=>this.map(entity,viewType));
  if(entities.totalItems!==undefined)data.totalItems=entities.totalItems;
  return data;
 }
}
```

### 2. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `findOne` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// อ่านสินค้ารายตัวพร้อมชื่อแบรนด์สำหรับ Detail DTO ใช้ ? รับค่า id อย่างปลอดภัย
export async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}
```

### 3. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `existing` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ค้นหาสินค้าก่อน ถ้าไม่พบโยน 404 เพื่อให้ GET/PUT/DELETE ตอบตรงโจทย์
async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}
```

### 4. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `required` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ช่องที่สินค้าต้องมีเมื่อผ่านการเติมค่าเริ่มต้นแล้ว; ชื่อรับเข้าใช้ snake_case ตาม Bodyครู
const required=['sku','name','brand_id','category','price','ram_gb','storage_gb','color'];
```

### 5. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `writable` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// รายชื่อช่องที่ผู้ใช้แก้ได้ ไม่รับ id หรือช่องระบบจาก Body
const writable=[...required,'stock_quantity','status','release_date'];
```

### 6. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `fail` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// หยุดทำงานด้วย HTTP 400 เมื่อค่าที่รับเข้าไม่ถูกต้อง แล้วส่งต่อให้ errorHandler จัดรูป JSON
function fail(message){throw new AppError(message,400,'VALIDATION_ERROR');}
```

### 7. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `object` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// รับเฉพาะ JSON object ป้องกัน null, array และชนิดข้อมูลที่ไม่ใช่ object
function object(body){if(!body||typeof body!=='object'||Array.isArray(body))fail('JSON object required');}
```

### 8. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `pick` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// เลือกเฉพาะช่องที่อนุญาตให้เขียน ไม่เอาทุกช่องจาก Body ไปสร้าง SQL โดยตรง
function pick(body){object(body);const data={};for(const key of writable)if(Object.hasOwn(body,key))data[key]=body[key];return data;}
```

### 9. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `validate` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ตรวจข้อมูลก่อนบันทึก ทั้งช่องจำเป็น ชนิดข้อมูล ราคา สต็อก และวันที่
function validate(p){
 // ตรวจว่าไม่มีช่องจำเป็นหายไปหรือเป็น null
 for(const key of required)if(p[key]===undefined||p[key]===null)fail(`Field '${key}' is required`);
 // ช่องข้อความต้องเป็น string และไม่ว่าง
 for(const key of ['sku','name','category','color','status'])if(typeof p[key]!=='string'||!p[key].trim())fail(`Invalid ${key}`);
 // รหัสแบรนด์ RAM และความจุต้องเป็นจำนวนเต็มบวก
 for(const key of ['brand_id','ram_gb','storage_gb'])if(!Number.isSafeInteger(p[key])||p[key]<=0)fail(`Invalid ${key}`);
 // ราคาเป็นตัวเลขจริงที่ไม่ติดลบ ไม่รับข้อความหรือ NaN
 if(typeof p.price!=='number'||!Number.isFinite(p.price)||p.price<0)fail('Invalid price');
 // สต็อกต้องเป็นจำนวนเต็มตั้งแต่0ขึ้นไป
 if(!Number.isSafeInteger(p.stock_quantity)||p.stock_quantity<0)fail('Invalid stock_quantity');
 // ถ้าใส่วันวางขาย ต้องเป็น YYYY-MM-DD และเป็นวันที่มีจริง เช่นไม่รับ 2026-02-30
 if(p.release_date!==null){const s=p.release_date,d=new Date(s+'T00:00:00Z');if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s)||!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==s)fail('Invalid release_date');}
 return p;
}
```

### 10. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `update` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// UPDATE เฉพาะสินค้าที่ id ตรง แล้วอ่านค่าหลังแก้กลับไปตอบ
export async function update(id,data){await db.query('UPDATE products SET ? WHERE id=?',[data,id]);return findOne(id);}
```

### 11. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `updateObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ข้อ2.3(4): อ่านค่าเก่าก่อน ผสานเฉพาะช่องที่ส่งมา ตรวจแล้วอัปเดต
export async function updateObject(id,body){
 const old=await existing(id),patch=pick(body);if(!Object.keys(patch).length)fail('No writable fields');
 const data=validate({...pick(old),...patch});return mapper.toDetailDTO(await repo.update(id,data));
}
```

### 12. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.put('/products/:id',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
// รับ PUT /products/:id หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.put('/products/:id',async(req,res)=>apiResponse(res,await service.updateObject(req.params.id,req.body)));
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
PUT http://localhost:3000/api/YOUR_STUDENT_ID/products/:id
```
Body → raw → JSON:
```json
{
  "name": "Changed",
  "price": 100,
  "stock_quantity": 0
}
```
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
skuที่ไม่ได้ส่งคงเดิม; ส่งค่าเดิมยัง200; ไม่อนุญาตแก้idอย่างเดียว



### Body สำหรับลองแก้สินค้าที่สร้างเอง

```json
{"name":"Updated Practice Phone","price":25900,"stock_quantity":7}
```

แทน :id ใน URL ด้วย data.id ที่ได้จาก POST ไม่ใส่เครื่องหมาย : ลงใน URLจริง จากนั้น GET /products/เลขนั้น เพื่อตรวจสามค่าที่แก้และช่องอื่นยังอยู่


# 2.3 (5) ลบสินค้า

## โจทย์จากใบงานครู

#### 5) [DELETE] ลบสินค้า (5 คะแนน)
* **Endpoint:** `/api/YOUR_STUDENT_ID/products/:id`
* **Status:** `204 No Content` (ไม่มี Response Body) หรือ `404 Not Found` หากไม่พบ ID

## เข้าใจก่อนวางโค้ด

ใช้ id ที่เพิ่งเพิ่มเอง ลบสำเร็จจบด้วย status204 และ end() จึงไม่มี JSON จากนั้น GET id เดิมต้อง404 และ DELETE ซ้ำต้อง404 อย่าใช้สินค้าตั้งต้นเพราะจะทำให้จำนวน seed ไม่ตรง

## ลงมือทำตามลำดับ

# วิธีทำทีละส่วน: กรณีศึกษา: ลบสินค้า204

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=mobile-delete)


ข้อที่ทำ: DELETE /products/:id
ผลตอบตามกรณีนี้: 204ไม่มีBody; ไม่มี404

## ก่อนเริ่ม

เตรียมแล้วให้ข้ามขั้นนี้ เก็บ app.js และงานข้อก่อนไว้

## โค้ดที่ต้องใส่
หากมีฟังก์ชันชื่อนี้แล้ว ให้แทนก้อนเดิมและเก็บฟังก์ชันข้ออื่นไว้

### 1. src/mappers-$id/entity-dto-mapper.js
แทนทั้งไฟล์นี้ หากมีข้อก่อนใช้อยู่ ให้ทดสอบข้อก่อนหลังแก้ด้วย
```js
// {student-id} - {student-name}
export default class EntityDtoMapper {
 // Summary DTO ส่งเพียง7ช่อง ใช้กับGETรายการสินค้า ไม่ส่งสต็อก/สี/วันวางขายเกินโจทย์
 static toSummaryDTO(p){return {id:p.id,sku:p.sku,name:p.name,brandId:p.brand_id,category:p.category,price:p.price,status:p.status};}
 // Detail DTO เพิ่มชื่อแบรนด์ RAM ความจุ สี สต็อก และวันวางขาย รวม13ช่อง
 static toDetailDTO(p){return {...this.toSummaryDTO(p),brandName:p.brand_name,ramGb:p.ram_gb,storageGb:p.storage_gb,color:p.color,stockQuantity:p.stock_quantity,releaseDate:p.release_date};}
 // เลือกชนิด DTO ตาม viewType ที่ service กำหนด
 static map(entity,viewType){return viewType==='summary'?this.toSummaryDTO(entity):this.toDetailDTO(entity);}
 // แปลงทุกแถวและเก็บ totalItems ไว้ใช้สร้าง pagination แม้ผลลัพธ์จะเป็น arrayว่าง
 static maps(entities,viewType){
  const data=entities.map(entity=>this.map(entity,viewType));
  if(entities.totalItems!==undefined)data.totalItems=entities.totalItems;
  return data;
 }
}
```

### 2. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `findOne` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// อ่านสินค้ารายตัวพร้อมชื่อแบรนด์สำหรับ Detail DTO ใช้ ? รับค่า id อย่างปลอดภัย
export async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}
```

### 3. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `existing` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ค้นหาสินค้าก่อน ถ้าไม่พบโยน 404 เพื่อให้ GET/PUT/DELETE ตอบตรงโจทย์
async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}
```

### 4. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `remove` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// DELETE เฉพาะ id ที่รับมา ไม่ลบตารางหรือรายการอื่น
export async function remove(id){await db.query('DELETE FROM products WHERE id=?',[id]);}
```

### 5. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `removeObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ข้อ2.3(5): ตรวจว่ามีสินค้าก่อนลบ เพื่อแยกกรณี404จากการลบสำเร็จ
export async function removeObject(id){await existing(id);await repo.remove(id);}
```

### 6. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.delete('/products/:id',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
// รับ DELETE /products/:id หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.delete('/products/:id',async(req,res)=>{await service.removeObject(req.params.id);res.status(204).end();});
```

## ทดสอบใน Postman
บันทึกCtrl+S → หยุดแอปเดิมด้วยCtrl+C → `node src/app.js`
```text
DELETE http://localhost:3000/api/YOUR_STUDENT_ID/products/:id
```
Body → none
แทนYOUR_STUDENT_IDด้วยรหัสจริง และแทน:id/ชื่อparamsด้วยค่าจริงที่มีในฐานข้อมูล
DELETEรหัสทดลอง→204ว่าง; GET→404; DELETEซ้ำ→404





# ตรวจครบก่อนจบ

รันแอปจาก Terminal ในโฟลเดอร์ที่มี package.json ด้วยคำสั่งนี้ เทมเพลตกลางภาคไม่มี npm start อย่าใช้ npm test เพราะสคริปต์เดิมยังไม่ได้ตั้งชุดทดสอบ

```text
node src/app.js
```

เปิด Postman สร้าง HTTP Request เลือก Method แล้วใส่ URL เริ่ม http://localhost:3000/api/ตามรหัสจริง/… GET และ DELETE เลือก Body none ส่วน POST และ PUT เลือก Body → raw → JSON แล้วกด Send ตรวจทั้ง Status และ Body

ลำดับตรวจ: student-info200 → brands200(22แถวเมื่อ seedเดิม) → brands/1 เป็น200 → brands/999999 เป็น404 → products?page=1&limit=10 ได้10รายการ/total75 → products/1 ได้ Detail13ช่อง → POSTข้อมูลใหม่ได้201และจดid → POST SKUเดิมอีกครั้ง409 → PUT idที่สร้างได้200 → GET idนั้นตรวจค่า → DELETE idนั้น204และBodyว่าง → GETและDELETEซ้ำ404

หลัง POST totalจะเพิ่ม และหลังDELETEสินค้าที่เพิ่มจะกลับเท่าเดิม อย่าคาดว่าtotal75ตลอดเวลาหากแก้ข้อมูลเองไปแล้ว

โค้ดของแต่ละข้อข้างบนใช้ชุดเดียวกับที่ทดสอบ HTTP และฐานข้อมูลฝึกแยกจากเครื่องผู้ใช้แล้ว การตั้งค่าฐานข้อมูล ชื่อ/รหัส/secret และข้อมูลที่เหลือในเครื่องตนยังต้องตรวจตามจริง

## ถ้าเจอปัญหา ให้ตรวจตามอาการ

Cannot find module → ตรวจสะกด imports กับโฟลเดอร์ -$id และนามสกุล .js

Identifier has already been declared → วางฟังก์ชันหรือ const ชื่อเดิมซ้ำ ลบก้อนเก่าให้เหลือตัวเดียว

ECONNREFUSED MySQL → ตรวจว่า MySQL เปิดอยู่และ portตรง config

Access denied → user/password ฝั่ง Node ไม่ตรง MySQL; ไม่เกี่ยวกับ secretKey

Unknown database/table → ยังไม่ได้นำเข้าSQLหรือใช้ databaseผิด

404 ทุก URL → ตรวจรหัสใน URL ให้ตรง ID, mount /api/${ID}, และวาง routesก่อน catch-all404

EADDRINUSE3000 → มีแอปเดิมใช้พอร์ตอยู่ กลับ TerminalเดิมกดCtrl+Cแล้วเริ่มใหม่

แก้โค้ดแล้วผลไม่เปลี่ยน → Ctrl+S → Ctrl+C ในTerminalที่รันแอป → node src/app.js ใหม่ ตรวจว่าเปิดโปรเจกต์เดียวกับที่แก้

PUT ไม่เปลี่ยน → ใช้idที่มีจริง ส่งBody raw JSONและชื่อ stock_quantity ไม่ใช่ stockQuantity ซึ่งเป็นชื่อฝั่ง DTOตอบกลับ

## ชุดตรวจอัตโนมัติที่ครูให้

เทมเพลตกลางภาคไม่ได้มี tests ของWeek8ติดมาด้วย หากต้องการใช้ตัวตรวจของครู ให้นำโฟลเดอร์ tests เดิมของWeek8มาในสำเนาฝึกก่อน แล้วอ่านวิธีใช้ในสเปก ใช้รหัสชุดที่เลือกและอย่ารันทดสอบกับฐานข้อมูลที่ต้องเก็บ เพราะตัวตรวจอาจเพิ่ม/แก้/ลบข้อมูล ใช้ Postmanตามลำดับด้านบนได้โดยไม่ต้องมีtests

:::details โค้ดครบทุกไฟล์ — เปิดเมื่ออยากเทียบทั้งชุด

ต่อไปนี้คือไฟล์ปลายทางของชุดเฉลยเดียวกัน ใช้เทียบทีละไฟล์หลังทำครบ ไม่ต้องคัดทับงานที่ทำไว้ระหว่างข้อ ข้อมูลส่วนตัวและรหัสผ่านยังต้องกรอกเอง

### src/app.js

```js
// {student-id} - {student-name}
// ใช้ Express สร้างแอปหรือ Router สำหรับรับ HTTP request
import express from 'express';
import productRouter from './routes-$id/route.js';
// ใช้ AppError ระบุ status/code และ errorHandler รวมการตอบข้อผิดพลาด
import {AppError,errorHandler} from './middlewares-$id/error-handler.js';
// ใช้ตัวห่อ response ร่วม เพื่อให้ success/data/timestamp มีรูปแบบเดียวกัน
import {apiResponse} from './mappers-$id/api-response.js';
const app = express();
// เปลี่ยนเป็นรหัสในสเปกที่เลือก; รหัสนี้ต้องตรงกับ base path ใน Postman
const studentId = 'YOUR_STUDENT_ID'; // เปลี่ยนเป็นของตนตามสเปก; ไม่ใช่ :studentId
// อ่าน Body JSON ก่อนเข้า route POST/PUT มิฉะนั้น req.body จะใช้งานไม่ได้
app.use(express.json());
// ข้อ2.1: routeระบุตัวตน ใช้ข้อมูลจากสเปกชุดเดียวกัน ไม่ต้อง query ฐานข้อมูล
app.get('/api/' + studentId + '/student-info', (req,res) => apiResponse(res,{studentId,name:'YOUR_NAME',secretKey:'YOUR_SECRET'}));
// ต่อ prefix /api/รหัสนักศึกษา เข้ากับ paths ใน route.js อย่าเติม prefix ซ้ำใน Router
app.use('/api/' + studentId, productRouter);
// catch-all404 ต้องอยู่หลัง route ทั้งหมด มิฉะนั้นจะดัก request ก่อนถึงคำตอบ
app.use((req,res,next) => next(new AppError('Route not found',404,'ROUTE_NOT_FOUND')));
// error middleware อยู่หลัง routes และ catch-all เพื่อรับข้อผิดพลาดจากทุกข้อ
app.use(errorHandler);
// เปิดเซิร์ฟเวอร์เพียงครั้งเดียว ค่าเริ่มต้นพอร์ต3000; รัน node src/app.js
app.listen(Number(process.env.PORT || 3000), () => {
 console.log('Example app listening on port ' + (process.env.PORT || 3000));
});

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

### src/mappers-$id/entity-dto-mapper.js

```js
// {student-id} - {student-name}
export default class EntityDtoMapper {
 // Summary DTO ส่งเพียง7ช่อง ใช้กับGETรายการสินค้า ไม่ส่งสต็อก/สี/วันวางขายเกินโจทย์
 static toSummaryDTO(p){return {id:p.id,sku:p.sku,name:p.name,brandId:p.brand_id,category:p.category,price:p.price,status:p.status};}
 // Detail DTO เพิ่มชื่อแบรนด์ RAM ความจุ สี สต็อก และวันวางขาย รวม13ช่อง
 static toDetailDTO(p){return {...this.toSummaryDTO(p),brandName:p.brand_name,ramGb:p.ram_gb,storageGb:p.storage_gb,color:p.color,stockQuantity:p.stock_quantity,releaseDate:p.release_date};}
 // เลือกชนิด DTO ตาม viewType ที่ service กำหนด
 static map(entity,viewType){return viewType==='summary'?this.toSummaryDTO(entity):this.toDetailDTO(entity);}
 // แปลงทุกแถวและเก็บ totalItems ไว้ใช้สร้าง pagination แม้ผลลัพธ์จะเป็น arrayว่าง
 static maps(entities,viewType){
  const data=entities.map(entity=>this.map(entity,viewType));
  if(entities.totalItems!==undefined)data.totalItems=entities.totalItems;
  return data;
 }
}

```

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

### src/middlewares-$id/pagination-middleware.js

```js
// ใช้ AppError ระบุ status/code และ errorHandler รวมการตอบข้อผิดพลาด
import {AppError} from './error-handler.js';
// อ่าน page/limit จาก URL ตรวจจำนวนเต็มบวก แล้วคำนวณ offset=(page-1)*limit
export const queryParser = () => (req,res,next) => {
 // query เป็นข้อความ จึงตรวจรูปแบบก่อนแปลงเป็นตัวเลข ไม่ยอมรับ 2abc หรือค่าซ้ำแบบarray
 function positive(value,fallback){if(value===undefined)return fallback;if(typeof value!=='string'||! /^[1-9]\d*$/.test(value)||!Number.isSafeInteger(Number(value)))throw new AppError('Invalid pagination',400,'VALIDATION_ERROR');return Number(value);}
 const page=positive(req.query.page,1),limit=Math.min(positive(req.query.limit,10),100),offset=(page-1)*limit;
 if(!Number.isSafeInteger(offset))throw new AppError('Page too large',400,'VALIDATION_ERROR');
 req.pagination={page,limit,offset};next();
}

```

### src/repositories-$id/repository.js

```js
// ใช้ pool ที่ตั้งค่า MySQL ของเครื่องตนใน db-config.js
import db from '../configs-$id/db-config.js';
// อ่านแบรนด์โดยคงชื่อคอลัมน์ฐานข้อมูล ตามตัวอย่าง Brands API
export async function brands(){const [r]=await db.query('SELECT * FROM brands ORDER BY id');return r;}
// ค้นหาแบรนด์ด้วย id; ถ้าไม่มีแถวให้ชั้น service ตัดสินใจตอบ404
export async function brand(id){const [r]=await db.query('SELECT * FROM brands WHERE id=?',[id]);return r[0] || null;}
// อ่านสินค้ารายตัวพร้อมชื่อแบรนด์สำหรับ Detail DTO ใช้ ? รับค่า id อย่างปลอดภัย
export async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}
// อ่านเฉพาะหน้าที่ขอและนับสินค้าทั้งหมด แยกจำนวนทั้งหมดออกจากจำนวนในหน้านี้
export async function findAll({limit,offset}){
 // อ่านข้อมูลด้วย SQL; ค่าจาก request ส่งผ่าน placeholders ไม่ต่อเข้า SQL โดยตรง
 const [rows]=await db.query('SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?',[limit,offset]);
 // อ่านข้อมูลด้วย SQL; ค่าจาก request ส่งผ่าน placeholders ไม่ต่อเข้า SQL โดยตรง
 const [[{total}]]=await db.query('SELECT COUNT(*) AS total FROM products');rows.totalItems = Number(total);return rows;
}
// INSERT สินค้า แล้วอ่านกลับด้วย insertId ที่ MySQL สร้าง ไม่คาดเดาเลข id เอง
export async function create(data){const [result]=await db.query('INSERT INTO products SET ?',[data]);return findOne(result.insertId);}
// UPDATE เฉพาะสินค้าที่ id ตรง แล้วอ่านค่าหลังแก้กลับไปตอบ
export async function update(id,data){await db.query('UPDATE products SET ? WHERE id=?',[data,id]);return findOne(id);}
// DELETE เฉพาะ id ที่รับมา ไม่ลบตารางหรือรายการอื่น
export async function remove(id){await db.query('DELETE FROM products WHERE id=?',[id]);}

```

### src/routes-$id/route.js

```js
// ใช้ Express สร้างแอปหรือ Router สำหรับรับ HTTP request
import express from 'express';
// route เรียก service เพื่อทำงานและตรวจเงื่อนไขก่อนตอบกลับ
import * as service from '../services-$id/service.js';
// ใช้ตัวห่อ response ร่วม เพื่อให้ success/data/timestamp มีรูปแบบเดียวกัน
import {apiResponse} from '../mappers-$id/api-response.js';
// นำ middleware แบ่งหน้ามาใช้เฉพาะ endpoint รายการสินค้า
import {queryParser} from '../middlewares-$id/pagination-middleware.js';
const router=express.Router();
// รับ GET /brands หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/brands',async(req,res)=>apiResponse(res,await service.getBrands()));
// รับ GET /brands/:id หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/brands/:id',async(req,res)=>apiResponse(res,await service.getBrand(req.params.id)));
// รับ GET /products หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/products',queryParser(),async(req,res)=>{
 const objects = await service.getAllObjects(req.pagination);
 await apiResponse(res, objects, req.pagination);
});
// รับ GET /products/:id หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/products/:id',async(req,res)=>apiResponse(res,await service.getObject(req.params.id)));
// รับ POST /products หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.post('/products',async(req,res)=>apiResponse(res,await service.createObject(req.body),null,201));
// รับ PUT /products/:id หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.put('/products/:id',async(req,res)=>apiResponse(res,await service.updateObject(req.params.id,req.body)));
// รับ DELETE /products/:id หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.delete('/products/:id',async(req,res)=>{await service.removeObject(req.params.id);res.status(204).end();});
export default router;

```

### src/services-$id/service.js

```js
// ชั้น service เรียก repository เพื่อแยก SQL ออกจากกฎการทำงาน
import * as repo from '../repositories-$id/repository.js';
// ใช้ mapper เลือกและเปลี่ยนชื่อช่องข้อมูลให้ตรง DTO ที่โจทย์ต้องการ
import mapper from '../mappers-$id/entity-dto-mapper.js';
// ใช้ AppError ระบุ status/code และ errorHandler รวมการตอบข้อผิดพลาด
import {AppError} from '../middlewares-$id/error-handler.js';
// ช่องที่สินค้าต้องมีเมื่อผ่านการเติมค่าเริ่มต้นแล้ว; ชื่อรับเข้าใช้ snake_case ตาม Bodyครู
const required=['sku','name','brand_id','category','price','ram_gb','storage_gb','color'];
// รายชื่อช่องที่ผู้ใช้แก้ได้ ไม่รับ id หรือช่องระบบจาก Body
const writable=[...required,'stock_quantity','status','release_date'];
// หยุดทำงานด้วย HTTP 400 เมื่อค่าที่รับเข้าไม่ถูกต้อง แล้วส่งต่อให้ errorHandler จัดรูป JSON
function fail(message){throw new AppError(message,400,'VALIDATION_ERROR');}
// รับเฉพาะ JSON object ป้องกัน null, array และชนิดข้อมูลที่ไม่ใช่ object
function object(body){if(!body||typeof body!=='object'||Array.isArray(body))fail('JSON object required');}
// เลือกเฉพาะช่องที่อนุญาตให้เขียน ไม่เอาทุกช่องจาก Body ไปสร้าง SQL โดยตรง
function pick(body){object(body);const data={};for(const key of writable)if(Object.hasOwn(body,key))data[key]=body[key];return data;}
// ตรวจข้อมูลก่อนบันทึก ทั้งช่องจำเป็น ชนิดข้อมูล ราคา สต็อก และวันที่
function validate(p){
 // ตรวจว่าไม่มีช่องจำเป็นหายไปหรือเป็น null
 for(const key of required)if(p[key]===undefined||p[key]===null)fail(`Field '${key}' is required`);
 // ช่องข้อความต้องเป็น string และไม่ว่าง
 for(const key of ['sku','name','category','color','status'])if(typeof p[key]!=='string'||!p[key].trim())fail(`Invalid ${key}`);
 // รหัสแบรนด์ RAM และความจุต้องเป็นจำนวนเต็มบวก
 for(const key of ['brand_id','ram_gb','storage_gb'])if(!Number.isSafeInteger(p[key])||p[key]<=0)fail(`Invalid ${key}`);
 // ราคาเป็นตัวเลขจริงที่ไม่ติดลบ ไม่รับข้อความหรือ NaN
 if(typeof p.price!=='number'||!Number.isFinite(p.price)||p.price<0)fail('Invalid price');
 // สต็อกต้องเป็นจำนวนเต็มตั้งแต่0ขึ้นไป
 if(!Number.isSafeInteger(p.stock_quantity)||p.stock_quantity<0)fail('Invalid stock_quantity');
 // ถ้าใส่วันวางขาย ต้องเป็น YYYY-MM-DD และเป็นวันที่มีจริง เช่นไม่รับ 2026-02-30
 if(p.release_date!==null){const s=p.release_date,d=new Date(s+'T00:00:00Z');if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s)||!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==s)fail('Invalid release_date');}
 return p;
}
// ค้นหาสินค้าก่อน ถ้าไม่พบโยน 404 เพื่อให้ GET/PUT/DELETE ตอบตรงโจทย์
async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}
// ข้อ2.2(ก): ขอรายการแบรนด์ทั้งหมดจาก repository
export const getBrands=()=>repo.brands();
// ข้อ2.2(ข): ขอแบรนด์ตาม id ถ้าไม่พบตอบ404
export async function getBrand(id){const row=await repo.brand(id);if(!row)throw new AppError('Brand not found',404,'BRAND_NOT_FOUND');return row;}
// ข้อ2.3(1): อ่านสินค้าตาม pagination แล้วเลือก Summary DTO สำหรับรายการ
export async function getAllObjects(pagination){return mapper.maps(await repo.findAll(pagination),'summary');}
// ข้อ2.3(2): ตรวจว่าสินค้ามีจริงแล้วแปลงเป็น Detail DTO
export async function getObject(id){return mapper.toDetailDTO(await existing(id));}
// ข้อ2.3(3): เติมค่าเริ่มต้น ตรวจ Body แล้วเพิ่มสินค้าและตอบ Detail DTO ของรายการใหม่
export async function createObject(body){const data=validate({stock_quantity:0,status:'AVAILABLE',release_date:null,...pick(body)});return mapper.toDetailDTO(await repo.create(data));}
// ข้อ2.3(4): อ่านค่าเก่าก่อน ผสานเฉพาะช่องที่ส่งมา ตรวจแล้วอัปเดต
export async function updateObject(id,body){
 const old=await existing(id),patch=pick(body);if(!Object.keys(patch).length)fail('No writable fields');
 const data=validate({...pick(old),...patch});return mapper.toDetailDTO(await repo.update(id,data));
}
// ข้อ2.3(5): ตรวจว่ามีสินค้าก่อนลบ เพื่อแยกกรณี404จากการลบสำเร็จ
export async function removeObject(id){await existing(id);await repo.remove(id);}

```

:::
