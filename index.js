// index.js
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import router from './src/routes/routes.js'

const app = express()
dotenv.config()

// 1) Thiết lập view engine EJS
app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'views'))

// 2) Cho phép serve static (nếu có thư mục public)
app.use(express.static(path.join(process.cwd(), 'public')))

// 3) Middleware parse JSON + logger
app.use(express.json())
app.use((req, res, next) => {
  console.log("Now:", new Date().toLocaleString())
  next()
})

// 4) Route render view-users
import userService from './src/services/user.service.js'
app.get('/view-users', async (req, res, next) => {
  try {
    const users = await userService.GetAll()
    return res.render('data', {
      pageTitle: 'Danh sách người dùng',
      users
    })
  } catch (err) {
    next(err)
  }
})

// 5) API router
app.use("/api", router)

// 6) Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: err.message })
})

const Port = process.env.Port || 3000
app.listen(Port, () => {
  console.log(`Server run at http://localhost:${Port}`)
  console.log(`Xem danh sách người dùng: http://localhost:${Port}/view-users`)
})
