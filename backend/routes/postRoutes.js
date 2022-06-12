import express from "express";

import { addPost } from "../controllers/posts.js"

const router = express.Router();

router.post("/add", addPost);

export default router;