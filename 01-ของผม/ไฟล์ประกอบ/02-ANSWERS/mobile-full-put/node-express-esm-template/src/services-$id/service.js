import * as repo from '../repositories-$id/repository.js';
import mapper from '../mappers-$id/entity-dto-mapper.js';
import {AppError} from '../middlewares-$id/error-handler.js';
const required=['sku','name','brand_id','category','price','ram_gb','storage_gb','color'];
const writable=[...required,'stock_quantity','status','release_date'];
function fail(message){throw new AppError(message,400,'VALIDATION_ERROR');}
function object(body){if(!body||typeof body!=='object'||Array.isArray(body))fail('JSON object required');}
function pick(body){object(body);const data={};for(const key of writable)if(Object.hasOwn(body,key))data[key]=body[key];return data;}
function validate(p){
 for(const key of required)if(p[key]===undefined||p[key]===null)fail(`Field '${key}' is required`);
 for(const key of ['sku','name','category','color','status'])if(typeof p[key]!=='string'||!p[key].trim())fail(`Invalid ${key}`);
 for(const key of ['brand_id','ram_gb','storage_gb'])if(!Number.isSafeInteger(p[key])||p[key]<=0)fail(`Invalid ${key}`);
 if(typeof p.price!=='number'||!Number.isFinite(p.price)||p.price<0)fail('Invalid price');
 if(!Number.isSafeInteger(p.stock_quantity)||p.stock_quantity<0)fail('Invalid stock_quantity');
 if(p.release_date!==null){const s=p.release_date,d=new Date(s+'T00:00:00Z');if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s)||!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==s)fail('Invalid release_date');}
 return p;
}
async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}
export const getBrands=()=>repo.brands();
export async function getBrand(id){const row=await repo.brand(id);if(!row)throw new AppError('Brand not found',404,'BRAND_NOT_FOUND');return row;}
export async function getAllObjects(pagination){return mapper.maps(await repo.findAll(pagination),'summary');}
export async function getObject(id){return mapper.toDetailDTO(await existing(id));}
export async function createObject(body){const data=validate({stock_quantity:0,status:'AVAILABLE',release_date:null,...pick(body)});return mapper.toDetailDTO(await repo.create(data));}
export async function updateObject(id,body){
 const old=await existing(id);object(body);for(const key of required)if(!Object.hasOwn(body,key))fail(`Field '${key}' is required`);const patch=pick(body);if(!Object.keys(patch).length)fail('No writable fields');
 const data=validate({...pick(old),...patch});return mapper.toDetailDTO(await repo.update(id,data));
}
export async function removeObject(id){await existing(id);await repo.remove(id);}
