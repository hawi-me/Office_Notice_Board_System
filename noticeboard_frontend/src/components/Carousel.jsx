import React, { useState, useEffect } from 'react';
const Carousel = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 10000); // 10-second transition

    return () => clearInterval(interval);
  }, [posts.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };

  const post = posts[currentIndex];

  return (
    <div className="max-w-4xl bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6">
      <a href="#">
        <img className="rounded-t-lg w-full h-96 object-cover" src={post.image} alt={post.title} />
      </a>
      <div className="p-8 text-center">
        <a href="#">
          <h5 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
        </a>
        <p className="mb-6 text-2xl font-normal text-gray-700 dark:text-gray-400">
          {post.description}
        </p>
      </div>
      
      
      
      {/* PDF Display */}
      {/* {post.pdf && (
        <div className="mt-6">
          <iframe src={post.pdf} className="w-full h-96" title="PDF Viewer"></iframe>
        </div>
      )} */}
    </div>
  );
};

export default Carousel;
