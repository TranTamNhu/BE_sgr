import express from 'express'
import userController from '../../controllers/user.controller.js'
import { ValidateUserId, ValidateUserBody } from '../../middlewares/user.validate.js'

const router = express.Router()

router.route('/')
    .get(userController.GetAll)
    .post(ValidateUserBody, userController.Create)

router.route('/:id')
    .get(ValidateUserId, userController.GetById)
    .put(ValidateUserId, ValidateUserBody, userController.Update)
    .delete(ValidateUserId, userController.Delete)

export default router
