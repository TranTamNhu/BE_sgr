import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
const app = express()
app.use(express.json())

app.route('/')
.get((req, res)=>{
    res.send("hello world")
})

const Port = process.env.Port || 3000
 app.listen(Port,(req, res)=>{
    console.log(`server run at http://localhost:${Port}`)
 })