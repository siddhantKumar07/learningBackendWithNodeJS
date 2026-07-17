const app = require("./src/app")
const connectDB = require("./src/config/db");
const http = require("http");
const intializeSocket = require("./src/utils/socket");
const server = http.createServer(app);

intializeSocket(server);

try {
    connectDB();
} catch (error) {
    console.error("Error connecting to database:", error);
}
server.listen(3000, () => {
  
    console.log("server is running on port 3000")
})
