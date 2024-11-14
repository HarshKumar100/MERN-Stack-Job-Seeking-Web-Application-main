import React from "react";
import { db } from "../../firebase.config.js";
import { doc, deleteDoc } from "firebase/firestore";
import Convert_Date_Time from "./Convert_Date_Time";
import { Link } from "react-router-dom";
import { Trash2, MessageCircle, ExternalLink } from "lucide-react";

const Post = ({ data }) => {
  const deletePost = async (id) => {
    const deleteData = doc(db, "post", id);
    await deleteDoc(deleteData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={data.imageUrl} 
            alt="Post" 
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Content Container */}
        <div className="p-6">
          {/* Author */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
              {data.author.charAt(0)}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{data.author}</h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 leading-relaxed">
            {data.description}
          </p>

          {/* Time */}
          <div className="text-sm text-gray-500 mb-6">
            <Convert_Date_Time
              seconds={data.time.seconds}
              nanoseconds={data.time.nanoseconds}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              Comments
            </button>

            <Link 
              to={`/post/${data.id}`}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View More
            </Link>

            <button
              onClick={() => deletePost(data.id)}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-red-500 text-white hover:from-rose-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;