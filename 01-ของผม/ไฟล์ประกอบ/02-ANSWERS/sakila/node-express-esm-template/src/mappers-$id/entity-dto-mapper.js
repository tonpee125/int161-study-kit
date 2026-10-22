// Sakila ชุดนี้คืน raw data ตามบทสอน จึงไม่เปลี่ยนชื่อช่อง
export default class EntityDtoMapper {
 static toSummaryDTO(entity){return entity;}
 static toDetailDTO(entity){return entity;}
 static map(entity,viewType){return viewType==='summary'?this.toSummaryDTO(entity):this.toDetailDTO(entity);}
 static maps(entities,viewType){return entities.map(entity=>this.map(entity,viewType));}
}
