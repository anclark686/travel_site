import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { auth, db, storage } from '../../firebase'
import { NeedToLogin } from "../login_reg/needtologin";
import firebase from 'firebase/compat/app';
import { Card } from "react-bootstrap"


export const Create = () => {
  const [user, setUser] = useState(null)
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [caption, setCaption] = useState("")
  const [msg, setMsg] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) setUser(authUser)
      else setUser(null)
      return () => unsubscribe()
    })
  }, [user])

  const handleChange = (e) => {
      if (e.target.files[0]) {
          setImage(e.target.files[0])
      }
  }

  const handleUpload = () => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
          "state_changed",
          (snapshot) => {
              // progress function...
              const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
              setProgress(progress)
          },
          (err) => {
              // Error function
              console.log(err)
          },
          () => {
              // Complete function...
              storage
                  .ref("images")
                  .child(image.name)
                  .getDownloadURL()
                  .then(url => {
                      // post image inside db
                      db.collection("posts").add({
                          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                          title: title,
                          location: location,
                          caption: caption,
                          imageUrl: url,
                          username: user.displayName
                      })
                      setProgress(0)
                      setCaption("")
                      setImage(null)
                      setMsg("Image Uploaded")
                  })
          }
      )
  }

  
  return (
    <>
      {user ? 
      <div className="create">
        <div className="header">
          <h1 id="create">Create</h1>
        </div>     

        <Card className="create_card">
          <p>{msg}</p>
              <progress value={progress} max="100" className="imageUpload_progress"/>
              <input 
                  type="text" 
                  placeholder="Enter a Title" 
                  onChange={e => setTitle(e.target.value)} 
                  value={title}
                  className="imageUpload_input"
              />
              <input 
                  type="text" 
                  placeholder="Enter a Location" 
                  onChange={e => setLocation(e.target.value)} 
                  value={location}
                  className="imageUpload_input"
              />
              <input 
                  type="text" 
                  placeholder="Enter a Caption" 
                  onChange={e => setCaption(e.target.value)} 
                  value={caption}
                  className="imageUpload_input"
              />
              <input type="file" onChange={handleChange} className="imageUpload_file"/>
              <button className="btn btn-dark choices" onClick={handleUpload}>
                  Upload
              </button>
            </Card>
      </div>
      : <NeedToLogin />}
    </>
  )
};
