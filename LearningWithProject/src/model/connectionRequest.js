const mongooes = require("mongoose");

const connectionRequestSchema = new mongooes.Schema({
    senderId:{
        type: mongooes.Schema.Types.ObjectId,
        required: true,
    },
    receiverId:{
        type: mongooes.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum:{
        values: ["ignored","interested","accepted","rejected"],
        message:"{VALUE} is not valid status"
        }
    }
},{
    timestamps:true
})
const ConnectionRequestModel = mongooes.model("connectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;