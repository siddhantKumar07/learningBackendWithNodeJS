import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
name:{
    type:String,
    trim:true,
    minlength:[3,"Name must be at least 3 characters"],
    maxlength:[30,"Name must be at most 30 characters"],
    required:[true,"Name is required"],
    lowercase:true
}
,
email:{
    type:String,
    trim:true,
    unique:[true,"Email already exists"],
    required:[true,"Email is required"],
    validate:{
        validator:validator.isEmail,
        message:"Please provide a valid email"
    },
    lowercase:true
},
password:{
type:String,
trim:true,
minlength:[6,"Password must be at least 6 characters"],
maxlength:[200,"Password must be at most 200 characters"],
required:[true,"Password is required"],
validate:{
    validator:validator.isStrongPassword,
    message:"Password must be at least 6 characters and must contain at least one uppercase letter, one lowercase letter, one number and one special character"
}

}
})



userSchema.pre("save",async function(){// this will run before saving the user to the database and will hash the password before saving it to the database when user.save() is called
    if(!this.isModified("password")){
        return ;
    }
const hash = await bcrypt.hash(this.password,10);
this.password = hash;
return ;

})

const authModel = mongoose.model("User", userSchema);
export default authModel;