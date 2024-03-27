import React, { useState } from "react";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import service from "../appwrite/configs";
import Loader from "../components/Loader";

const MyProfile = () => {
  const { userData } = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  service.getCurrentUserPosts(userData.$id).then((post) => {
    if (post) {
      setPosts(post.documents);
      setLoading(false);
    }
  });

  return (
    <div>
      {loading ? (
        <div className="w-[90vw] h-[90vh] mt-4 flex flex-col gap-4 sm:flex-row justify-center sm:justify-start items-center sm:items-start">
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : (
        <Container>
          <div className="flex justify-center items-center">
            <Container>
              <div className="flex justify-center items-center w-full rounded-full mt-4">
                <img
                  src="/boy.jpg"
                  alt="avatar"
                  className="w-40 sm:w-60 md:w-72 md:h-72 sm:h-60 h-40 rounded-full object-cover object-center"
                />
              </div>
              <h1 className="text-2xl font-semibold text-center dark:text-white mt-4">
                Welcome <span>{userData?.name}</span> !!
              </h1>
              <p className="mt-4 mb-2 text-xl dark:text-white text-center text-black/60">
                Email: <span>{userData.email}</span>
              </p>
            </Container>
          </div>
          <h1 className="text-2xl font-semibold text-center dark:text-white mt-4">
            My Blogs:
          </h1>
          <div className="flex flex-wrap items-center w-full gap-3">
            {posts.length === 0 ? (
              <h1 className="text-2xl font-bold dark:text-white animate-bounce">
                No Blogs created!!
              </h1>
            ) : (
              posts.map((post) => (
                <div key={post.$id} className="p-2 w-80">
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

export default MyProfile;
