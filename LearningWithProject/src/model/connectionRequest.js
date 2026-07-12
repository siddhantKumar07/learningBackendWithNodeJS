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
        values= ["ignored","interested","accepted","rejected"],
        message:"{VALUE} is not valid status"
        }
    }
})
const ConnectionRequestModel = mongooes.model("connectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;