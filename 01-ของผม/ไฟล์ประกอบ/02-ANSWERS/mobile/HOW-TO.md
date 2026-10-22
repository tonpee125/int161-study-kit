# ใช้ชุด mobile บนเทมเพลตครู
ฐานคือ midterm-exam-esm-template.zip เดิม โฟลเดอร์ -$id คงตาม ZIP อย่าเปลี่ยนเป็น -guide
เปิดโปรเจกต์ 01-WORK/node-express-esm-template ไม่เปิดชุดสำเร็จแทนข้อสอบโดยไม่อ่านโจทย์

## กรณีเริ่มจากเทมเพลตว่าง ยังไม่มีข้อที่ทำไว้
1. ดูโจทย์ว่าตรงชุดนี้: brands/products ตามWeek8 PUTส่งบางช่องได้
2. เปิด CODE.md คัดโค้ดตามชื่อไฟล์จากหัวข้อไปวางในไฟล์ชื่อเดียวกันใน01-WORK
3. เรียงการวาง: config → error-handler → api-response → mapper → pagination(ถ้าใช้) → repository → service → route → app
4. เฉพาะ db-config.js ให้ใส่ค่าของเครื่องเอง อย่าคัดทับค่าที่คุณตั้งใช้ได้แล้ว; คง decimalNumbers/dateStrings ตามชุด
5. app.js ใส่รหัส/ชื่อของคุณตามสเปก อย่าใช้ YOUR_STUDENT_ID ส่งงาน; Sakila บทสอนใช้ /countries ไม่ใช้ prefixนักศึกษา
6. รัน node src/app.js ไม่ใช่ npm start เพราะ packageครูไม่มีstart
7. ส่ง Postman ตามตาราง 05-POSTMAN.md ในรากคู่มือ แล้วตรวจresponseตามโจทย์

## กรณีทำข้อก่อนแล้ว
ห้ามคัด app.js ทั้งไฟล์ ให้เพิ่ม import/mount ของข้อใหม่ เก็บ express.json/routerเดิม/error handlerท้ายสุด
ถ้าเป็นตารางเดียวกัน เพิ่มเฉพาะฟังก์ชัน/route ที่ต้องใช้ อย่าแทน service/repository ทั้งไฟล์จนข้อเดิมหาย
หากคนละตาราง ใช้การคัดไฟล์เพิ่มแบบactor: repository/service/routeของresourceใหม่ แล้วเปลี่ยนimportเฉพาะคู่นั้น
ตัวอย่างครบการเพิ่มresourceโดยไม่ลบของเดิมอยู่ 04-ADD-RESOURCE.md

## รายการต่างจากครู (ดู CHANGES.diff เพื่อเทียบบรรทัดก่อน/หลัง)
- `src/app.js`
- `src/configs-$id/db-config.js`
- `src/mappers-$id/api-response.js`
- `src/mappers-$id/entity-dto-mapper.js`
- `src/middlewares-$id/pagination-middleware.js`
- `src/repositories-$id/repository.js`
- `src/routes-$id/route.js`
- `src/services-$id/service.js`

เพิ่มไฟล์:
- `src/middlewares-$id/error-handler.js`

package.json และ package-lock.json คงไฟล์ครูทุกไบต์ ไม่มีdependencyเพิ่ม
ไฟล์ src/test-service.js เก็บตามต้นฉบับเพื่อเทียบ แต่มีคำสั่งลบรหัส26และimportที่ไม่ตรง ห้ามกดRunไฟล์นี้
