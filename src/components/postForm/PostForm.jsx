import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../../appwrite/configs";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import Button from "../Button";
import Loading from "../Loading";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const submit = async (data) => {
    setError("");
    setLoading(true);
    if (post) {
      try {
        const file = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;
        if (file) {
          await service.deleteFile(post.featuredImage);
        }
        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    } else {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        try {
          const dbPost = await service.createPost({
            ...data,
            userId: userData.userData.$id,
          });
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidata: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    if (post) {
      setValue("title", post.title || "");
      setValue("slug", post.slug || "");
      // Do the same for all other fields
    }
  }, [post, setValue]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col sm:flex-row justify-center sm:justify-normal sm:items-start items-center w-full flex-wrap"
        >
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <div className="sm:w-2/3 w-full px-2">
            <Input
              label="Title :"
              placeholder="Title"
              // value={post?.title || ""}
              className="mb-4"
              {...register("title", {
                required: true,
              })}
            />

            <Input
              label="Slug :"
              placeholder="Slug"
              // value={post?.slug || ""}
              className="mb-4"
              {...register("slug", {
                required: true,
              })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <RTE
              label="Content :(Please enter only 300 words 😊)"
              name="content"
              control={control}
              defaultValue={post?.content || ""}
              {...register("content", {
                required: true,
              })}
            />
          </div>

          <div className="w-full md:w-1/3 px-2">
            <Input
              label="Featured Image :"
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", {
                required: !post,
              })}
            />
            {post && (
              <div className="w-full mb-4">
                <img
                  src={
                    post.featuredImage
                      ? service.getFilePreview(post.featuredImage)
                      : ""
                  }
                  alt={post.title}
                  className="rounded-lg"
                />
              </div>
            )}
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
            />
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="w-full"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PostForm;
