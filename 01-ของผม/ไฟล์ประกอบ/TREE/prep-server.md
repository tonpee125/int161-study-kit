# 7. เปิด Express และเตรียม Postman

เปิดTerminalอีกหน้าต่างที่รากโปรเจกต์ ดูscriptsในpackage.json หากไม่มีstart ให้รันตรงตามเทมเพลต:
```text
node src/app.js
```
เมื่อเห็นlistening on port3000ให้ปล่อยTerminalนี้เปิดไว้ อย่ารันซ้ำจนเกิดEADDRINUSE
เห็นlisteningยืนยันว่าExpressเปิดได้ ไม่ยืนยันว่าAPIทุกเส้นถูกต้อง; ขั้นเชื่อมDBก่อนหน้านี้เป็นคนละการตรวจ
เปิดPostman desktop เตรียมHTTP requestตามข้อที่กำลังจะทำ GETใช้URLตามmountในapp.js เช่น /api/รหัสตัวเอง/brands ไม่ใช่รหัสตัวอย่างของผู้อื่น
ถ้าAPIยังไม่ได้เขียน อาจได้404/HTML/placeholder นั่นยังไม่ใช่หลักฐานว่าDBเสีย ให้ไปทำendpointตามโจทย์ก่อน
POST/PUTใช้Body→raw→JSON, Content-Type application/json; หลังแก้โค้ดหยุดด้วยCtrl+Cแล้วรันใหม่ หากไม่ได้ใช้ระบบwatch

## เลือกหัวข้อ

- [เซิร์ฟเวอร์เปิดได้ → ตรวจรายการพร้อมเริ่ม](prep-done.md)
- [พอร์ตชน / รันแอปไม่ได้](recover-node.md)
- [Postmanต่อไม่ถึงหรือURLผิด](recover-http.md)
