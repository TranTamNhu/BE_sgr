import express from 'express'
import userRoutes from './apis/user.route.js'
import uploadLocal from './apis/attachment.route.js'
const routes = express.Router()

routes.use( "/users",  userRoutes )
routes.use( "/upload",  uploadLocal )

export default routes