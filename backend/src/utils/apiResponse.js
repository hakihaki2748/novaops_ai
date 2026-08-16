const success = (message = "", data = null) => {
    return {
        success: true,
        message,
        data,
    }
}

const error = (message = "", data = null) => {
    return {
        success: false,
        message,
        data,
    }
}

export default {
    success,
    error,
}