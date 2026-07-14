const mongooes = require("mongoose");

const connectionRequestSchema = new mongooes.Schema({
    senderId:{
        type: mongooes.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    receiverId:{
        type: mongooes.Schema.Types.ObjectId,
        ref: "user",
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
connectionRequestSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });// it will make sure that the senderId and receiverId are unique in the collection so that the same user cannot send the request to the same user again and again. and also it makes the searching faster because it will create an index on the senderId and receiverId fields.
const ConnectionRequestModel = mongooes.model("connectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;