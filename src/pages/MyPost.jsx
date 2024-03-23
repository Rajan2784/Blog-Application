import React, { useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/configs";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const MyPost = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  service.getCurrentUserPosts(userData.userData.$id).then((post) => {
    if (post) {
      setPosts(post.documents);
      setLoading(false);
    }
  });
  return (
    <div className="w-full py-8 relative">
      {loading ? (
        <div className="w-[90vw] h-[90vh] flex flex-col gap-4 sm:flex-row justify-center sm:justify-start items-center sm:items-start">
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : (
        <Container>
          <div className="flex flex-wrap justify-center items-center sm:justify-start sm:items-start w-full gap-1">
            {posts.length === 0 ? (
              <h1 className="text-2xl font-bold dark:text-white animate-bounce">No Blogs created!!</h1>
            ) : (
              posts.map((post) => (
                <div key={post.$id} className="p-2">
                  <PostCard {...post} />
                </div>
              ))
            )}
          </div>
        </Container>
      )}
    </div>
  );
};
export default MyPost;
