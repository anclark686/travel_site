import express from "express";
import db from "./config/database.js";
import cors from "cors";
import Post from "./models/postModel.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
    // db.createSchema()
} catch (error) {
    console.error('Connection error:', error);
}

await Post.sync();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Here be a backend')
})

app.use('/posts', postRoutes)

app.listen(5000, () => console.log('Server running on port 5000'))