# งานแรก — GET /countries บนเทมเพลตครู
โจทย์ฝึกนี้มาจากบทสอน Sakila ไม่ใช่ยืนยันว่าข้อสอบจริงใช้countryหรือฐานsakila
เป้าหมายรอบนี้: ใช้ app.js/route.js/service.js/repository.js ที่ครูให้แล้ว GET รายการได้
ไม่ต้องอ่านทั้งคู่มือก่อนทำ

## 1 เปิดโปรเจกต์ให้ถูก
เปิด01-WORK/node-express-esm-template ที่เห็นpackage.jsonกับsrc อย่าเปิดทั้งDesktopหรือเฉพาะsrc
รัน npm install ขณะอนุญาตให้ต่อเน็ต packageครูมี express,http-status,mysql2 ไม่มีstart script

## 2 เชื่อมฐานก่อน
เปิด src/configs-$id/db-config.js ของ01-WORK เปลี่ยนสี่ค่า db-host,db-username,db-password,database-name
ตัวอย่าง host localhost, userตามเครื่อง, passwordของMySQLเครื่องนั้น, database sakila
เปิด WebStorm Database → + → Data Source → MySQL ใช้ค่าเดียวกันกดTest Connection ต้องผ่าน
เปิด Query Console รัน SELECT country_id,country FROM sakila.country LIMIT 1;
ถ้าไม่มีsakilaให้ใช้SQLที่ครูให้หรือเตรียมSakilaก่อนฝึก อย่าเดาชื่อตารางหรือล้างฐานข้อมูลอื่น

## 3 เปิด repository.js ของครู — เปลี่ยนเฉพาะ findAll
เปิด src/repositories-$id/repository.js เปลี่ยน TABLE_NAME จาก table-name เป็น country
แทนฟังก์ชัน findAll เดิมด้วย:
```js
export async function findAll(pagination) {
    const [rows] = await db.query('SELECT * FROM country ORDER BY country_id');
    return rows;
}
```
ยังไม่ต้องแก้findOne/create/update/removeเพื่อทดสอบGETรายการ ถ้าจะทำเส้นเหล่านั้นเปิดชุดsakilaใน02-ANSWERS

## 4 เปิด service.js — ใช้ getAllObjects เดิมได้
src/services-$id/service.js มี getAllObjects เรียก await repo.findAll และ returnอยู่แล้ว ใช้ได้สำหรับรายการraw
รอบนี้ยังไม่ใช้getObjectซึ่งmapperต้นฉบับเป็นproduct DTO ไม่ใช่country

## 5 เปิด route.js — เปลี่ยนเฉพาะ GET /
ใน src/routes-$id/route.js แทนเฉพาะ router.get("/",...) ก้อนแรกด้วย:
```js
router.get('/', async (req, res) => {
    const objects = await service.getAllObjects();
    res.json(objects);
});
```
อย่าเพิ่มGET/ใหม่ซ้ำใต้ก้อนplaceholderเดิม เพราะก้อนแรกจะตอบก่อน

## 6 เปิด app.js — เปลี่ยน mount และเติม handler ว่าง
เปลี่ยน app.use('/', productRouter) เป็น app.use('/countries', productRouter)
แทน app.use((err,req,res,next)=>{}) ว่างด้วย:
```js
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({error: err.code || 'SERVER_ERROR', message: 'Request failed'});
});
```
นี่เป็นhandlerขั้นต่ำกันrequestค้างสำหรับGETแรก ไม่ใช่เฉลยerrorทุกกรณี; ชุดเต็ม02มีerror-handlerที่map404/400/409ตามโจทย์
app.listen3000เดิมเก็บไว้ ไม่เพิ่มserver.js ไม่listenซ้ำ

## 7 รันและตรวจ
Terminal Alt+F12 ที่รากโปรเจกต์ → node src/app.js
ต้องเห็น Example app listening on port 3000 ปล่อยTerminalนี้ทำงานอยู่
Postman desktop: GET http://localhost:3000/countries Body none → Send
ผล200และJSON arrayเทียบข้อมูลจริงในcountry ไม่ใช่ข้อความPlease write...
ถ้าerrorใช้06-RECOVERYตามข้อความ; ห้ามRun src/test-service.js

## 8 ต่อเส้นอื่นเมื่อGETแรกผ่าน
เปิด02-ANSWERS/sakila/HOW-TO.md และCODE.md เพื่อเติม GET/:id,POST,PUT,DELETE
แต่ละไฟล์ยังชื่อเดิมของครู เพิ่มactorเฉพาะเมื่อทำcountryผ่านแล้วตาม04-ADD-RESOURCE
