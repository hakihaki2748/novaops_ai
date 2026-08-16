const validate = (schema) => {
    return (req, res, next) => {
        //schema dapat dikatakan sebagai aturan atau rujukan
        //safeParse digunakan untuk memeriksa(req.body) apakah memenuhi aturan atau tidak
        const result = schema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            })
        }
        //gunakan nilai yang sudah divalidasi
        req.body = result.data;

        next();
    }
}

export default validate;