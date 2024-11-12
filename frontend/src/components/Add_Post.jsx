import React, { useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Add_Post = () => {
  const auth = getAuth();
  const navigate=useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auth.currentUser) {
      try {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        await uploadTask;

        const url = await getDownloadURL(uploadTask.snapshot.ref);

        const data = {
          author: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoUrl: auth.currentUser.photoURL,
          imageUrl: url,
          userId: auth.currentUser.uid,
          title,
          description,
          time: serverTimestamp(),
        };
        const saveData = await addDoc(collection(db, "post"), data);
        setDescription("")
        setTitle("")
        navigate('/')





        
        
      } catch (error) {


        console.log("error", error);
      }
    } else {
      alert("You need to login first!");
    }
  };

  return (

    
    <div className="container add_post my-5">
      <h1>Upload a New Post!</h1>
      <form onSubmit={handleSubmit}>
        {/* <form> */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            value={title}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Image
          </label>
          <input
            type="file"
            // value={image}
            accept="image/*"
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default Add_Post;