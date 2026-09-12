const validateQuery = (schema) => {
    return (req, res, next) => {
        //schema dapat dikatakan sebagai aturan atau rujukan
        //safeParse digunakan untuk memeriksa(req.params) apakah memenuhi aturan atau tidak
        const result = schema.safeParse(req.query);

        if(!result.success){
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.flatten()
            })
        }
        //karena query tidak bisa diassign ulang, 
        // maka simpan nilai ke variabel lain dan tambahkan ke req.
        req.validQuery = result.data;

        next();
    }
}

export default validateQuery;