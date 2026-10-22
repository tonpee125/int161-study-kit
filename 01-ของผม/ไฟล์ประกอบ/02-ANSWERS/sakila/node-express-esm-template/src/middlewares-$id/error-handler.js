export class AppError extends Error {
 constructor(message,statusCode,errorCode){super(message);this.statusCode=statusCode;this.errorCode=errorCode;}
}
export function errorHandler(err,req,res,next){
 if(res.headersSent)return next(err);
 let status=err.statusCode || err.status || 500, code=err.errorCode || 'INTERNAL_SERVER_ERROR',message=err.message;
 if(err.type==='entity.parse.failed'){status=400;code='INVALID_JSON';message='Invalid JSON body';}
 if(err.code==='ER_DUP_ENTRY'){status=409;code='DUPLICATE_KEY';message=err.publicMessage || 'Resource already exists';}
 if(err.code==='ER_NO_REFERENCED_ROW_2'){status=400;code='FOREIGN_KEY_NOT_FOUND';message=err.publicMessage || 'Referenced record does not exist';}
 if(err.code==='ER_ROW_IS_REFERENCED_2'){status=409;code='RESOURCE_IN_USE';message=err.publicMessage || 'Resource is referenced by related records';}
 if(status>=500){console.error(err);message='Internal server error';}
 const mode='sakila';
 if(mode==='classic')return res.status(status).json({status:'error',error:{code,message}});
 if(mode==='sakila')return res.status(status).json({status,error:code,message,resource:req.originalUrl,timestamp:new Date().toLocaleString('en-US')});
 return res.status(status).json({success:false,error:{code,message},timestamp:new Date().toISOString()});
}
