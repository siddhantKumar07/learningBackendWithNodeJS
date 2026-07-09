const express = require("express");
const userModel = require("./model/user");
const bcrpt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jsonWebToken = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const {checkChanges}= require("./utils/validation");
app.use(express.json()); //It parses incoming request body (JSON data) and converts it into a JavaScript object. it is works for all the routes in the application, allowing them to access the request body data as a javascript object through req.body. It is important to use this middleware before defining any routes that expect to receive JSON data in the request body, as it ensures that the data is properly parsed and available for use in the route handlers.

app.use(cookieParser()) //it is used to parse the cookies from the request headers and make them available in the req.cookies object. It is important to use this middleware before defining any routes that expect to access cookies, as it ensures that the cookies are properly parsed and available for use in the route handlers.
 
const { userAuth, adminAuth } = require("./middleware/auth");

// middleware is used to handle the unauthorized access to the routes
// it is used to check the authorization of the user before allowing access to the routes

// app.use('/admin', adminAuth);
// app.use('/user', userAuth);

//get user
app.get("/user", async (req, res) => {
  const gmail = req.query.email;
  const user = await userModel.findOne({ emailId: gmail });
  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
  } else {
    res.status(200).json({
      message: "user fetched successfully",
      user: user,
    });
  }
});

// feed Api
app.get("/feed", async (req, res) => {
  try {
    const storage = await userModel.find();

    res.status(200).json({
      message: "fetched successfully",
      storage: storage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/login",async (req,res)=>{
  try{
const {emailId ,password} = req.body;
const user = await userModel.findOne({emailId:emailId});
if(!user){
  res.status(404).json({
    message:"invalid Credentials"
  })
}
const isMatch = await bcrpt.compare(password,user.password);
if(!isMatch){
  res.status(400).json({
    message:"Invalid Credentials"
  })
}
else{
  const token = jsonWebToken.sign({id:user._id},process.env.JWT_SECRET);// json web token is used to send the user id to the client side in the form of token so that the client can use it to access the protected routes. it generates a token using the user id and the secret key which is stored in the environment variable. the token is then sent to the client side in the form of cookie so that the client can use it to access the protected routes.
  console.log(token);
  res.cookie("token",token);
  res.status(200).json({
    message:"login successful",
    user:user
  })

}
  }catch(error){
    res.status(404).json({
      message:error.message
    })
  }
})

app.get("/profile",async(req,res)=>{
  try{
    const cookies = req.cookies;
    const isValid= jsonWebToken.verify(cookies.token,process.env.JWT_SECRET);// this line is used to verify the token sent by the client side in the form of cookie. it verifies the token using the secret key which is stored in the environment variable. if the token is valid then it returns the user id else it throws an error.
    console.log(isValid);
    if(!isValid){
      res.status(401).json({
        message:"unauthorized access"
      })
    }
else{


    res.status(200).json({
      message:"profile fetched successfully",
      user:await userModel.findById(isValid.id)
    })
  }
  }catch(error){
    res.status(404).json({
      message:error.message
    })
  }
})
// middleware for signup to check whether the user with this email is already exist
app.post("/signUp", async (req, res, next) => {
  try {
    const data = req.body;
    const existingUser = await userModel.findOne({ emailId: data.emailId });
    if (existingUser) {
      res.status(400).json({
        message: "user with this email already exist",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.post("/signUp", async (req, res) => {
  try {
    const data = req.body;
     const {password}=data;
     const hashedPassword = await bcrpt.hash(password,10);
   const user =await userModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      age: data.age,
      password:hashedPassword,
      gender: data.gender,
      skills: data.skills,
      about:data.about,
      photoUrl:data.photoUrl,

    });
    res.status(200).json({
      message: "User created successfully",
      user:user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await userModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// update user though gmail
app.patch("/user", async (req, res) => {
  const gmail = req.query.email;
  const data = req.body;
  try {
    checkChanges(data);//it will check whether the data is allowed to update or not if not then it will throw an error
    const updatedUser = await userModel.findOneAndUpdate(
      { emailId: gmail },
      data,
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "user updated successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// update user through id
app.patch("/user/:id", async (req, res) => {
      const id = req.params?.id;
    const data = req.body;
  try {
checkChanges(data);//it will check whether the data is allowed to update or not if not then it will throw an error
   const updatedUser= await userModel.findByIdAndUpdate({ _id: id }, data, { new: true,runValidators:true });
    res.status(200).json({
      message: "successfully updated",
      updatedUser: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// for admin also
app.get("/admin/addUser", (req, res) => {
  res.status(200).json({
    message: "admin fetched successfully",
  });
});
app.get("/admin/deleteUser", (req, res) => {
  res.status(200).json({
    message: "admin fetched successfully",
  });
});

module.exports = app;
