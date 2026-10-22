# บทที่ 4 การลบข้อมูลด้วย DELETE

จุดสังเกต: บรรทัด Status / Response Status และ Response Body
“204 No Content” = ลบสำเร็จและตั้งใจไม่ส่งJSONกลับ
“200 OK พร้อม JSON” = ลบสำเร็จแต่ต้องส่งข้อความ/ข้อมูลตามตัวอย่าง
ใบงานWeek8ลบสินค้าใช้204 ส่วนWeek6ลบลูกค้าใช้200 ห้ามเลือกจากความเคยชิน
ตัวอย่างโจทย์: “ลบสินค้า สำเร็จ 204 No Content” → เลือก204; “Delete Customer สำเร็จ200พร้อมJSONข้อความ” → เลือก200

## เลือกหัวข้อ

- [โจทย์เขียน 204 No Content — เช่น “[DELETE] ลบสินค้า” ในWeek8](delete-204.md)
- [โจทย์เขียน 200 OK พร้อมข้อความ — เช่น “Delete Customer” ในWeek6](leaf-customer-delete.md)
- [ยังหา Status หรือ JSON ตัวอย่างไม่เจอ](unknown.md)
