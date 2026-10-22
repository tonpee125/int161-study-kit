# เปิดตามอาการ — ทางรับมือปัญหา
| อาการ | แยกอย่างไร | ตรวจ/แก้ตามลำดับ |
|---|---|---|
| Cannot find package express/mysql2 | แอปยังเริ่มไม่ได้ | เปิด terminal ที่มี package.json → ดู node_modules → เตรียม dependencies ขณะอนุญาตให้ต่อเน็ต |
| Missing script: start | package.json ไม่มี start | ใช้คำสั่ง entry ที่มีจริง ใช้ node src/app.js |
| Cannot use import / require is not defined | ESM ไม่ตรง | type:module, import/export, .js; ห้ามผสม module.exports จากใบงานโดยไม่แปลง |
| ERR_MODULE_NOT_FOUND ชี้ไฟล์ใน src | import ผิด | ชื่อไฟล์/โฟลเดอร์/-$id/.js/ตัวพิมพ์เล็กใหญ่ ให้ตรงจริง |
| EADDRINUSE 3000 | มีแอปฟังพอร์ตอยู่ | หยุด instance ที่คุณรันใน Run/Terminal แล้วรันตัวที่ถูก ห้ามปิด process อื่นแบบเดา |
| Could not send request พอร์ต 3000 | ยังไม่มี HTTP response | แอปหยุด/พอร์ตผิด → ดู terminal → เปิดแอป → ส่งใหม่ |
| JSON 500 มี ECONNREFUSED DB | Express รับได้แต่ DB ไม่ได้ | MySQL ทำงานหรือไม่ host/port ใน db-config ถูกหรือไม่ |
| Access denied | ติดต่อ DB ถึงแต่เข้าไม่ได้ | user/password และสิทธิ์; ใช้ค่าที่ผู้คุมแจ้ง ห้ามล้างหรือ reset DB เครื่องสอบเอง |
| Unknown database / Table doesn't exist | schema ไม่ตรง | ตรวจ database ใน config และรัน SQL ที่โจทย์ให้กับ target ถูกตัว |
| Unknown column id | คีย์ชื่ออื่น | ดู PRIMARY KEY เปลี่ยน WHERE ของ find/update/delete ให้ครบ |
| Unknown column name | Body/SQL ใช้ชื่อผิด | เทียบชื่อคอลัมน์จริงกับ request และการแปลงชื่อ ห้ามแก้ DTO จน DB ผิด |
| HTML Cannot GET | Method/path ไม่ตรง | prefix รหัสตัวเอง, พหูพจน์, mount router, ลำดับ route แล้ว restart |
| POST body undefined | parser ไม่อ่าน | Postman raw JSON + header + express.json ก่อน route |
| 400 JSON syntax | JSON ไม่ถูก | เอา comments/comma ท้ายออก key ใช้ double quotes |
| request หมุนไม่จบ | ไม่ตอบ/ไม่ next | middleware ทุกทางต้อง next หรือส่ง response; อย่าปล่อย error handler ว่างแบบ template |
| ได้ {} / Promise | ลืม await | route → service → repo ทุกชั้นคืนค่าที่ resolve แล้ว |
| แก้แล้วค่าไม่เปลี่ยน | ส่งต่อไม่ครบ/แอปเก่า | route ส่ง id+body; service ส่งต่อ; WHERE ถูก; restart; GET อ่านกลับ |
| PUT ค่าเดิมกลายเป็น404 | ตัดสินจาก affectedRows | findOne ตรวจการมีอยู่ก่อน อย่าใช้จำนวนแถวเปลี่ยนตัดสินอย่างเดียว |
| ER_DUP_ENTRY 1062 | PK/UNIQUE ซ้ำ | อ่านคีย์ที่โจทย์กำหนด → handler409 → ทดสอบค่าที่ไม่ซ้ำ อย่าลบ constraint |
| ER_NO_REFERENCED_ROW_2 1452 | FK ชี้แม่ไม่มี | ตรวจ id แม่ที่มีจริง/nullable; Week6 กำหนด400 |
| ER_ROW_IS_REFERENCED_2 1451 | ข้อมูลลูกยังอ้างอิง | ตอบตามสเปก; อย่าเปลี่ยน FK หรือลบลูกทั้งหมดเพื่อให้ผ่าน |
| page2 ข้ามแถว | offset ผิด | offset=(page-1)*limit หลังปรับ limit แล้ว |
| total เท่าจำนวนหน้านี้ | COUNT ผิด | query COUNT แยกและใช้ WHERE เดียวกับ filter |
| total หายเมื่อไม่มีข้อมูล | เช็ก truthy | ใช้ total !== undefined; 0 เป็นค่าถูกต้อง |
| timestamp ไม่ผ่าน | คัดเวลาคงที่/รูปแบบผิด | new Date().toISOString() ตอนสร้าง response ถ้าสเปกระบุ ISO |
| date เลื่อนไปหนึ่งวัน | timezone | DATE เก็บเป็น YYYY-MM-DD; config dateStrings:true; อย่าสุ่มตัด ISO หลังเปลี่ยน timezone |
| ทดสอบ repo เสร็จแต่ไม่จบ | pool ยังเปิด | script ทดสอบใช้ finally await db.end(); อย่า end pool ใน request ของ server |
| grader ผ่านบางข้อ | ตัวตรวจไม่ครอบคลุมทุกอย่าง | เปิดข้อแรกที่ fail เทียบ contract; ทดสอบเส้นอื่นซ้ำหลังแก้ helper |

## กรณีที่ไม่ได้เตรียมไว้ตรงตัว
1. จดสิ่งที่ต่างจากตัวอย่างเพียงจุดเดียว เช่น ชื่อคีย์หรือ status
2. แยกว่าต่างที่ DB, validation, route หรือ response อย่าแก้ทุกชั้นพร้อมกัน
3. เปลี่ยนจุดนั้นแล้วส่ง request เล็กที่สุดที่พิสูจน์ได้
4. ถ้ายังไม่เข้าใจสเปกหรือเป็นปัญหาเครื่อง ให้ถามผู้คุมตามกติกา ไม่พึ่ง AI/อินเทอร์เน็ตระหว่างสอบ
5. เก็บส่วนที่ผ่านไว้ สำรองก่อนเปลี่ยนหลายไฟล์ อย่าแทนทั้งโปรเจกต์ด้วยอีกชุดเมื่อทำไปแล้วหลายข้อ

## ปิดงาน
บันทึกทุกไฟล์ ตรวจรหัส/URL ของตัวเอง เปิด ZIP ตรวจว่ามี src และ package.json ไม่มีโฟลเดอร์ซ้อนผิดชั้น ส่งชื่อ/รูปแบบตามข้อสอบ ไม่รวม node_modules หากครูระบุให้ตัดออก
ห้ามรัน SQL เริ่มต้นซ้ำช่วงท้ายโดยไม่ดู DROP เพราะอาจล้างงานทดลองและข้อมูลที่ต้องใช้
