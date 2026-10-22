# เลือกJSONตอบกลับให้ตรงโจทย์

เลือกแบบที่ตรง JSON ในโจทย์ แล้วแทน src/mappers-$id/api-response.js ด้วยแบบนั้น

## ตอบ array/object ตรงๆ ไม่มีsuccess/data
```js
export function apiResponse(res, data, pagination = null, status = 200) {
    // หากโจทย์ต้องมีpaginationด้วย ให้ระบุชื่อช่องตามJSONในโจทย์
    return res.status(status).json(data);
}
```

## ตอบ status:'success' พร้อมdata

```js
export function apiResponse(res, data, pagination = null, status = 200) {
    return res.status(status).json({status: 'success', data});
}
```

## เพิ่มต้องตอบ201 ลบ204หรือ200

POSTส่งapiResponse(res,data,null,201) ตัวที่4คือstatus; DELETE204ใช้res.status(204).end() ไม่เรียกตัวห่อJSON; ถ้าโจทย์ลบ200พร้อมmessageใช้ตัวอย่างDELETE200

กรณีerrorต้องเปลี่ยนres.status(status).json(...)ในerror-handler.jsให้ชื่อช่องตรงตัวอย่างerrorของโจทย์ด้วย เช่น {status:'error',error:{code,message}} ต้องกำหนดcodeของแต่ละกรณีตามโจทย์ ไม่ถือว่าตัวอย่างsuccessกำหนดรูปerrorให้แล้ว

## DTO กับชื่อBodyไม่ใช่อย่างเดียวกัน

Bodyอาจเป็นstock_quantity แต่Responseเป็นstockQuantity ให้เปลี่ยนเฉพาะฝั่งDTO; ช่องจำเป็น จำนวนช่อง และชนิดข้อมูลต้องตรงสเปก
- [ดูDTO](u-dto.md)
- [ลบ200](u-delete-200.md)
- [ลบ204](u-delete-204.md)
- [กลับเลือกงาน](u-main.md)
