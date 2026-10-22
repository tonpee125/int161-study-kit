# เปลี่ยนกฎตรวจ Body ให้ตรงช่องในโจทย์

วางฟังก์ชันใน src/services-$id/service.js หลังimports แล้วเรียกภายในvalidate(data) ก่อนrepository ไม่จำเป็นต้องเพิ่มกฎที่โจทย์ไม่ได้กำหนด หากเพิ่มฟิลด์ใหม่ต้องเติมในรายการที่เลือกจากBodyและSQLด้วย

## ตัวอย่างฟังก์ชันตรวจหลายชนิด
```js
// ต้องมี import {AppError} from '../middlewares-$id/error-handler.js'; ด้านบนอยู่แล้ว
function requireEmail(value) {
    // เป็นตัวอย่างกฎรูปแบบเบื้องต้น ไม่ใช่ตรวจว่าอีเมลมีผู้ใช้งานจริง
    if (typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        throw new AppError('Invalid email', 400);
}
function requireDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value))
        throw new AppError('Expected YYYY-MM-DD', 400);
    const date = new Date(value + 'T00:00:00Z');
    // ป้องกันวันที่ล้นเดือน เช่น2026-02-30 ที่Dateอาจปรับให้อัตโนมัติ
    if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0,10) !== value)
        throw new AppError('Invalid calendar date', 400);
}
function requireStatus(value) {
    // เปลี่ยนรายการนี้ตามenumหรือค่าที่อนุญาตจริงในโจทย์
    if (!['AVAILABLE','DISCONTINUED'].includes(value))
        throw new AppError('Invalid status', 400);
}
function requireStock(value) {
    // 0ใช้ได้ ไม่ตรวจแบบ if(!value) เพราะจะปฏิเสธ0ด้วย
    if (!Number.isSafeInteger(value) || value < 0)
        throw new AppError('Invalid stock', 400);
}
```

## ตัวอย่างจุดเรียก

```js
// ตัวอย่างส่วนที่เติมภายใน validate(data) เดิม ไม่ใช่เพิ่มvalidateซ้ำชื่อ
// requireEmail(data.email);
// requireDate(data.release_date);
// requireStatus(data.status);
// requireStock(data.stock_quantity);
// กรณีnullable: ข้ามเฉพาะเมื่อโจทย์อนุญาตnullจริง
// if (data.release_date !== null) requireDate(data.release_date);
```

## ไม่ส่งค่า / null / 0 / สตริงว่าง ต่างกัน

ไม่ส่งค่าในPUTบางช่อง: เก็บค่าเดิมด้วย {...old,...body}; ส่งnull: ถือว่าตั้งเป็นnull ต้องอนุญาตตามโจทย์และSQL; ส่ง0: ตัวเลขที่ถูกต้องถ้ากฎยอมรับ; ส่งข้อความว่าง: ตัดสินตามช่องนั้น อย่าใช้ || เติมค่าเริ่มต้นจน0หรือสตริงว่างถูกเปลี่ยนโดยไม่ตั้งใจ

รหัสข้อความในURLไม่ต้องNumber() แต่ช่องตัวเลขในBodyควรเป็นตัวเลขJSONจริง ไม่แปลงข้อความผิดรูปแบบอย่าง12abcด้วยparseInt
- [แก้บางช่อง](u-put-partial.md)
- [เพิ่มข้อมูลลูกและตรวจFK](u-post-child.md)
- [เพิ่มSKUไม่ซ้ำ](u-post-unique.md)
- [กลับเลือกงาน](u-main.md)
