import "dotenv/config";
import app from "./src/app.js";
import connnectDB from "./src/common/config/db.js";

const start = async () => {
try{
await connnectDB();
    app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})
}catch(err){
    console.log("something went wrong while starting the server", err);
    process.exit(1);
}
}
start()