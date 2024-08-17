import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

function useLike(postId) {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchLikeInfo();
    }
  }, [postId]);

  const fetchLikeInfo = async () => {
    try {
      const [countResponse, userLikedResponse] = await Promise.all([
        axiosInstance.get(`/like/count/${postId}`),
        axiosInstance.get(`/like/user-liked/${postId}`),
      ]);
      setLikeCount(countResponse.data);
      setIsLiked(userLikedResponse.data);
    } catch (error) {
      console.error("Error fetching like info:", error);
    }
  };

  const toggleLike = async () => {
    try {
      if (isLiked) {
        await axiosInstance.delete(`/like/${postId}`);
      } else {
        await axiosInstance.post("/like", { postId });
      }
      await fetchLikeInfo();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return { likeCount, isLiked, toggleLike };
}

export default useLike;
