// ใช้โยนข้อผิดพลาดที่คาดไว้จาก service เช่นไม่พบข้อมูล
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
export function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);
    let status = err.statusCode || err.status || 500;
    let message = err.message;
    // UNIQUE ซ้ำ เช่น SKU, อีเมล หรือ primary key
    if (err.code === 'ER_DUP_ENTRY') { status = 409; message = 'Duplicate value'; }
    // ข้อมูลอ้างอิงไม่มี เช่น publisher_id ที่ไม่มีในตารางแม่
    if (err.code === 'ER_NO_REFERENCED_ROW_2') { status = 400; message = 'Related record not found'; }
    // มีตารางลูกอ้างอิงอยู่ จึงลบไม่ได้
    if (err.code === 'ER_ROW_IS_REFERENCED_2') { status = 409; message = 'Record is in use'; }
    if (err.type === 'entity.parse.failed') { status = 400; message = 'Invalid JSON'; }
    if (status >= 500) { console.error(err); message = 'Internal server error'; }
    res.status(status).json({success: false, error: {message}});
}