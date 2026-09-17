//panggil service
import activityService from "../services/activity.service.js";
import apiResponse from "../utils/apiResponse.js";


const getUserLogs = async (req, res, next) => {
    try{
        const logs = await activityService.getUserLogs(req.params.id, req.user);
        return res.status(200).json(
            apiResponse.success("Data Ditemukan", logs)
        )
    }catch(err) {
        next(err)
    }
}


//customer history
const getCustomerHistory = async (req, res, next) => {
    try {
        const id = Number(req.params.id)

        const history = await activityService.getCustomerHistory(id, req.user)
        return res.status(200).json(
            apiResponse.success("History Customer", history)
        )
    } catch (err) {
        next(err)
    }
}

export default { getUserLogs, getCustomerHistory }