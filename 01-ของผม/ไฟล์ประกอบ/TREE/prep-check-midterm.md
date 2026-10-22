# 6. ตรวจว่า Node.js อ่านฐานข้อมูลได้จริง — กลางภาค

สร้างไฟล์ src/check-db.js ในโปรเจกต์ฝึก แล้วใส่โค้ดอ่านอย่างเดียวนี้ importต้องตรงโฟลเดอร์ที่เลือก
```js
// ใช้ pool ที่ตั้งค่า MySQL ของเครื่องตนใน db-config.js
import db from './configs-$id/db-config.js';

try {
    const [rows] = await db.query(
        // อ่านข้อมูลด้วย SQL; ค่าจาก request ส่งผ่าน placeholders ไม่ต่อเข้า SQL โดยตรง
        'SELECT 1 AS connected, DATABASE() AS databaseName'
    );
    console.log(rows);
} catch (err) {
    console.error(err.code, err.message);
    process.exitCode = 1;
} finally {
    await db.end();
}
```
ที่Terminalรากโปรเจกต์รัน:
```text
node src/check-db.js
```
ต้องเห็นconnected:1และdatabaseNameตรงงาน เช่นmobile_distributor; แค่ออกเลข1แต่ชื่อฐานผิดยังไม่ผ่าน
สคริปต์นี้ไม่เพิ่ม/แก้/ลบข้อมูล และจบpoolเมื่อทำงานเสร็จ อย่าเอาdb.end()ไปวางท้ายrequestในserver
หากCannot find moduleตรวจimportและ.js หากAccess denied/Unknown database/ECONNREFUSEDตรวจconfigกับMySQLก่อน
check-db.jsเป็นไฟล์ตรวจชั่วคราวที่เพิ่มเพื่อฝึก ไม่ใช่ไฟล์ต้นฉบับของครู จะเก็บไว้หรือเอาออกก่อนส่งให้ยึดข้อกำหนดงาน

## เลือกหัวข้อ

- [connected=1 และชื่อฐานถูก → ขั้น 7 รันเซิร์ฟเวอร์](prep-server.md)
- [การเชื่อมต่อไม่ผ่าน → ตรวจฐานข้อมูล](recover-db.md)
- [importหรือpackageไม่พบ](recover-node.md)
