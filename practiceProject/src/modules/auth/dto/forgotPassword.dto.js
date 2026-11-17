import BaseDTO from "../../../common/dto/base.dto.js";
import joi from "joi";

class forgotPasswordDTO extends BaseDTO{

    //  schema for forgot password
 static schema = joi.object({
 password:joi.string().min(8).max(40).required().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!%*?&]{7,40}$/).message("Password must be at least 7 characters and must contain at least one uppercase letter, one lowercase letter, one number and one special character"), })
}
export default forgotPasswordDTO;