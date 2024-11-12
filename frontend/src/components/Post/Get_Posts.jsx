import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from  "../../firebase.config.js"
import Post from "./Post"

const Get_Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postQuery = query(collection(db, "post"), orderBy("time", "desc"));

    const fetchData = async () => {
      await onSnapshot(postQuery, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };

    fetchData();
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  };

  const postBoxStyle = {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    padding: "20px",
    margin: "10px 0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    boxSizing: "border-box",
  };

  const contentStyle = {
    width: "100%",
    overflowWrap: "break-word", // Prevents text from overflowing horizontally
    whiteSpace: "normal",       // Ensures text wraps within container
    textAlign: "center",        // Centers text within the post
    marginBottom: "15px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
    width: "100%",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#ffffff",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      {posts.map((data) => (
        <div key={data.id} style={postBoxStyle}>
          <div style={contentStyle}>
            <Post data={data} />
          </div>
          <div style={buttonContainerStyle}>
            <button style={buttonStyle}>Like</button>
            <button style={buttonStyle}>Comment</button>
            <button style={buttonStyle}>Share</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Get_Posts;
