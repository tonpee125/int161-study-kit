import express from 'express';
import * as service from '../services-$id/service.js';
import {apiResponse} from '../mappers-$id/api-response.js';
import {AppError} from '../middlewares-$id/error-handler.js';
import {queryParser} from '../middlewares-$id/pagination-middleware.js';
const router=express.Router();
router.get('/brands',async(req,res)=>apiResponse(res,await service.getBrands()));
router.get('/brands/:id',async(req,res)=>apiResponse(res,await service.getBrand(req.params.id)));
function optionalPagination(req,res,next){
 if(req.query.page===undefined&&req.query.limit===undefined){req.pagination=null;return next();}
 return queryParser()(req,res,next);
}
function viewOf(req,fallback){const view=req.query.view??fallback;if(view!=='summary'&&view!=='detail')throw new AppError('Invalid view',400,'VALIDATION_ERROR');return view;}
router.get('/products',optionalPagination,async(req,res)=>{
 const objects = await service.getAllObjects(req.pagination,viewOf(req,'summary'));
 await apiResponse(res, objects, req.pagination);
});
router.get('/products/:id',async(req,res)=>apiResponse(res,await service.getObject(req.params.id,viewOf(req,'detail'))));
router.post('/products',async(req,res)=>apiResponse(res,await service.createObject(req.body),null,201));
router.put('/products/:id',async(req,res)=>apiResponse(res,await service.updateObject(req.params.id,req.body)));
router.delete('/products/:id',async(req,res)=>{await service.removeObject(req.params.id);res.status(204).end();});
export default router;
