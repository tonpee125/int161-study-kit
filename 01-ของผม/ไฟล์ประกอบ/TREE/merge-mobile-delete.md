# เพิ่มต่อจากงานเดิม: กรณีศึกษา: ลบสินค้า204

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=mobile-delete)


ข้อที่ทำ: DELETE /products/:id
ผลตอบตามกรณีนี้: 204ไม่มีBody; ไม่มี404

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

## ไปต่อ
- [กลับตรวจเงื่อนไขข้อนี้](leaf-mobile-delete.md)
- [เลือกข้อถัดไป](start.md)
- [แก้ปัญหา](recovery.md)
