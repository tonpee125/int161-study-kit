import {AppError} from './error-handler.js';
export const queryParser = () => (req,res,next) => {
 function positive(value,fallback){if(value===undefined)return fallback;if(typeof value!=='string'||! /^[1-9]\d*$/.test(value)||!Number.isSafeInteger(Number(value)))throw new AppError('Invalid pagination',400,'VALIDATION_ERROR');return Number(value);}
 const page=positive(req.query.page,1),limit=Math.min(positive(req.query.limit,10),100),offset=(page-1)*limit;
 if(!Number.isSafeInteger(offset))throw new AppError('Page too large',400,'VALIDATION_ERROR');
 req.pagination={page,limit,offset};next();
}
