

const CreateMusicController = (req,res)=>{
    const {title}= req.body;
    // const file = req.file;
    const {_id,role}=req.cookies.token;
    // if(!file||!title){
    //     return res.status(400).json({
    //         message:"Please provide all required fields"
    //     })
    // }
    console.log(_id,role)
    res.status(200).json({
        message:"Music created successfully"
    })
    
}