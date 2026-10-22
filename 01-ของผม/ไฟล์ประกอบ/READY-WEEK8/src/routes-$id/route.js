import express from 'express';
import * as services from '../services-$id/service.js';
import {AppError} from '../middlewares-$id/error-handler.js';
import {apiResponse as defaultResponse} from '../mappers-$id/api-response.js';
import {queryParser as pagination_ee99584864} from '../middlewares-$id/step-pagination-ee99584864.js';
import {apiResponse as response_8484156d0b} from '../mappers-$id/step-response-8484156d0b.js';

const router = express.Router();

// ข้อ 1: ระบุตัวตน ไม่อ่านฐานข้อมูล
router.get("/student-info", (req, res) => res.status(200).json({
    success: true,
    data: {
    "studentId": "YOUR_STUDENT_ID",
    "name": "YOUR_NAME",
    "secretKey": "YOUR_SECRET"
},
    timestamp: new Date().toISOString()
}));
// ข้อ 2: อ่านแบรนด์ทั้งหมด
{
const service = services.task2;
const apiResponse = response_8484156d0b;
const queryParser = pagination_ee99584864;
router.get('/brands',async(req,res)=>apiResponse(res,await service.getBrands()));
}

// ข้อ 4: สินค้ารายการแบ่งหน้า Summary DTO
{
const service = services.task4;
const apiResponse = response_8484156d0b;
const queryParser = pagination_ee99584864;
router.get('/products',queryParser(),async(req,res)=>{
 const objects = await service.getAllObjects(req.pagination);
 await apiResponse(res, objects, req.pagination);
});
}

// ข้อ 6: เพิ่มสินค้า autoID UNIQUE FK
{
const service = services.task6;
const apiResponse = response_8484156d0b;
const queryParser = pagination_ee99584864;
router.post('/products',async(req,res)=>apiResponse(res,await service.createObject(req.body),null,201));
}

// ข้อ 3: อ่านแบรนด์รายตัว
{
const service = services.task3;
const apiResponse = response_8484156d0b;
const queryParser = pagination_ee99584864;
router.get('/brands/:id',async(req,res)=>apiResponse(res,await service.getBrand(req.params.id)));
}

// ข้อ 5: รายละเอียดสินค้า JOIN Detail DTO
{
const service = services.task5;
const apiResponse = response_8484156d0b;
const queryParser = pagination_ee99584864;
router.get('/products/:id',async(req,res)=>apiResponse(res,await service.getObject(req.params.id)));
}

// ข้อ 7: แก้สินค้าแบบส่งบางช่อง
{
const service = services.task7;
const apiResponse = response_8484156d0b;
const queryParser = pagination_ee99584864;
router.put('/products/:id',async(req,res)=>apiResponse(res,await service.updateObject(req.params.id,req.body)));
}

// ข้อ 8: ลบสินค้า204
{
const service = services.task8;
const apiResponse = response_8484156d0b;
const queryParser = pagination_ee99584864;
router.delete('/products/:id',async(req,res)=>{await service.removeObject(req.params.id);res.status(204).end();});
}

export default router;
