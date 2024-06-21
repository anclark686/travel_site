import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";
import { Card } from "react-bootstrap";

export const Details = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  let data = useLocation();
  const post = data.state.post;
  const postId = data.state.postId;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) setUser(authUser);
      else setUser(null);
      return () => unsubscribe();
    });
  }, [user]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            })),
          );
        });
    }
    return () => {
      unsubscribe();
    };
  }, []);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="details">
      <div className="header">
        <h1 id="details">{post.title}</h1>
      </div>
      <div className="details_details">
        <img className="details_image" src={post.imageUrl} alt={post.title} />
        <Card className="details_card">
          <h3>{post.location}</h3>
          <h4>
            <strong>{post.username}:</strong> {post.caption}
          </h4>
        </Card>

        <Card className="comments_card">
          {user && (
            <form className="post_commentBox">
              <input
                className="post_input"
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                disabled={!comment}
                className="post_button"
                type="submit"
                onClick={postComment}
              >
                Post
              </button>
            </form>
          )}

          <div className="post_comments">
            {comments.map(({ id, comment }) => (
              <p key={id}>
                <strong>{comment.username}</strong> {comment.text}
              </p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
