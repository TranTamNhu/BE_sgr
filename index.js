import express from 'express';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import path from 'path';
import db from './src/configs/mongoose.config.js';
import router from './src/routes/routes.js'
import cookieParser from 'cookie-parser'
// router
// instance of mongo
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
async function StartServer()
{
    const connectionString = process.env.MONGODB_URI;
    await db.Connect(connectionString);
    //middleware
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')))
    app.use('/uploads', express.static(path.join(__dirname, 'common/uploads')))  
    app.use(cookieParser())
    app.use('/api', router)
    //
    app.use((req, res) => {
        res.status(404).send('404 Not Found ?');
    })
    
    app.use((err, req, res) => {
        console.log(err.stack);
        res.status(500).send('Something aint right')
    })

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}
try
{
    await StartServer()
}
catch (error)
{
    console.error('Error starting server:', error)
}