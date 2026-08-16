class AppError extends Error {
    constructor(message, statusCode = 500, errors = null) {
        super(message); // digunakan untuk meneruskan pesan ke parent Error javascript

        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export default AppError;