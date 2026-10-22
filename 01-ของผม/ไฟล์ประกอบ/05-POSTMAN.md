# ทดสอบด้วย Postman แบบอ่านผลเป็น
ใช้ desktop สร้าง HTTP request ได้แม้ไม่ได้บันทึก Collection หน้าตาแต่ละเวอร์ชันอาจต่างกัน ให้ฝึกแบบออฟไลน์ก่อนสอบ
1. เปิด request เลือก Method ให้ตรงโจทย์
2. ใส่ URL เต็ม เช่น http://localhost:3000/api/YOUR_STUDENT_ID/products เปลี่ยนรหัสเป็นของตัวเอง
3. GET รายการ: Params ใส่ page=1 และ limit=10 เฉพาะเมื่อมี pagination อย่าใส่ซ้ำใน URL กับตาราง Params
4. GET รายตัว: แทน :id ด้วยรหัสจริง Body none
5. POST/PUT: Body → raw → JSON ตรวจ Headers มี Content-Type: application/json
6. คัดเฉพาะ JSON จริง ห้าม comments, ... หรือ comma ตัวท้าย ตัวเลขไม่ใส่เครื่องหมายคำพูดหากโจทย์กำหนด number
7. กด Send ดู status + body + ข้อมูลจริง ไม่ดูแค่ 200
8. เมื่อแก้โค้ด Ctrl+C ที่ terminal ของแอปแล้วรันใหม่ เว้นแต่ใช้ watch ที่ทำงานอยู่จริง

## ลำดับทดสอบที่ใช้ซ้ำได้
GET รายการ → GET id ที่มี → GET id ที่ไม่มี → POST ใหม่ → จดรหัสที่ response คืน → GET รหัสนั้น → PUT รหัสนั้น → GET ยืนยันค่า → PUT ค่าเดิม → DELETE รหัสนั้น → GET รหัสนั้นต้อง 404 → DELETE ซ้ำตามสเปก
ใช้เฉพาะข้อมูลทดลองที่เพิ่มเอง อย่าคัดเลข 110 จากรูป ตัวเลขอาจข้ามเมื่อ insert ล้มเหลว

| ชุด | Request ทดสอบ | คาดหวัง |
|---|---|---|
| sakila | POST /countries body {"country":"GuidePractice"} | 201 และ result.country_id เก็บเลขไว้ |
| sakila | PUT /countries/รหัสใหม่ body {"country":"GuidePracticeUpdated"} | 200 ค่าเปลี่ยน |
| sakila | POST /actors body {"first_name":"Guide","last_name":"Practice"} | 201 เก็บ result.actor_id |
| classic | GET /api/รหัสตัวเอง/offices/NA | 200 ถ้ามีจริง ไม่มีก็ 404; ไม่บังคับแปลงเป็นเลข |
| classic | POST /api/รหัสตัวเอง/productlines body {"productLine":"GuidePractice","textDescription":"Practice"} | 201; ส่งซ้ำ 409; ส่งชื่อว่าง 400 |
| classic | POST /api/รหัสตัวเอง/customers/รหัสที่มี/payments body {"checkNumber":"GUIDE-001","paymentDate":"2026-01-01","amount":1} | 201; คู่เดิมซ้ำ 409; amount=0 → 400 |
| mobile | GET /api/รหัสตัวเอง/products?page=2&limit=10 | 200 page=2,limit=10 จำนวนข้อมูลไม่เกิน 10 |
| mobile | GET /api/รหัสตัวเอง/products/รหัสที่มี | detail มี brandName ไม่ใช่ summary |
| mobile | PUT /api/รหัสตัวเอง/products/รหัสทดลอง body {"name":"Changed","price":100,"stock_quantity":0} | 200 ช่องเดิมที่ไม่ได้ส่งยังอยู่ |

## ตรวจที่คนมักพลาด
- หน้า pagination ที่เกินข้อมูลต้องไม่ค้าง total ยังเป็นจำนวนทั้งหมด data=[]
- total=0 ต้องมี total=0 ไม่หายเพราะใช้ if(total)
- 204 body ต้องว่าง ไม่พยายามกด parse JSON
- error เป็น JSON ตามสเปก ไม่ใช่ HTML/stack trace
- JSON request อาจใช้ brand_id แต่ response ต้อง brandId จึงห้ามใช้ชื่อเดียวกันทั้งหมดโดยเดา
- ส่งซ้ำตรวจ UNIQUE จริงเฉพาะที่ schema/โจทย์กำหนด ชื่อ country ของ Sakila เดิมไม่ใช่ UNIQUE เสมอไป
- Collection ใช้เก็บ request เพื่อฝึกได้ แต่คู่มือนี้ไม่พึ่งการเข้าสู่ระบบ Postman หรือสคริปต์เลือกเฉลย
