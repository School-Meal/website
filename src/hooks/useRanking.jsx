import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import usePost from "../hooks/usePost";

function useRanking() {
  const { posts, fetchPosts } = usePost();
  const [rankedPosts, setRankedPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const fetchAndRankPosts = async () => {
      const postsWithLikes = await Promise.all(
        posts.map(async (post) => {
          try {
            const response = await axiosInstance.get(`/like/count/${post.id}`);
            const likeCount = response?.data ?? 0;
            return { ...post, likeCount };
          } catch (error) {
            console.error(
              `${post.id} 게시물을 가져오는 중 오류가 발생했습니다:`,
              error
            );
            return { ...post, likeCount: 0 };
          }
        })
      );

      const sortedPosts = postsWithLikes.sort(
        (a, b) => b.likeCount - a.likeCount
      );
      setRankedPosts(sortedPosts);
    };

    if (posts.length > 0) {
      fetchAndRankPosts();
    }
  }, [posts]);

  return { rankedPosts };
}

export default useRanking;
