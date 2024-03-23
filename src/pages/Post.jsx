import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/configs";
import { Button, Container } from "../components";
import Loader from "../components/Loader";

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const {userData} = useSelector((state) => state.auth.userData);

  useEffect(() => {
    setLoading(true);
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          setLoading(false);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const isAuthor =
    post && userData ? post.userId === userData.$id : false;

  return (
    <div className="py-8 relative">
      {loading ? (
        <div className="w-[80vw] h-[60vh] flex justify-start items-start">
          <Loader />
        </div>
      ) : (
        post && (
          <Container>
            <div className="flex justify-center items-center ">
              <div className="w-full md:w-[50%] md:h-[50%] flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                  src={service.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-xl w-full h-full object-fill"
                />

                {isAuthor && (
                  <div className="absolute right-6 top-6">
                    <Link to={`/edit-post/${slug}`}>
                      <Button className="mr-3" bgColor="bg-green-500">
                        Edit
                      </Button>
                    </Link>
                    <Link to={`/edit-post/${post.$id}`}>
                      <Button onClick={deletePost} bgColor="bg-red-500">
                        Delete
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full mb-6">
              <h1 className="text-2xl dark:text-white font-bold">
                {post.title}
              </h1>
            </div>
            <div
              className="browser-css dark:text-white"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            ></div>
          </Container>
        )
      )}
    </div>
  );
};

export default Post;
