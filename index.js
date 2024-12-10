import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectionDB } from './db/db.js';
import jobs_router from './routes/jobs.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const application  = express();

application.use(express.json());
application.use(cors());

connectionDB();

//routes
application.use('/api/jobs/', jobs_router);

//start
application.listen(PORT, (err)=>{
    if(err){
        console.error(err);
    }
    else{
        console.log(`Server start on ${PORT} port.`);
    }
})
