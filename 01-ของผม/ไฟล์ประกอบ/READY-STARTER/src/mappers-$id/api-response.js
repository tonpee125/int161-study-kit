// ค่าเริ่มต้นเป็น JSON ห่อ success/data; เปลี่ยนเฉพาะไฟล์นี้เมื่อโจทย์กำหนดรูปแบบอื่น
// status เป็นตัวที่4 ส่วน pagination เป็นตัวที่3 ตามเทมเพลตกลางภาค
export function apiResponse(res, data, pagination = null, status = 200) {
    const result = {success: true, data, timestamp: new Date().toISOString()};
    if (pagination) result.pagination = pagination;
    return res.status(status).json(result);
}