import BaseDTO from "../../../common/dto/base.dto.js";
import joi from "joi";

class registerDTO extends BaseDTO{
    
    static schema = joi.object({
        name:joi.string().min(3).max(30).required().trim().lowercase(),
        email:joi.string().email().required().trim().lowercase(),
        password:joi.string().min(7).max(30).required().trim().message("Password must be at least 7 characters and must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
        role:joi.string().valid("customer","seller").default("customer")
    })
}
export default registerDTO;