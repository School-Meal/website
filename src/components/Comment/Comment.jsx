import React, { useState } from "react";
import styles from "./Comment.module.css";

function Comment({
  comment,
  onReply,
  onEdit,
  onDelete,
  currentUserId,
  depth = 0,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleEdit = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setShowReplyForm(false);
      setReplyContent("");
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (action === "edit") {
        handleEdit();
      } else if (action === "reply") {
        handleReply();
      }
    }
  };

  return (
    <div
      className={`${styles.comment} ${depth > 0 ? styles.replyComment : ""}`}
    >
      <div className={styles.commentHeader}>
        <span className={styles.author}>{comment.author.username}</span>
        <span className={styles.date}>
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      {isEditing ? (
        <div className={styles.editForm}>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, "edit")}
            className={styles.editInput}
            required
          />
          <button onClick={handleEdit} className={styles.button}>
            저장
          </button>
          <button onClick={() => setIsEditing(false)} className={styles.button}>
            취소
          </button>
        </div>
      ) : (
        <p className={styles.content}>{comment.content}</p>
      )}
      <div className={styles.actions}>
        {depth < 2 && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className={styles.button}
          >
            답글
          </button>
        )}
        {currentUserId === comment.author.id && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className={styles.button}
            >
              수정
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              className={styles.button}
            >
              삭제
            </button>
          </>
        )}
      </div>
      {showReplyForm && (
        <div className={styles.replyForm}>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, "reply")}
            placeholder="답글을 입력하세요."
            className={styles.replyInput}
            required
          />
          <button onClick={handleReply} className={styles.button}>
            답글 작성
          </button>
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              currentUserId={currentUserId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
