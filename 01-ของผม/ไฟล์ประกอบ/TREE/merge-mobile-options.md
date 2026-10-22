# เพิ่มต่อจากงานเดิม: กรณีศึกษา: ไม่ส่งqueryคืนทั้งหมดและเลือกview

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=mobile-options)


ข้อที่ทำ: GET /products
ผลตอบตามกรณีนี้: ไม่ส่งทั้งคู่ไม่มีpagination; view summary/detail; viewอื่น400

## ก่อนเริ่ม
- [ยังไม่เคยเตรียมโครงCRUD: ทำครั้งแรกก่อน (แม้ทำข้อ2.1แล้ว)](base-mobile.md)
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
export async function findAll(pagination){
 // อ่านข้อมูลด้วย SQL; ค่าจาก request ส่งผ่าน placeholders ไม่ต่อเข้า SQL โดยตรง
 const sql='SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id ORDER BY p.id';
 const [rows]=pagination ? await db.query(sql+' LIMIT ? OFFSET ?',[pagination.limit,pagination.offset]) : await db.query(sql);
 // อ่านข้อมูลด้วย SQL; ค่าจาก request ส่งผ่าน placeholders ไม่ต่อเข้า SQL โดยตรง
 const [[{total}]]=await db.query('SELECT COUNT(*) AS total FROM products');rows.totalItems = Number(total);return rows;
}
```

### 3. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getAllObjects` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ข้อ2.3(1): อ่านสินค้าตาม pagination แล้วเลือก Summary DTO สำหรับรายการ
export async function getAllObjects(pagination,view='summary'){return mapper.maps(await repo.findAll(pagination),view);}
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

### 5. src/repositories-$id/repository.js
เพิ่มฟังก์ชัน/ตัวแปร `findOne` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// อ่านสินค้ารายตัวพร้อมชื่อแบรนด์สำหรับ Detail DTO ใช้ ? รับค่า id อย่างปลอดภัย
export async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}
```

### 6. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `existing` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ค้นหาสินค้าก่อน ถ้าไม่พบโยน 404 เพื่อให้ GET/PUT/DELETE ตอบตรงโจทย์
async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}
```

### 7. src/services-$id/service.js
เพิ่มฟังก์ชัน/ตัวแปร `getObject` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
// ข้อ2.3(2): ตรวจว่าสินค้ามีจริงแล้วแปลงเป็น Detail DTO
export async function getObject(id,view='detail'){const row=await existing(id);return view==='summary'?mapper.toSummaryDTO(row):mapper.toDetailDTO(row);}
```

### 8. src/routes-$id/route.js
เพิ่มฟังก์ชัน/ตัวแปร `optionalPagination` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
function optionalPagination(req,res,next){
 if(req.query.page===undefined&&req.query.limit===undefined){req.pagination=null;return next();}
 return queryParser()(req,res,next);
}
```

### 9. src/routes-$id/route.js
เพิ่มฟังก์ชัน/ตัวแปร `viewOf` หลังimports ก่อนหรือหลังฟังก์ชันอื่นได้ แต่ห้ามวางซ้อนในฟังก์ชันอื่น หากมีชื่อนี้แล้วแทนเฉพาะก้อนเดิม
```js
function viewOf(req,fallback){const view=req.query.view??fallback;if(view!=='summary'&&view!=='detail')throw new AppError('Invalid view',400,'VALIDATION_ERROR');return view;}
```

### 10. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.get('/products/:id',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
// รับ GET /products/:id หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/products/:id',async(req,res)=>apiResponse(res,await service.getObject(req.params.id,viewOf(req,'detail'))));
```

### 11. src/routes-$id/route.js
เพิ่มหรือแทนเฉพาะ `router.get('/products',...)` วางก่อน `export default router` ไม่เพิ่มซ้ำใต้ก้อนเดิมที่ตอบก่อน
```js
// รับ GET /products หลัง prefix; params มาจาก URL ส่วน body มาจาก JSON
router.get('/products',optionalPagination,async(req,res)=>{
 const objects = await service.getAllObjects(req.pagination,viewOf(req,'summary'));
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
ไม่ส่งqueryคืนทุกแถว; ?page=2ใช้limit10; ?view=detailมีbrandName; ?view=bad400

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-mobile-options.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
