import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config.js"
import Convert_Date_Time from "./Convert_Date_Time";
import { Link } from "react-router-dom";
// import Comments from "./Comments";
const Post = ({data}) => {
  //   console.log(data);
  const deletePost = async (id) => {
    // alert("This will delete your post forever! Click OK to continue..");
    const deleteData = doc(db, "post", id);
    await deleteDoc(deleteData);
  };
 
  return (
    <>
      <div className="container">
        <div className="post_user my-3"></div>
        <div className="card">
          <img src={data.imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h3>{data.author}</h3>
            

            <p className="card-text">{data.description}</p>
            
              <Convert_Date_Time
                seconds={data.time.seconds}
                nanoseconds={data.time.nanoseconds}
              />
            
            <button type="button" className="btn btn-warning">
              Comments
            </button>
            <Link to={`/post/${data.id}`} type="button" className="btn btn-warning">
              View More
            </Link>
            <button
              onClick={() => deletePost(data.id)}
              type="button"
              className="btn btn-warning"
            >
              Delete Post
            </button>
          </div>
        </div>
      </div>
    </>
    // console.log(data)
  );
};

export default Post;