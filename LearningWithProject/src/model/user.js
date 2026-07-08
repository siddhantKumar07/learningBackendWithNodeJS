const mongooes = require("mongoose");

const userSchema = new mongooes.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
    min:18,
    max:100
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxLength:15,
    validate(value){
      if(!["male","female","other"].includes(value)){
        throw new error("gender is not valid")
      }
    }
  },
  photoUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  about: {
    type: String,
    default: "this is the default about text.",
    trim: true,
    maxLength:100
  },
  skills: {
    type: [String],
    default: [],
  },
},{
    timestamps:true
});
const userModel = mongooes.model("user", userSchema);

module.exports = userModel;
