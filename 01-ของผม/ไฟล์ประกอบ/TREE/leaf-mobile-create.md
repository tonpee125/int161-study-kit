# กรณีศึกษา: เพิ่มสินค้า autoID UNIQUE FK

จุดสังเกตในข้อกำหนด: Method & URI / Endpoint, Request Body, Response Status และ JSON ตัวอย่าง
ยืนยันก่อนใช้: POST /products • 201; SKUซ้ำ409; FKไม่มี400
ตัวอย่าง Request Body (JSON):
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
Postmanตรวจ: POST201จดdata.id; SKUเดิม409; brand_idไม่มี400; ช่องขาด400
ก่อนนำไปใช้ ให้เทียบชื่อช่องและสถานะกับใบงานของคุณอีกครั้ง ไม่ใช้รหัสนักศึกษาหรือค่าลับของคนอื่น
ฐานของคำตอบนี้คือเทมเพลตกลางภาคชุดเดียว แม้โจทย์มาจากWeek8/Week6 ใช้ไฟล์-$idตามคู่มือ ไม่คัดชื่อไฟล์จากZIPอีกชุดมาใช้สลับกัน

## เลือกหัวข้อ

- [ยังไม่ได้ทำข้อไหน — เปิดวิธีเติมไฟล์ครูจากเทมเพลตว่าง](empty-mobile-create.md)
- [ทำข้อก่อนแล้ว — เปิดวิธีเพิ่มส่วนนี้โดยเก็บงานเดิม](merge-mobile-create.md)
- [ข้อมูลไม่ตรงโจทย์ กลับเลือกใหม่](start.md)
- [ครั้งแรกของงานนี้: เตรียมโครงกลางภาคก่อน](base-mobile.md)
