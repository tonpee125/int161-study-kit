# การเพิ่ม resource ในโปรเจกต์เดิม

เปิด04-ADD-RESOURCE.md มีตัวอย่างcountryต่อactorครบ: เพิ่มactor-repository.js,actor-service.js,actor-route.js แล้วimport+mountเพิ่มในapp.js ส่งGETของresourceเดิมซ้ำทุกครั้งเมื่อแก้helperกลาง หากสองข้อใช้responseคนละรูปห่อจริง ต้องออกแบบhelperตามสเปก ไม่คัดhelperข้ามชุดทับทั้งระบบ

## เลือกหัวข้อ

- [กลับเลือกโจทย์](start.md)
- [มีปัญหาหลังเพิ่ม](recovery.md)
