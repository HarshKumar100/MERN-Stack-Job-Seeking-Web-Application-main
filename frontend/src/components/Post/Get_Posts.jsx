import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase.config.js";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import Post from "./Post";

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {posts.map((data) => (
          <div 
            key={data.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className="w-full">
              <Post data={data} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );      
};

export default Get_Posts;