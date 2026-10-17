class apiError extends Error{

constructor(statusCode,message){
super(message);
this.statusCode = statusCode;
this.isOperational = true;
Error.captureStackTrace(this,this.constructor);
}

static badRequest(message="Bad Request"){
    return new apiError(400,message);
}

static unAuthorized(message="UnAuthorized"){
    return new apiError(401,message);
}



}
export default apiError;