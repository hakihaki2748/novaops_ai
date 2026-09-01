//import repository
import customerRepository from "../repositories/customer.repository"
import AppError from "../utils/AppError"

const createCustomer = async ({name, email, phone}) => {
    //cari email apakah sudah digunakan
    const findEmail = await customerRepository.findUserByEmail(email)
    if(!findEmail) throw new AppError("Email Sudah Digunakan", 400)

    const newCustomer = await customerRepository.createCustomer({name, email, phone})

    return newCustomer
}