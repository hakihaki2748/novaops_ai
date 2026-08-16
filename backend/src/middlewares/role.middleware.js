const roleMiddleware = (...roles) => { //gunakan rest parameter

    return (req, res, next) => {
        //buat role dari req.user.role
        const userRole = req.user.role;

        if (!roles.includes(userRole)){
            return res.status(403).json({
                "success": false,
                "message": "Your role is not authorized",
            })
        }
        next();
    }
}

export default roleMiddleware;