export const ValidateUserId = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id) || id <= 0) {
            throw new Error("ID is invalid")
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const ValidateUserBody = async (req, res, next) => {
    try {
        const { name } = req.body
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new Error("Name is required and must be a non-empty string")
        }
        next()
    } catch (error) {
        next(error)
    }
}
