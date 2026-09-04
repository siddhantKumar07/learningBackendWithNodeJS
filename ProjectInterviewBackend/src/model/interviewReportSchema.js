const mongoose  = require("mongoose")
const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})

const behavioralQuestionSchema = new mongoose.Schema({
     question:{
        type:String,
        required:[true,"Question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        required:[true,"Severity is required"],
        enum:{
            values:["low","medium","high"],
            message:"Severity must be either low, medium or high"
        }
    }
},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:String,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    plan:{
        type:String,
        required:[true,"Plan is required"]
    }
},{
    _id:false
})
const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job Description is required"]
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:[0,"Match Score must be at least 0"],
        max:[100,"Match Score must be at most 100"]
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema]
},{
    timestamps:true
})

const interviewReportModel = mongoose.model("interviewReport",interviewReportSchema)
module.exports = interviewReportModel