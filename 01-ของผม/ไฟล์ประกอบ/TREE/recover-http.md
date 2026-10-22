# ปัญหา Route และ Request Body

ตรวจMethod+URL+prefix+พหูพจน์ แล้วrestartหลังแก้โค้ด Postman POST/PUTใช้Body raw JSONและContent-Type application/json; express.jsonต้องก่อนrouter ทุกmiddlewareต้องตอบหรือnext ห้ามปล่อยerrorhandlerว่างเหมือนต้นฉบับ

## เลือกหัวข้อ

- [กลับเลือกMethod](start.md)
- [ผลตอบกลับแล้วแต่รูปแบบผิด](recover-contract.md)
