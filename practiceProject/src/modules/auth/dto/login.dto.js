import BaseDTO from "../../../common/dto/base.dto.js";
import joi from "joi";

class loginDTO extends BaseDTO{

 static schema = joi.object({
    email:joi.string().email().required().trim().lowercase(),
    password:joi.string().required().trim()
 })
}
export default loginDTO;