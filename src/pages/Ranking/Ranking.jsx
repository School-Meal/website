import React from "react";
import useRanking from "../../hooks/useRanking";
import styles from "./Ranking.module.css";
import { useNavigate } from "react-router-dom";

function Ranking() {
  const { rankedPosts } = useRanking();
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className={styles.rankingContainer}>
      <h1 className={styles.title}>이달의 급식 랭킹</h1>
      <div className={styles.podium}>
        {rankedPosts.slice(0, 3).map((post, index) => (
          <div
            key={post.id}
            className={`${styles.podiumItem} ${
              styles[["gold", "silver", "bronze"][index]]
            }`}
            onClick={() => handlePostClick(post.id)}
          >
            <div className={styles.medal}>
              {index === 0 && "🥇"}
              {index === 1 && "🥈"}
              {index === 2 && "🥉"}
            </div>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 8)}...</p>
            <span className={styles.likeCount}>좋아요: {post.likeCount}</span>
          </div>
        ))}
      </div>
      <div className={styles.list}>
        {rankedPosts.slice(3).map((post, index) => (
          <div
            key={post.id}
            className={styles.listItem}
            onClick={() => handlePostClick(post.id)}
          >
            <span className={styles.rank}>{index + 4}</span>
            <div className={styles.postContent}>
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 8)}...</p>
            </div>
            <span className={styles.likeCount}>좋아요: {post.likeCount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ranking;
