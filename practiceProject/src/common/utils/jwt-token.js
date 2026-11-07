import crypto from "crypto";
const generateResetToken = () => {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const
};
export { generateResetToken };
