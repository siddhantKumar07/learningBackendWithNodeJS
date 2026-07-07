const app = require("./src/app")
const connectDB = require("./src/config/db");
try {
    connectDB();
} catch (error) {
    console.error("Error connecting to database:", error);
}
app.listen(3000, () => {
  
    console.log("server is running on port 3000")
})
