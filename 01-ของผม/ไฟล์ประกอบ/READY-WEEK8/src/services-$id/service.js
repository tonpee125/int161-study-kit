import * as repositories from '../repositories-$id/repository.js';
import {AppError} from '../middlewares-$id/error-handler.js';
import mapper_7e45bb3d1f from '../mappers-$id/step-mapper-7e45bb3d1f.js';

// ข้อ 2: อ่านแบรนด์ทั้งหมด
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task2 = (() => {
    const repo = repositories.task2;
    const mapper = mapper_7e45bb3d1f;
    const getBrands=()=>repo.brands();
    return {getBrands};
})();

// ข้อ 3: อ่านแบรนด์รายตัว
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task3 = (() => {
    const repo = repositories.task3;
    const mapper = mapper_7e45bb3d1f;
    async function getBrand(id){const row=await repo.brand(id);if(!row)throw new AppError('Brand not found',404,'BRAND_NOT_FOUND');return row;}
    return {getBrand};
})();

// ข้อ 4: สินค้ารายการแบ่งหน้า Summary DTO
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task4 = (() => {
    const repo = repositories.task4;
    const mapper = mapper_7e45bb3d1f;
    async function getAllObjects(pagination){return mapper.maps(await repo.findAll(pagination),'summary');}
    return {getAllObjects};
})();

// ข้อ 5: รายละเอียดสินค้า JOIN Detail DTO
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task5 = (() => {
    const repo = repositories.task5;
    const mapper = mapper_7e45bb3d1f;
    async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}

    async function getObject(id){return mapper.toDetailDTO(await existing(id));}
    return {getObject};
})();

// ข้อ 6: เพิ่มสินค้า autoID UNIQUE FK
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task6 = (() => {
    const repo = repositories.task6;
    const mapper = mapper_7e45bb3d1f;
    async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}

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

    async function createObject(body){const data=validate({stock_quantity:0,status:'AVAILABLE',release_date:null,...pick(body)});return mapper.toDetailDTO(await repo.create(data));}
    return {createObject};
})();

// ข้อ 7: แก้สินค้าแบบส่งบางช่อง
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task7 = (() => {
    const repo = repositories.task7;
    const mapper = mapper_7e45bb3d1f;
    async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}

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

    async function updateObject(id,body){
     const old=await existing(id),patch=pick(body);if(!Object.keys(patch).length)fail('No writable fields');
     const data=validate({...pick(old),...patch});return mapper.toDetailDTO(await repo.update(id,data));
    }
    return {updateObject};
})();

// ข้อ 8: ลบสินค้า204
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task8 = (() => {
    const repo = repositories.task8;
    const mapper = mapper_7e45bb3d1f;
    async function existing(id){const row=await repo.findOne(id);if(!row)throw new AppError(`Product '${id}' was not found`,404,'PRODUCT_NOT_FOUND');return row;}

    async function removeObject(id){await existing(id);await repo.remove(id);}
    return {removeObject};
})();
