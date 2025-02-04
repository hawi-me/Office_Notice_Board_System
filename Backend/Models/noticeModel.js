// const { text } = require('express');
// const mongoose = require('mongoose');
// const noticeSchema = new mongoose.Schema({
//     text: {
//         type: String,
//         required: [true, 'please enter a notice']
//     },
    
// },
// {
//     timestamps: true
// })
// module.exports = mongoose.model('Notice', noticeSchema);
const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: [
      {
        url: String,
        public_id: String, // If using Cloudinary or another service
      },
    ],
    pdfs: [
      {
        url: String,
        public_id: String,
      },
    ],
    category: {
      type: String,
      enum: ["News", "Job Advertisement", "General Announcement"],
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scheduledDate: {
      type: Date,
      default: Date.now,
    },
    visibilityDuration: {
      type: Number, // In days
      default: 7, // Default to 7 days
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true } // Auto-creates createdAt and updatedAt fields
);

module.exports = mongoose.model("Notice", NoticeSchema);
