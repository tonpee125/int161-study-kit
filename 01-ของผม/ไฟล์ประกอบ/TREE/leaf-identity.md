# กรณีศึกษา: ข้อมูลประจำตัว

จุดสังเกตในข้อกำหนด: Method & URI / Endpoint, Request Body, Response Status และ JSON ตัวอย่าง
ยืนยันก่อนใช้: GET student-info • 200 success/data/timestamp ใหม่
Body: none
Postmanตรวจ: ใส่studentId/name/secretKeyของตนตามสเปก ไม่ใช้ของเพื่อน; เทียบชื่อkeyให้ตรง
ก่อนนำไปใช้ ให้เทียบชื่อช่องและสถานะกับใบงานของคุณอีกครั้ง ไม่ใช้รหัสนักศึกษาหรือค่าลับของคนอื่น
ตัวอย่าง Response — HTTP 200 OK:
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
แทนค่าทั้งสามช่องด้วยข้อมูลของตนจากสเปก ส่วน timestamp ในกล่องเป็นเพียงตัวอย่างรูปแบบ โค้ดจริงต้องสร้างเวลาปัจจุบันด้วย new Date().toISOString() ทุกครั้งที่ตอบ

ข้อ 2.1 เพิ่มเฉพาะ route ใน src/app.js เดิม ไม่คัด app.js ทั้งชุด ไม่ต้องเพิ่ม repository/service/mapper และใช้ได้ทั้งWeek8กับกลางภาค
ฐานของคำตอบนี้คือเทมเพลตกลางภาคชุดเดียว แม้โจทย์มาจากWeek8/Week6 ใช้ไฟล์-$idตามคู่มือ ไม่คัดชื่อไฟล์จากZIPอีกชุดมาใช้สลับกัน

## เลือกหัวข้อ

- [เปิดขั้นตอนเพิ่ม route ใน app.js เดิม — ข้อนี้ไม่อ่านฐานข้อมูล](empty-identity.md)
- [มีงานข้อก่อนแล้ว — เพิ่มเฉพาะ route นี้โดยเก็บงานเดิม](merge-identity.md)
- [ข้อมูลไม่ตรงโจทย์ กลับเลือกใหม่](start.md)
