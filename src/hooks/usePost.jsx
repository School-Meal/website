import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axios";
import useAuth from "./useAuth";

const usePost = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/post");
      setPosts(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPost = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/post/${id}`);
      setPost(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/post", data);
      setPosts((prevPosts) => [...prevPosts, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePost = useCallback(async (id, data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/post/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPost(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePost = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await axiosInstance.delete(`/post/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return {
    posts,
    post,
    loading,
    error,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
  };
};

export default usePost;
