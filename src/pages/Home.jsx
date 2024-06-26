import React, { useEffect, useState } from "react";
import service from "../appwrite/configs";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { setPostInStore } from "../store/postSlice";

const Home = () => {
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const postsInStore = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  useEffect(() => {
    // setLoading(true);
    service.getPosts().then((posts) => {
      if (posts) {
        dispatch(setPostInStore(posts.documents));
        // setLoading(false);
      }
    });
  }, []);
  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold dark:text-white animate-bounce">
                Please Login first to see the contents!!
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

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
            {postsInStore.map((post) => (
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

export default Home;
