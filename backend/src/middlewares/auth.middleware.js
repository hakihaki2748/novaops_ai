import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
    // console.log("req masuk")
    const authHeaders = req.headers.authorization;

    //jika headers tidak ada
    if(!authHeaders){
        return res.status(401).json({
            success: false,
            message: "Token Tidak Ditemukan"
        });
    }

    //kita destructur array untuk validasi
    const [scheme, token] = authHeaders.split(" ");

    //jika bearer || token salah atau tidak valid
    if(!scheme !== "Bearer" || !token){
        return res.status(401).json({
            success: false,
            messages: "Format Token Salah"
        })
    }

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