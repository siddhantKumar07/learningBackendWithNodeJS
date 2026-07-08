const express = require("express");
const userModel = require("./model/user");
const app = express();

app.use(express.json()); //It parses incoming request body (JSON data) and converts it into a JavaScript object. it is works for all the routes in the application, allowing them to access the request body data as a javascript object through req.body. It is important to use this middleware before defining any routes that expect to receive JSON data in the request body, as it ensures that the data is properly parsed and available for use in the route handlers.

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
    console.log(req.body);
    const data = req.body;

   const user =await userModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      age: data.age,
      password: data.password,
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
    const allowedUpdates=[
      "photoUrl","skills","about","age","password"
    ]
    const isAllowedUpdates = Object.keys(data).every((k)=>allowedUpdates.includes(k));// it will return true if evry keys are available in allowedUpdates

    if(!isAllowedUpdates){
      throw new Error("Updates are not allowed for some field")
    }
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
    const allowedUpdates=[
      "photoUrl","skills","about","age","password"
    ]
    const isAllowedUpdates = Object.keys(data).every((k)=>allowedUpdates.includes(k));// it will return true if evry keys are available in allowedUpdates

    if(!isAllowedUpdates){
      throw new Error("Updates are not allowed for some field")
    }

    await userModel.findByIdAndUpdate({ _id: id }, data, { new: true,runValidators:true });
    res.status(200).json({
      message: "successfully updated",
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
