import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserPostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    gif: {
      type: String,
    },
    file: {
      type: String,
    },
    emoji: {
      type: String,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    poll: {
      type: String,
    },
    location: {
      type: String,
    },
    comments: [CommentSchema], // Array of comments
    commentsCount : {
      type: Number,
      default: 0
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // List of users who liked the post
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    shares: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ], // Track who shared and when
    save: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // List of users who saved the post
      },
    ],
    reposts: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ], // Track reposts with user info
    repostCount : {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Post", UserPostSchema);
