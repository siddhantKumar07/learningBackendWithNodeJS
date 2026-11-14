import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateAccessToken = (payload)=>{
    const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.JWT_ACCESS_EXPIRE_IN || "15m"});
    return accessToken;
}
const verifyAccessToken = (token)=>{
    try{
        const decoded = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
        return decoded;
    }catch(error){
        throw new Error("Invalid token");
    }
}
const generateRefreshToken = (payload)=>{
    const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:process.env.JWT_REFRESH_EXPIRE_IN || "7d"});
    return refreshToken;
}
const verifyRefreshToken = (token)=>{
    try{
        const decoded = jwt.verify(token,process.env.JWT_REFRESH_SECRET);
        return decoded;
    }catch(error){
        throw new Error("Invalid token");
    }
}

const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    return { rawToken, hashedToken };
};
export { generateResetToken };
