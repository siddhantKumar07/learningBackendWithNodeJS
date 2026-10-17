import joi from "joi";

class BaseDTO {
static schema = joi.object({});

static validate(data){
    this.schema.validate(data,{
        abortEarly:false,// to get all errors at once , if it is true then it will return only first error
        stripUnknown:true,// to remove unknown fields from the data, suppose if we have a field in the data which is not in the schema then it will remove that field from the data
    })
}

}
export default BaseDTO;