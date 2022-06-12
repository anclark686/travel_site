import Post from '../models/postModel.js';

//post specific functions

//add post
export const addPost = async (req, res) => {
    try {
        const user = await Post.create(req.body);
        res.send("Values Inserted")
    } catch (err) {
        console.log(err);
    }
}
//edit post

//delete post