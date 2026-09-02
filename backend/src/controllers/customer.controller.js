//import service
import customerService from "../services/customer.service.js"
import apiResponse from "../utils/apiResponse.js";

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

const getCustomers = async (req, res, next) => {
    try{
        const result = await customerService.getCustomers()
        return res.status(200).json(
            apiResponse.success("Data Ditemukan", result)
        )
    }catch(err){
        next(err)
    }
}

const getCustomerById = async (req, res, next) =>{
    try{
        const id = Number(req.params.id)

        const result = await customerService.getCustomerById(id)
        return res.status(200).json(
            apiResponse.success("Data Ditemukan", result)
        )
    }catch(err){
        next(err)
    }
}


const updateCustomer = async (req, res, next) => {
    const id = req.params.id
    const { name, email, phone } = req.body
    try{
        const result = await customerService.updateCustomer({id, name, email, phone})
        return res.status(201).json(
            apiResponse.success("Update Berhasil", result)
        )
    }catch(err){
        next(err)
    }
}

export default {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer
}