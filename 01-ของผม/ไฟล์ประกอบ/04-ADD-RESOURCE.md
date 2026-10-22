# ทำข้อใหม่โดยไม่ลบข้อที่ผ่าน — ตัวอย่างcountryต่อactor
ไฟล์ครู generic repository.js/service.js/route.js ใช้เป็นcountryชุดแรก เมื่อทำคนละตารางเพิ่มชื่อไฟล์ใหม่ได้

## เพิ่มเพียง3ไฟล์
1. คัด repositories-$id/repository.js → actor-repository.js เปลี่ยน TABLE_NAME=actor, KEYในWHERE=actor_id, writable first_name,last_name
2. คัด services-$id/service.js → actor-service.js เปลี่ยนimportไปactor-repository.js และตรวจfirst_name,last_name
3. คัด routes-$id/route.js → actor-route.js เปลี่ยนimportไปactor-service.js
4. ในapp.jsเพิ่ม import actorRouter from './routes-$id/actor-route.js';
5. เพิ่ม app.use('/actors',actorRouter); หลังexpress.jsonและก่อนnot-found/error handler
6. mount '/countries' เดิมอยู่ครบ เปิดCODEของsakilaเพื่อดูไฟล์ทั้งหกกับapp.jsที่รวมถูกแล้ว
7. restart → GET/countriesต้องยัง200 → POST/actors → PUT/actors/รหัสใหม่ → DELETE →GET404

## ถ้าครูให้prefixรหัสนักศึกษา
app.use('/api/รหัสตัวเอง/countries',productRouter) กับ app.use('/api/รหัสตัวเอง/actors',actorRouter)
routerภายในยัง / และ /:id ไม่เขียนprefixซ้ำสองชั้น
ตัวอย่างSakilaในบทสอนไม่มีprefixนี้ ต้องดูข้อสอบจริง

## ห้ามทำ
อย่าแทนrepository.jsของcountryด้วยSQLactorโดยยังmountcountryเดิม ไม่เช่นนั้น/countriesจะตอบactor
อย่าแทนapp.jsทั้งไฟล์เมื่อมีงานอื่นแล้ว คัดเฉพาะimportและmount
ไม่เพิ่มdependency ไม่เปลี่ยนฐานข้อมูล/constraintเพื่อหลบerror ไม่listenซ้ำ
