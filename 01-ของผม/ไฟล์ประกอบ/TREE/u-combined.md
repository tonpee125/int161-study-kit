# กรอง + ค้นหา + JOIN + DTO + เรียง + แบ่งหน้า

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=g-combined)

ตัวอย่างโจทย์: GET /items?q=Pe&page=1&limit=10&sort=price&direction=DESC

## 1. เปลี่ยนให้ตรงโจทย์

- `items` → ชื่อตารางใน SQL; `/items` → URL ในโจทย์
- `id` → คีย์จริง; ใน Postman เปลี่ยน `:id` เป็นค่าที่มีอยู่จริง
- `name` / `price` → ช่องที่โจทย์รับและส่ง เปลี่ยนทั้ง SQL, Body และการตรวจค่า
- `groups_table` / `group_id` → ตารางแม่และคีย์เชื่อมจริง

## 2. ใส่โค้ดตามไฟล์

เริ่มจากเทมเพลตว่าง: แทนเนื้อหา 3 ไฟล์ด้านล่าง

ครั้งแรกให้เปิด “ตั้งค่าครั้งแรก” ด้านล่างเพื่อเตรียมอีก 4 ไฟล์ก่อนรัน

มีงานข้อก่อนแล้ว: เพิ่มเฉพาะฟังก์ชันและ route โดยตั้งชื่อใหม่แทน `read`/`run` ให้ตรงกันทั้งสามชั้น เก็บโค้ดข้อก่อนและไม่ประกาศชื่อซ้ำ

### src/repositories-$id/repository.js

```js
import db from '../configs-$id/db-config.js';

// SQL identifiersเป็นค่าคงที่ในโค้ด; ใช้ ? กับค่าที่ผู้ใช้ส่งมา
export async function read(options) {
    const conditions = [];
    const values = [];
    if (options.name !== undefined) { conditions.push('i.name = ?'); values.push(options.name); }
    if (options.q !== undefined) { conditions.push('i.name LIKE ?'); values.push('%' + options.q + '%'); }
    const where = conditions.length ? ' WHERE ' + conditions.join(' AND ') : '';
    let sql = 'SELECT i.id, i.name, i.price, g.name AS group_name FROM items i LEFT JOIN groups_table g ON g.id = i.group_id' + where;
    // sortผ่านallowlistในserviceแล้ว ไม่แทรกreq.query.sortตรงๆ
    sql += ' ORDER BY ' + options.sort + ' ' + options.direction + ', i.id ASC';
    const [[count]] = await db.execute('SELECT COUNT(*) AS total FROM items i' + where, values);
    sql += ' LIMIT ? OFFSET ?';
    // query()รองรับตัวเลขLIMIT/OFFSET ที่ตรวจแล้วจากservice
    const [rows] = await db.query(sql, [...values, options.limit, options.offset]);
    return {rows, total: Number(count.total)};
}
```

### src/services-$id/service.js

```js
import * as repo from '../repositories-$id/repository.js';
import {AppError} from '../middlewares-$id/error-handler.js';

export async function run(query) {
    const options = {};
    if (query.name !== undefined) {
        if (typeof query.name !== 'string') throw new AppError('Invalid name', 400);
        options.name = query.name;
    }
    if (query.q !== undefined) {
        if (typeof query.q !== 'string') throw new AppError('Invalid q', 400);
        options.q = query.q;
    }
    const allowedSort = {id: 'i.id', name: 'i.name', price: 'i.price'};
    const sort = query.sort ?? 'id', direction = query.direction ?? 'ASC';
    if (typeof sort !== 'string' || !Object.hasOwn(allowedSort, sort) || !['ASC','DESC'].includes(direction))
        throw new AppError('Invalid sort/direction', 400);
    options.sort = allowedSort[sort];
    options.direction = direction;
    // ตัวอย่างนี้กำหนด default10/เพดาน100; เปลี่ยนสองค่านี้เมื่อโจทย์ระบุอื่น
    function positive(value, fallback) {
        if (value === undefined) return fallback;
        if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value)))
            throw new AppError('Invalid pagination', 400);
        return Number(value);
    }
    options.page = positive(query.page, 1);
    options.limit = Math.min(positive(query.limit, 10), 100);
    options.offset = (options.page - 1) * options.limit;
    if (!Number.isSafeInteger(options.offset)) throw new AppError('Page too large', 400);
    const result = await repo.read(options);
    // DTO: ซ้ายคือชื่อJSONตอบกลับ ขวาคือคอลัมน์SQL; เปลี่ยนให้ตรงResponseในโจทย์
    const data = result.rows.map(row => ({itemId: row.id, itemName: row.name, price: row.price, groupName: row.group_name}));
    const {page, limit} = options, total = result.total;
    return {data, pagination: {total, page, limit, totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total, hasPrevPage: page > 1}};
}
```

### src/routes-$id/route.js

```js
import express from 'express';
import * as service from '../services-$id/service.js';
import {apiResponse} from '../mappers-$id/api-response.js';
const router = express.Router();

router.get('/items', async (req, res) => {
    const result = await service.run(req.query);
    return apiResponse(res, result.data, result.pagination);
});

export default router;
```


