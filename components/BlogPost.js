import Image from "next/image";
import React from "react";
import { MdImage } from "react-icons/md";
import Link from "next/link";
import moment from "moment";

const BlogPost = ({ post, className }) => {
  return (
    <Link href={post?._id ? `/objava/${post?._id}` : "/"}>
      <a
        className={`shadow-md bg-white rounded-xl text-left hover:shadow-lg transition-shadow ${className}`}
      >
        {post?.image ? (
          <img
            className="w-full h-auto rounded-lg"
            src={post.image}
            width={200}
            height={200}
          />
        ) : (
          <div className="bg-gray-300 rounded-t-xl flex flex-row h-40 items-center justify-center">
            <MdImage size={60} />
          </div>
        )}
        <div className="p-4 rounded-b-xl">
          <h3 className="text-xl font-semibold">{post?.title}</h3>
          <p className="mt-1 font-light">{post?.description}</p>
          <p className="mt-1 text-sm">
            {post?.author?.name} | {moment(post?.date).format("DD/MM/YYYY")}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPost;
