import React, { useEffect, useState } from "react";
import service from "../appwrite/configs";
import { Container, PostCard } from "../components";
import Loader from "../components/Loader";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    service.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
        setLoading(false);
      }
    });
  }, []);
  console.log(posts);
  return (
    <div className="w-full py-8 relative">
      {loading ? (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-center justify-center">
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : (
        <Container>
          <div className="flex flex-wrap w-full gap-1 justify-center items-center sm:justify-start sm:items-start">
            {Array.isArray(posts) &&
              posts.map((post) => (
                <div key={post.$id} className="p-2">
                  <PostCard {...post} />
                </div>
              ))}
          </div>
        </Container>
      )}
    </div>
  );
};

export default AllPosts;
