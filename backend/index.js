import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require("dotenv").config();

import express from "express";
import db from "./config/database.js";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

// database
try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/comment', commentRoutes)





app.get('/', function(req, res) {
 
    res.send('Here be a backend');
 
});





app.listen(5000, () => console.log('Server running at port 5000'));