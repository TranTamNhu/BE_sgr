import express from 'express'
import dotenv from 'dotenv'
import router from './src/routes/routes.js'
const app = express()
dotenv.config()
// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log("Now:", new Date().toLocaleString())
    next()
})
// router
app.use("/api", router)
app.use((err, req, res, next) => {
    console.log("Error:", err)
    return res.status(500).json(
        {
            error:err.mesage

        })
})

const Port = process.env.Port || 3000
app.listen(Port, (req, res) => {
    console.log(`Server run at http://localhost:${Port}`)
})