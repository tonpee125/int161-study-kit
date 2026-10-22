# 2. ตรวจ Node.js และติดตั้งแพ็กเกจ

เปิด Terminal ใน WebStorm ด้วย Alt+F12 ตรวจว่าตำแหน่งอยู่ในโฟลเดอร์ที่มี package.json
รันทีละคำสั่ง:
```text
node -v
npm -v
```
ต้องได้เลขเวอร์ชัน Node 18 ขึ้นไปสำหรับ Express5 หากไม่มีคำสั่งให้เตรียม Node หรือแจ้งปัญหาเครื่อง
จากนั้นรันขณะอนุญาตให้ใช้อินเทอร์เน็ต:
```text
npm install
```
รอจนจบ ไม่มี error และเห็น node_modules ไม่ต้องเพิ่ม library หรือ plugin นอกโจทย์
ถ้ามี dependencies ครบอยู่แล้ว ข้ามการติดตั้งได้ สำหรับ01-WORKในเครื่องนี้เคยติดตั้งไว้แล้ว แต่สำเนาWeek8ที่เพิ่งแตกใหม่ยังต้องตรวจเอง

## เลือกหัวข้อ

- [ติดตั้งสำเร็จ → ขั้น 3 ต่อ MySQL ใน WebStorm](prep-db.md)
- [Cannot find package / Node ใช้ไม่ได้](recover-node.md)
- [กลับภาพรวม](prepare.md)
