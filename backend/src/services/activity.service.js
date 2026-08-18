//import repository
import userRepository from '../repositories/user.repository.js';
import activityRepository from '../repositories/activity.repository.js';
import AppError from '../utils/AppError.js';
import { transaction, commit, rollback } from "../config/transaction.js"

const getUserLogs = async (id, currentUser) => {
    //cari id
    const targetUser = await activityRepository.findUser(id)
    
    if(!targetUser) throw new AppError("User Tidak Ditemukan", 404);

    if (targetUser.role === "owner" && Number(currentUser.id) !== Number(targetUser.id)) {
        throw new AppError("Anda Tidak Memiliki Akses", 403);
    }

    if (currentUser.role === "user" && targetUser.id !== currentUser.id){
        throw new AppError("Tidak Memiliki Akses", 403)
    }

    return await activityRepository.findUserLogs({
        entity_type: "user",
        entity_id: id,
    });
}


export default {
    getUserLogs,
}