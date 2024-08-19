import { useState, useCallback } from "react";
import axiosInstance from "../api/axios";

const useComment = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/post/${postId}/comments`);
      setComments(organizeComments(response.data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const organizeComments = (commentsData) => {
    const commentMap = new Map();
    const rootComments = [];

    commentsData.forEach((comment) => {
      comment.replies = comment.replies || [];
      commentMap.set(comment.id, comment);
    });

    commentsData.forEach((comment) => {
      if (comment.parentCommentId) {
        const parentComment = commentMap.get(comment.parentCommentId);
        if (parentComment) {
          parentComment.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  };

  const createComment = async (createCommentDto) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/post/${postId}/comments`,
        createCommentDto
      );

      setComments((prevComments) => {
        if (createCommentDto.parentCommentId) {
          return organizeComments([...prevComments, response.data]);
        } else {
          return [...prevComments, response.data];
        }
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (commentId, updateCommentDto) => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(
        `/post/${postId}/comments/${commentId}`,
        updateCommentDto
      );
      setComments((prevComments) => {
        const updatedComments = prevComments.map((c) =>
          c.id === commentId ? { ...c, ...response.data } : c
        );
        return organizeComments(updatedComments);
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/post/${postId}/comments/${commentId}`);
      setComments((prevComments) => {
        const filteredComments = prevComments.filter((c) => c.id !== commentId);
        return organizeComments(filteredComments);
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    loading,
    error,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
  };
};

export default useComment;
