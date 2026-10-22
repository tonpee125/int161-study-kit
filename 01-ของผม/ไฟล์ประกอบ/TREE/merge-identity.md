# 2.1 ระบบระบุตัวตน — เพิ่มเฉพาะใน src/app.js

- [ทำข้อนี้ในโหมดสะสมโค้ด](STEP-BY-STEP.html?task=mobile-identity)

ใช้กับทั้งเทมเพลต Week8 และกลางภาค ข้อนี้ตอบข้อมูลประจำตัวจากสเปก ไม่อ่านตาราง MySQL และไม่ต้องเพิ่ม repository, service, mapper หรือ import ใหม่
คงโค้ดข้ออื่นในโปรเจกต์ไว้ ไม่แทน app.js ทั้งไฟล์

## 1. ตรวจรหัสที่ประกาศอยู่แล้ว

เปิด `src/app.js` หาบรรทัด `const ID = ...` เช่นใน ZIP Week8 ให้เปลี่ยนค่าเป็นรหัสในสเปกที่กำลังฝึก
ตัวอย่างรูปแบบบรรทัดนี้: แทน YOUR_STUDENT_ID ด้วยรหัสจริงก่อนรัน

```js
// เปลี่ยนเป็นรหัสในสเปกที่เลือก; รหัสนี้ต้องตรงกับ base path ใน Postman
const ID = 'YOUR_STUDENT_ID';
```

ถ้ามี const ID อยู่แล้ว ให้แก้บรรทัดเดิม ไม่ประกาศซ้ำ
ถ้าไม่มี ให้เพิ่มเพียงหนึ่งบรรทัดในระดับบนสุด ก่อน route ด้านล่าง
ถ้าใช้ตัวแปร studentId อยู่แล้ว ให้ใช้ชื่อนั้นแทน ID ในก้อน route ทั้งสองตำแหน่ง หรือใช้ ID ตามตัวอย่างให้ครบ อย่าใช้สลับกัน
เมื่อฝึกสเปก exam-spec-67130500001.md ใช้รหัส 67130500001; ถ้าใช้สเปกอีกไฟล์ให้ใช้รหัสของไฟล์นั้น

## 2. เพิ่ม route ก้อนนี้ในตำแหน่งที่กำหนด

วางหลัง `app.use(express.json())` และก่อน `app.listen(...)` รวมถึงก่อน middleware ที่ตอบ 404 หากมี
ไม่วางไว้ใน callback ของ app.listen หรือใน route อื่น
หากมี `/student-info` อยู่แล้ว ให้แทนเฉพาะ route นั้น ไม่เพิ่มซ้ำ
แทน YOUR_NAME และ YOUR_SECRET ด้วยค่าจากสเปกของตัวเอง

```js
// ข้อ2.1: routeระบุตัวตน ใช้ข้อมูลจากสเปกชุดเดียวกัน ไม่ต้อง query ฐานข้อมูล
app.get(`/api/${ID}/student-info`, (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            studentId: ID,
            name: 'YOUR_NAME',
            secretKey: 'YOUR_SECRET'
        },
        timestamp: new Date().toISOString()
    });
});
```

ใช้ก้อนนี้ได้โดยไม่อ้างไฟล์ `routes-$id` หรือ `apiResponse` เพราะใช้ Express ที่ app.js เดิมมีอยู่แล้ว
การเปิดแอปอาจยังต้องมี dependencies ของเทมเพลตครบ แต่ route นี้ไม่จำเป็นต้องต่อ DB เพื่อสร้าง response
ไม่ต้องแก้ mount ของ offices/productlines/products เพื่อทำข้อ 2.1

## 3. รันและส่ง Postman

บันทึก Ctrl+S หากแอปรันอยู่ให้ Ctrl+C ใน Terminal ของแอป แล้วรันใหม่จากรากโปรเจกต์:

```text
node src/app.js
```

Postman เลือก GET, Body none ใช้ URL ตามรหัสเดียวกับตัวแปร ID
สำหรับสเปก 67130500001 ที่กำลังฝึก:

```text
http://localhost:3000/api/67130500001/student-info
```

ต้องได้ HTTP 200 OK และ JSON แบบนี้ โดยชื่อ/ค่าลับต้องตรงสเปกที่ใช้ ไม่คัด placeholder ไปส่ง:

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

timestamp ในกล่องเป็นตัวอย่างรูปแบบเท่านั้น โค้ดด้านบนสร้างเวลาใหม่จริงทุกครั้ง อย่าพิมพ์วันตัวอย่างเป็นค่าคงที่

## ตรวจเมื่อยังไม่ผ่าน

- 404: เทียบรหัสใน URL กับ ID, ตรวจตำแหน่ง route ว่าอยู่ก่อนตัวตอบ404, แล้ว restart
- ชื่อหรือ secretKey ไม่ตรง: เทียบข้อมูลในสเปกไฟล์ที่กำลังฝึก ไม่ใช้ข้อมูลของอีกคน
- ID has already been declared: มี const ID ซ้ำ ให้เหลือการประกาศเดิมเพียงครั้งเดียว
- ID is not defined: ยังไม่ประกาศ ID หรือใช้ชื่อ studentId อยู่ ให้ใช้ชื่อตรงกัน
- Import ไม่พบ: ย้อนคืนการคัด app.js ทั้งชุดกลางภาคถ้าเผลอทำไป แล้วเพิ่มเฉพาะ route ตามหน้านี้ในไฟล์ Week8
- ไม่เห็นผลเปลี่ยน: บันทึกไฟล์และหยุดแอปเก่าก่อนเปิดใหม่

## อ่านต่อ

- [กลับไปตรวจสัญญาผลตอบของข้อ 2.1](leaf-identity.md)
- [ทำข้อถัดไป: GET รายการแบรนด์ทั้งหมด](leaf-brands-list.md)
- [กลับภาพรวมบทเรียน](start.md)
