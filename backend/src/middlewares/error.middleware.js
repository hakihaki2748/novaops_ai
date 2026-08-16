import apiResponse from "../utils/apiResponse.js";

const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;

    if(statusCode >= 500){
        return res.status(statusCode).json(
            apiResponse.error("Internal Server Error"));
    }
    
    return res.status(statusCode).json(
        apiResponse.error(err.message)
    )
}

export default errorMiddleware;