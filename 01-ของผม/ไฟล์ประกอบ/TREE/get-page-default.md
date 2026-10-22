# 1.1.3 ข้อมูลสรุปในรายการสินค้า

จุดสังเกต: รายการ “Summary DTO” ใต้ข้อแบ่งหน้า
DTO ในข้อนี้หมายถึงเลือกช่องข้อมูลที่จะตอบกลับ และอาจเปลี่ยนชื่อช่อง ไม่ได้หมายถึงให้สร้างฐานข้อมูลใหม่
ในใบงาน Mobile มี7ช่อง: id, sku, name, brandId (หรือ brand_id ตามสเปก), category, price, status; ถ้ารายชื่อไม่ตรงอย่าคัดทั้งชุดโดยไม่ปรับ
ตัวอย่างโจทย์: รายการฟิลด์ในข้อ Summary DTO มี id, sku, name, brandId, category, price, status → เลือกชุด Mobile Week8; ถ้ารายชื่อช่องต่างให้เลือกทางตารางหรือช่องอื่น

## เลือกหัวข้อ

- [ตรงใบงานสินค้า Mobile Week8 — มี id / sku / name / brandId / category / price / status](leaf-mobile-page.md)
- [ตารางอื่น หรือรายชื่อช่องตอบกลับต่างจากนี้](adapt.md)
