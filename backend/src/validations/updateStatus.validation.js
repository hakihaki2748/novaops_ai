const allowedStatus = [
    "active",
    "inactive",
    "suspended"
]

const validasiUpdate = (req, res, next) => {
    const { status } = req.body;

    if (!allowedStatus.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status value"
        });
    }

    next();
};

export default validasiUpdate;