import userService from "../services/user.service.js"



const GetAll = async (req, res, next) => {
    try {
        const users = await userService.GetAll()
        return res.status(200).json({ data: users })
    } catch (error) {
        next(error)
    }
}

const GetById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const user = await userService.GetById(id)
        return res.status(200).json({ data: user })
    } catch (error) {
        next(error)
    }
}

const Create = async (req, res, next) => {
    try {
        const newUser = req.body
        await userService.Create(newUser)
        return res.status(201).json("Created")
    } catch (error) {
        next(error)
    }
}

const Update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const updatedUser = req.body
        await userService.Update(id, updatedUser)
        return res.status(200).json("Success")
    } catch (error) {
        next(error)
    }
}

const Delete = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        await userService.Delete(id)
        return res.status(200).json("Success")
    } catch (error) {
        next(error)
    }
}

export default {
    GetAll,
    GetById,
    Create,
    Update,
    Delete
}
