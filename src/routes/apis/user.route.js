import express from 'express'
import userController from '../../controllers/user.controller.js'
import { ValidateUserId } from '../../middlewares/user.validate.js'
const router = express.Router()

router.route('/')
    .get(userController.GetAll)
    .post(userController.postUser)

router.route('/:id')
    .get(ValidateUserId, userController.GetById)
    .put(ValidateUserId, userController.putUser)
    .delete(ValidateUserId, userController.deleteUser)


export default router