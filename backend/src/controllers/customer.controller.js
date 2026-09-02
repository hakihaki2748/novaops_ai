//import service
import customerService from "../services/customer.service"
import apiResponse from "../utils/apiResponse";

const createCustomer = async (req, res, next) => {
    const { name, email, phone } = req.body;

    try{
        const result = await customerService.createCustomer({name, email, phone})
        return res.status(201).json(
            apiResponse.success("Data Di Tambahkan", result)
        )
    }catch(err){
        next(err)
    }
}

export default {
    createCustomer,
}