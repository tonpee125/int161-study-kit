import express from 'express';
import router from './routes-$id/route.js';
import {AppError, errorHandler} from './middlewares-$id/error-handler.js';
const app = express();
app.use(express.json());
// เช็กว่าแอปเปิดได้ ไม่ได้ยืนยันการเชื่อมฐานข้อมูล
app.get('/health', (req,res)=>res.json({success:true,message:'Server ready'}));
// รวมทุกข้อไว้ใต้ base path เดียว
app.use("/api/YOUR_STUDENT_ID", router);
// 404 และ error handler อยู่หลัง routes ทั้งหมด
app.use((req,res,next)=>next(new AppError('Route not found',404,'ROUTE_NOT_FOUND')));
app.use(errorHandler);
app.listen(Number(process.env.PORT || 3000), () => console.log('Ready'));
