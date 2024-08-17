import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import useLike from "../../../hooks/useLike";
import useAuth from "../../../hooks/useAuth";
import Modal from "../../../components/Modal/Modal";
import styles from "./PostDetail.module.css";

const PostDetail = () => {
  const { id } = useParams();
  const { post, fetchPost, deletePost, loading, error } = usePost();
  const { likeCount, isLiked, toggleLike } = useLike(id);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const loadPost = useCallback(async () => {
    await fetchPost(id);
  }, [id, fetchPost]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  const handleEdit = () => {
    navigate(`/post/edit/${id}`);
  };

  const handleDelete = async () => {
    await deletePost(id);
    navigate("/posts");
  };

  const handleLike = () => {
    toggleLike();
  };

  const confirmDelete = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    await handleDelete();
    setShowModal(false);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className={styles.error}>{error.message}</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  const isAuthor = user && post.author && user.id === post.author.id;

  return (
    <div className={styles.container}>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className={styles.image} />
      )}
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.content}>{post.content}</p>
      <div className={styles.likeSection}>
        <button onClick={handleLike} className={styles.likeButton}>
          {isLiked ? "💙" : "🤍"} {likeCount}
        </button>
      </div>
      {isAuthor && (
        <div className={styles.menu}>
          <button
            className={styles.menuButton}
            onClick={() => setShowMenu(!showMenu)}
          >
            ⋮
          </button>
          {showMenu && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownButton} onClick={handleEdit}>
                수정
              </button>
              <button className={styles.dropdownButton} onClick={confirmDelete}>
                삭제
              </button>
            </div>
          )}
        </div>
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        message="게시글을 정말로 삭제하시겠습니까?"
      />
    </div>
  );
};

export default PostDetail;
