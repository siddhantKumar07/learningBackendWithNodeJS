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
static conflict(message="Conflict"){
    return new apiError(409,message);
}
static notFound(message="Not Found"){
    return new apiError(404,message);
}
static passwordMismatch(message="Password Mismatch"){
    return new apiError(400,message);
}
static forbidden(message="Forbidden"){
    return new apiError(403,message);
}

}
export default apiError;