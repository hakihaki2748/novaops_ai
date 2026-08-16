import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
    // console.log("req masuk")
    const authHeaders = req.headers.authorization;

    if(!authHeaders){
        return res.status(401).json({
            success: false,
            message: "Token Tidak Ditemukan"
        });
    }

    const token = authHeaders.split(" ")[1];

    try {
        //tambah property baru namanya user di req
        req.user = verifyToken(token);

        next();
    } catch (err){
        return res.status(401).json({
            success: false,
            message: "Token Tidak Valid",
        })
    }
}

export default authMiddleware;