//import repository
import userRepository from '../repositories/user.repository.js';
import activityRepository from '../repositories/activity.repository.js';
import AppError from '../utils/AppError.js';
 

const getUserLogs = async (userId, currentUser) => {

        if (currentUser.role !== "owner" && String(currentUser.id) !== String(userId)) {
            throw new AppError("Anda Tidak Memiliki Akses", 403);
        }

        const targetUser = await userRepository.findUserById(userId);

        if(!targetUser) throw new AppError("User Tidak Ditemukan", 404);

        return await activityRepository.findUserLogs(userId);
    }


export default {
    getUserLogs,
}