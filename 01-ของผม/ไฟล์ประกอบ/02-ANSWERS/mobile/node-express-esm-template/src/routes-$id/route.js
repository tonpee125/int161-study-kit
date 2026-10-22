import express from 'express';
import * as service from '../services-$id/service.js';
import {apiResponse} from '../mappers-$id/api-response.js';
import {queryParser} from '../middlewares-$id/pagination-middleware.js';
const router=express.Router();
router.get('/brands',async(req,res)=>apiResponse(res,await service.getBrands()));
router.get('/brands/:id',async(req,res)=>apiResponse(res,await service.getBrand(req.params.id)));
router.get('/products',queryParser(),async(req,res)=>{
 const objects = await service.getAllObjects(req.pagination);
 await apiResponse(res, objects, req.pagination);
});
router.get('/products/:id',async(req,res)=>apiResponse(res,await service.getObject(req.params.id)));
router.post('/products',async(req,res)=>apiResponse(res,await service.createObject(req.body),null,201));
router.put('/products/:id',async(req,res)=>apiResponse(res,await service.updateObject(req.params.id,req.body)));
router.delete('/products/:id',async(req,res)=>{await service.removeObject(req.params.id);res.status(204).end();});
export default router;
