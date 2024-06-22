import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { Card, Form } from "react-bootstrap";

import { auth, db } from "../../firebase";

export const Details = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  let data = useLocation();
  const post = data.state.post;
  const postId = data.state.postId;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        getComments();
      } else {
        setUser(null);
        getComments();
      }
      return () => unsubscribe();
    });
  }, [user]);

  const getComments = async () => {
    const tempComments = [];

    const path = `posts/${post.userId}/images/${postId}/comments`;
    const q = query(collection(db, path), orderBy("timestamp", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((comment) => {
      tempComments.push({
        id: comment.id,
        comment: comment.data(),
      });
    });
    setComments(tempComments);
  };

  const postComment = async (e) => {
    e.preventDefault();
    await addDoc(
      collection(db, `posts/${post.userId}/images/${postId}/comments`),
      {
        text: comment,
        username: user.displayName,
        timestamp: new Date(),
      },
    );
    setComment("");
    getComments();
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
            <Form className="post_commentBox">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="post_input"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <button
                disabled={!comment}
                className="btn btn-dark post_button"
                type="submit"
                onClick={postComment}
              >
                Post
              </button>
            </Form>
          )}

          <div className="post_comments">
            {comments.map(({ id, comment }, i) => (
              <div className="comment-data">
                <p key={id}>
                  <strong>{comment.username}:</strong> {comment.text}
                </p>
                <p className="timestamp">
                  {comment.timestamp.toDate().toLocaleString("en-US")}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
