import React, { useState, useMemo } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase.config.js";
import { useNavigate } from "react-router-dom";
import { Upload, Camera, Loader2, Sparkles } from "lucide-react";

const Add_Post = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = useMemo(() => [
    {
      title: "Author Information",
      isValid: () => authorName && email && photoUrl,
    },
    {
      title: "Post Content",
      isValid: () => title && description,
    },
    {
      title: "Upload Image",
      isValid: () => image,
    },
  ], [authorName, email, photoUrl, title, description, image]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      await uploadTask;

      const url = await getDownloadURL(uploadTask.snapshot.ref);

      const data = {
        author: authorName,
        email,
        photoUrl,
        imageUrl: url,
        userId: Date.now().toString(),
        title,
        description,
        time: serverTimestamp(),
      };

      await addDoc(collection(db, "post"), data);
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(current => current + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(current => current - 1);
    }
  };

  const renderFormSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo URL
              </label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your photo URL"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter post title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                placeholder="Enter post description"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-purple-500 cursor-pointer hover:bg-purple-50 transition-all duration-300">
                <Camera className="w-8 h-8 text-purple-500" />
                <span className="mt-2 text-base">Select an image</span>
                <input
                  type="file"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {previewUrl && (
                <div className="mt-4 relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-xs rounded-lg shadow-md"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    Selected
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 p-6 font-sans">
      <div className="mx-auto max-w-4xl relative">
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-rose-400 to-orange-400 rounded-full opacity-20 blur-xl animate-pulse" />

        {/* Main Form Card */}
        <form onSubmit={handleSubmit} className="relative">
          {/* Progress Bar */}
          <div className="mb-8 bg-white/50 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex justify-between mb-2">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`flex-1 ${
                    index !== sections.length - 1 ? "mr-2" : ""
                  }`}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index <= currentSection
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-gray-200"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="text-center text-sm font-medium text-gray-700">
              {sections[currentSection].title} - Step {currentSection + 1} of {sections.length}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            {renderFormSection()}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between px-4">
            <button
              type="button"
              onClick={prevSection}
              className={`rounded-lg px-6 py-2 text-sm font-medium transition-all duration-300 ${
                currentSection === 0
                  ? "invisible"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400"
              }`}
            >
              Previous
            </button>
            {currentSection === sections.length - 1 ? (
              <button
                type="submit"
                disabled={isLoading || !sections[currentSection].isValid()}
                className="rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 px-8 py-3 text-sm font-medium text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </div>
                ) : (
                  "Publish Post"
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextSection}
                disabled={!sections[currentSection].isValid()}
                className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 text-sm font-medium text-white transition-all duration-300 disabled:opacity-50 transform hover:scale-105"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Post;