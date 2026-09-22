//import repository
import activityRepository from '../repositories/activity.repository.js';
import customerRepository from '../repositories/customer.repository.js';
import AppError from '../utils/AppError.js';

const getUserLogs = async (id, currentUser) => {
    //cari id
    const targetUser = await activityRepository.findUserById(id)
    
    if(!targetUser) throw new AppError("User Tidak Ditemukan", 404);

    if (targetUser.role === "owner" && Number(currentUser.id) !== Number(targetUser.id)) {
        throw new AppError("Anda Tidak Memiliki Akses", 403);
    }

    if (currentUser.role === "user" && Number(targetUser.id) !== Number(currentUser.id)){
        throw new AppError("Tidak Memiliki Akses", 403)
    }

    return await activityRepository.findUserLogs({
        entity_type: "user",
        entity_id: id,
    });
}

const getCustomerHistory = async (id, currentUser) => {
    //cek customer
    const customer = await customerRepository.getCustomerById(id, currentUser.company_id)

    if(!customer){
        throw new AppError("Customer Tidak Ditemukan", 404);
    }

    //cek permission nanti saja


    const logs = await activityRepository.findEntityLogs({
        company_id: currentUser.company_id,
        entity_type: "customer",
        entity_id: id
    })


    return logs
}


export default {
    getUserLogs,
    getCustomerHistory
}