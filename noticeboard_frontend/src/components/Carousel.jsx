// import React, { useState, useEffect } from 'react';

// const Carousel = ({ posts }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
//     }, 10000); // 10-second transition

//     return () => clearInterval(interval);
//   }, [posts.length]);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
//   };

//   const notice = posts[currentIndex];

//   return (
//     <div className="max-w-4xl bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6">
//       {/* Notice Image */}
//       <a href="#">
//         <img
//           className="rounded-t-lg w-full h-96 object-cover"
//           src={notice.image || 'https://via.placeholder.com/800x400'} // Fallback image if no image is provided
//           alt={notice.title}
//         />
//       </a>

//       {/* Notice Details */}
//       <div className="p-8 text-center">
//         <a href="#">
//           <h5 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
//             {notice.title}
//           </h5>
//         </a>
//         <p className="mb-6 text-2xl font-normal text-gray-700 dark:text-gray-400">
//           {notice.description}
//         </p>

//         {/* Status and Expiration Date */}
//         <div className="flex justify-center gap-4 mb-6">
//           <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
//             Status: {notice.status}
//           </span>
//           <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
//             Expires: {new Date(notice.expires_at).toLocaleDateString()}
//           </span>
//         </div>

//         {/* PDF Display */}
//         {notice.file_path && (
//           <div className="mt-6">
//             <iframe
//               src={notice.file_path}
//               className="w-full h-96"
//               title="PDF Viewer"
//             ></iframe>
//           </div>
//         )}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between mt-4">
//         <button
//           onClick={prevSlide}
//           className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//         >
//           Previous
//         </button>
//         <button
//           onClick={nextSlide}
//           className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Carousel;