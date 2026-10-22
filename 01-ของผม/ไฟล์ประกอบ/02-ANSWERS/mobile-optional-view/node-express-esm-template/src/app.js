// {student-id} - {student-name}
import express from 'express';
import productRouter from './routes-$id/route.js';
import {AppError,errorHandler} from './middlewares-$id/error-handler.js';
import {apiResponse} from './mappers-$id/api-response.js';
const app = express();
const studentId = 'YOUR_STUDENT_ID'; // เปลี่ยนเป็นของตนตามสเปก; ไม่ใช่ :studentId
app.use(express.json());
app.get('/api/' + studentId + '/student-info', (req,res) => apiResponse(res,{studentId,name:'YOUR_NAME',secretKey:'YOUR_SECRET'}));
app.use('/api/' + studentId, productRouter);
app.use((req,res,next) => next(new AppError('Route not found',404,'ROUTE_NOT_FOUND')));
app.use(errorHandler);
app.listen(Number(process.env.PORT || 3000), () => {
 console.log('Example app listening on port ' + (process.env.PORT || 3000));
});