:::details ตั้งค่าครั้งแรก: config, response, error handler และ app.js
เตรียมครั้งเดียว คงชื่อโฟลเดอร์ -$id ตามต้นฉบับ

`YOUR_DATABASE` → ชื่อฐานข้อมูล; `YOUR_MYSQL_PASSWORD` → รหัสผ่าน MySQL

`YOUR_STUDENT_ID` → รหัสใน URL ถ้าโจทย์ไม่มี prefix ให้เปลี่ยน `BASE` เป็น `''`

ถ้าไฟล์เดิมใช้งานได้แล้ว ให้เก็บ config และรวม imports/router แทนการคัดทับ app.js

### src/configs-$id/db-config.js

```js
import mysql from 'mysql2/promise';
// เปลี่ยน user/password/database ให้ตรงฐานข้อมูลที่นำเข้าในเครื่องตน
export default mysql.createPool({
    host: '127.0.0.1', port: 3306,
    user: 'root', password: 'YOUR_MYSQL_PASSWORD',
    database: 'YOUR_DATABASE',
    decimalNumbers: true, dateStrings: true
});
```

### src/mappers-$id/api-response.js

```js
// ค่าเริ่มต้นเป็น JSON ห่อ success/data; เปลี่ยนเฉพาะไฟล์นี้เมื่อโจทย์กำหนดรูปแบบอื่น
// status เป็นตัวที่4 ส่วน pagination เป็นตัวที่3 ตามเทมเพลตกลางภาค
export function apiResponse(res, data, pagination = null, status = 200) {
    const result = {success: true, data, timestamp: new Date().toISOString()};
    if (pagination) result.pagination = pagination;
    return res.status(status).json(result);
}
```

### src/middlewares-$id/error-handler.js

```js
// ใช้โยนข้อผิดพลาดที่คาดไว้จาก service เช่นไม่พบข้อมูล
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
export function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);
    let status = err.statusCode || err.status || 500;
    let message = err.message;
    // UNIQUE ซ้ำ เช่น SKU, อีเมล หรือ primary key
    if (err.code === 'ER_DUP_ENTRY') { status = 409; message = 'Duplicate value'; }
    // ข้อมูลอ้างอิงไม่มี เช่น publisher_id ที่ไม่มีในตารางแม่
    if (err.code === 'ER_NO_REFERENCED_ROW_2') { status = 400; message = 'Related record not found'; }
    // มีตารางลูกอ้างอิงอยู่ จึงลบไม่ได้
    if (err.code === 'ER_ROW_IS_REFERENCED_2') { status = 409; message = 'Record is in use'; }
    if (err.type === 'entity.parse.failed') { status = 400; message = 'Invalid JSON'; }
    if (status >= 500) { console.error(err); message = 'Internal server error'; }
    res.status(status).json({success: false, error: {message}});
}
```

### src/app.js

```js
import express from 'express';
import router from './routes-$id/route.js';
import {errorHandler} from './middlewares-$id/error-handler.js';
const app = express();
app.use(express.json()); // ต้องมาก่อน POST/PUT เพื่ออ่าน JSON Body
// เปลี่ยนรหัสจากโจทย์ ถ้าไม่มี prefix /api/รหัส ให้เปลี่ยน BASE เป็น ''
const BASE = '/api/YOUR_STUDENT_ID';
app.use(BASE, router);
// วางหลัง router เพื่อไม่ดัก URL ที่มีอยู่จริง
app.use((req, res) => res.status(404).json({success: false, error: {message: 'Route not found'}}));
app.use(errorHandler);
app.listen(Number(process.env.PORT || 3000), () => console.log('Ready'));
```

JSON ตัวอย่างห่อ success/data/timestamp เปลี่ยนตัวห่อหากโจทย์กำหนดแบบอื่น

- [เลือกรูปแบบ JSON ตอบกลับ](u-response.md)

:::

## 3. ทดสอบ

บันทึก → หยุดแอปเดิม → รันใหม่จากโฟลเดอร์ที่มี package.json

```text
node src/app.js
```
```text
GET http://localhost:3000/api/YOUR_STUDENT_ID/items?q=Pe&page=1&limit=10&sort=price&direction=DESC
```
เปลี่ยนรหัสและ URL ให้ตรงงาน; คีย์ใน URL ใช้ค่าจริง หากจะ PUT/DELETE ให้ใช้รายการที่ตนเพิ่มไว้

Postman: Body → none

ต้องได้: 200 พร้อมข้อมูล

หน้าเกินข้อมูล → []; page=0 หรือ limit=abc → 400; totalนับด้วยเงื่อนไขเดียวกับรายการ

:::details วิธีอื่นที่อาจต้องใช้
- [รวมหลายเงื่อนไข](u-combined.md)
- [เปลี่ยนรูปแบบ JSON](u-response.md)
- [ตรวจอีเมล วันที่ และ nullable](u-validation.md)
- [แก้ปัญหาตอนรัน](recovery.md)

:::
- [เลือกข้อถัดไป](u-main.md)
