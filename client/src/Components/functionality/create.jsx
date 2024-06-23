import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Card } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { auth, db, storage } from "../../firebase";
import { NeedToLogin } from "../login_reg/needtologin";
import Loading from "../layouts/loading";

export const Create = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [msg, setMsg] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [publicAvail, setPublicAvail] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setPageLoading(false);
      } else {
        setUser(null);
        setPageLoading(false);
      }
      return () => unsubscribe();
    });
  }, [user]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const clearData = () => {
    setImage(null);
    setTitle("");
    setLocation("");
    setCaption("");
    setProgress(0);
    setMsg("");
    setPreviewUrl(null);
    setPublicAvail(false);
  };

  const handleUpload = async () => {
    try {
      const imageRef = ref(storage, `images/${user.uid}/${image.name}`);
      const imageUpload = uploadBytesResumable(imageRef, image);

      imageUpload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(imageUpload.snapshot.ref).then(async (downloadURL) => {
            const path = `posts/${user.uid}/${publicAvail ? "public" : "private"}`;

            await addDoc(collection(db, path), {
              timestamp: new Date(),
              title: title,
              location: location,
              caption: caption,
              imageUrl: downloadURL,
              username: user.displayName,
              public: publicAvail,
              userId: user.uid,
            });

            // if (publicAvail) {
            //   await addDoc(collection(db, `posts/public/references`), {
            //     reference: path,
            //   });
            // }

            setMsg("Success! Image Uploaded");
            setPreviewUrl(downloadURL);
          });
        },
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      {!pageLoading ? (
        <>
          {user ? (
            <div className="create">
              <div className="header">
                <h1 id="create">Create a Post</h1>
              </div>

              <Card className="create_card">
                {progress !== 100 ? (
                  <>
                    <progress
                      value={progress}
                      max="100"
                      className="imageUpload_progress"
                    />
                    <input
                      type="text"
                      placeholder="Enter a Title"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      className="imageUpload_input"
                    />
                    <input
                      type="text"
                      placeholder="Enter a Location"
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                      className="imageUpload_input"
                    />
                    <input
                      type="text"
                      placeholder="Enter a Caption"
                      onChange={(e) => setCaption(e.target.value)}
                      value={caption}
                      className="imageUpload_input"
                    />
                    <div className="final-row">
                      <input
                        type="file"
                        onChange={handleChange}
                        className="imageUpload_file"
                      />
                      <div className="check">
                        <input
                          type="checkbox"
                          name="public"
                          id="public"
                          onChange={(e) => setPublicAvail(e.target.checked)}
                        />
                        <label htmlFor="public">Public?</label>
                      </div>
                    </div>
                    <button
                      className="btn btn-dark choices"
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  </>
                ) : (
                  <>
                    <p>{msg}</p>
                    <h3>Preview</h3>
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="image-preview"
                      />
                    ) : (
                      <div className="spacer">
                        <Loading />
                      </div>
                    )}
                    <button
                      className="btn btn-dark choices"
                      onClick={clearData}
                    >
                      Add New
                    </button>
                  </>
                )}
              </Card>
            </div>
          ) : (
            <NeedToLogin />
          )}
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};
