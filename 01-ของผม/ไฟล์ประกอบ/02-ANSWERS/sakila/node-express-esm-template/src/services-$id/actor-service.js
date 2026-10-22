import * as repo from '../repositories-$id/actor-repository.js';
import {AppError} from '../middlewares-$id/error-handler.js';
const fields=["first_name", "last_name"];
function validate(body){
 if(!body || typeof body!=='object' || Array.isArray(body))throw new AppError('JSON object required',400,'VALIDATION_ERROR');
 const result={};
 for(const field of fields){
  if(typeof body[field]!=='string' || !body[field].trim())throw new AppError(`Field '${field}' is required`,400,'VALIDATION_ERROR');
  result[field]=body[field].trim();
 }
 return result;
}
export const getAllObjects=()=>repo.findAll();
export async function getObject(id){const row=await repo.findOne(id);if(!row)throw new AppError('Actor not found',404,'NOT_FOUND');return row;}
export async function createObject(body){return repo.create(validate(body));}
export async function updateObject(id,body){await getObject(id);return repo.update(id,validate(body));}
export async function removeObject(id){await getObject(id);await repo.remove(id);}
