// {student-id} - {student-name}
export default class EntityDtoMapper {
 static toSummaryDTO(p){return {id:p.id,sku:p.sku,name:p.name,brandId:p.brand_id,category:p.category,price:p.price,status:p.status};}
 static toDetailDTO(p){return {...this.toSummaryDTO(p),brandName:p.brand_name,ramGb:p.ram_gb,storageGb:p.storage_gb,color:p.color,stockQuantity:p.stock_quantity,releaseDate:p.release_date};}
 static map(entity,viewType){return viewType==='summary'?this.toSummaryDTO(entity):this.toDetailDTO(entity);}
 static maps(entities,viewType){
  const data=entities.map(entity=>this.map(entity,viewType));
  if(entities.totalItems!==undefined)data.totalItems=entities.totalItems;
  return data;
 }
}
