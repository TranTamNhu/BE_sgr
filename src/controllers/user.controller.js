import userService from "../services/user.service.js"

const GetAll = async( req, res, next ) => {
    try {
        const users = await userService.GetAll()
        return res.status(200).json({
            data : users
        })
    } catch (error) {
        next( error )
    }
}

const GetById = async( req, res, next ) => {
    try {
        const id = parseInt( req.params.id )
        const user = await userService.GetById( id )
        return res.status(200).json({
            data : user
        })
    } catch (error) {
        next( error )
    }
}
const postUser = async (req, res, next) => {
    try {
        const body = req.body;
        const newUser = await userService.CreateUser(body);
        return res.status(201).json({
            message: "Created",
            data: newUser
        });
    } catch (error) {
        next(error);
    }
}
const putUser = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        const updatedUser = await userService.putUser(id, body);
        return res.status(200).json({
            message: "Success",
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const deletedUser = await userService.DeleteUser(id);
        return res.status(200).json({
            message: "Deleted",
            data: deletedUser
        });
    } catch (error) {
        next(error);
    }
}
    

export default {
    GetAll,
    GetById,
    postUser,
    putUser,
    deleteUser
}