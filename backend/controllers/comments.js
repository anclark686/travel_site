import Comment from '../models/commentModel.js';

//comment specific functions

//create comment
export const addComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.send("Values Inserted")
    } catch (err) {
        console.log(err);
    }
}

//delete comment

