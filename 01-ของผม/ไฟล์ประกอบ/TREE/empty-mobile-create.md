# วิธีทำทีละส่วน: กรณีศึกษา: เพิ่มสินค้า autoID UNIQUE FK

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=mobile-create)


ข้อที่ทำ: POST /products
ผลตอบตามกรณีนี้: 201; SKUซ้ำ409; FKไม่มี400

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

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-mobile-create.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
