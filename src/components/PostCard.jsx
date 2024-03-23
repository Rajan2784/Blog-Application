import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/configs";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className=" bg-gray-100 dark:bg-zinc-900 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold dark:text-white">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
