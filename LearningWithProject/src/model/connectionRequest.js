const mongooes = require("mongoose");

const connectionRequestSchema = new mongooes.Schema({
    SenderId:{
        type: mongooes.Schema.Types.ObjectId,
        required: true,
    },
    ReceiverId:{
        type: mongooes.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum:{
        values= ["ignore","interested","accepted","rejected"],
        message:"{VALUE} is not valid status"
        }
    }
})
const connectionRequestModel = mongooes.model("connectionRequest",connectionRequestSchema);
module.exports = connectionRequestModel;