const checkChanges=(data)=>{
  const allowedUpdates=[
      "photoUrl","skills","about","age","password"
    ]
    const isAllowedUpdates = Object.keys(data).every((k)=>allowedUpdates.includes(k));// it will return true if evry keys are available in allowedUpdates

    if(!isAllowedUpdates){
      throw new Error("Updates are not allowed for some field")
    }
}
module.exports={
    checkChanges
}