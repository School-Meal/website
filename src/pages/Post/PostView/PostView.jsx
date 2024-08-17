import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import useLike from "../../../hooks/useLike";
import Button from "../../../components/Button/Button";
import styles from "./PostView.module.css";

const PostView = () => {
  const { posts, fetchPosts, loading, error } = usePost();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className={styles.error}>{error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <Button onClick={() => navigate("/post/create")}>게시글 작성</Button>
      </div>
      {filteredPosts.length > 0 ? (
        <div className={styles.grid}>
          {filteredPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p>검색 결과를 찾을 수 없습니다.</p>
        </div>
      )}
    </div>
  );
};

const PostItem = ({ post }) => {
  const { likeCount } = useLike(post.id);

  return (
    <div className={styles.post}>
      <Link to={`/post/${post.id}`} className={styles.link}>
        <div className={styles.imageContainer}>
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.content}>{post.content.substring(0, 100)}</p>
        <div className={styles.likeCount}>💙 {likeCount}</div>
      </Link>
    </div>
  );
};

export default PostView;
