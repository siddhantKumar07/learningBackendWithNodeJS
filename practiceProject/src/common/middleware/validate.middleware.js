import apiError from "../utils/api-error.js";

const validate =(dtoClass)=>{
    return (req,res,next)=>{
        const {errors,value}=dtoClass.validate(req.body);

        if(errors){
            throw apiError.badRequest(errors.join(", "));
        }
        req.body = value;
        console.log("validated data",value)
        next();
    }
}
export default validate;