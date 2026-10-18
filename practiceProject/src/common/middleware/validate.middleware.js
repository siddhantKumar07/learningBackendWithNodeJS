import apiError from "../utils/api-error";

const validate =(dtoClass)=>{
    return (req,res,next)=>{
        const {errors,value}=dtoClass.validate(req.body);

        if(errors){
            throw apiError.badRequest(errors.join(", "));
        }
        req.body = value;
        next();
    }
}