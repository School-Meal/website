import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import Button from "../../../components/Button/Button";
import styles from "./PostEdit.module.css";
import upload from "../../../assets/images/upload.png";

const PostEdit = () => {
  const { id } = useParams();
  const { post, fetchPost, updatePost, loading, error } = usePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadPost = async () => {
      await fetchPost(id);
    };
    loadPost();
  }, [id, fetchPost]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    await updatePost(id, formData);
    setSuccessMessage("게시글이 성공적으로 수정되었습니다!");
    setTimeout(() => navigate(`/post/${id}`), 1000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className={styles.error}>{error.message}</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>게시글 수정</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textarea}
        required
      />
      <div
        className={`${styles.fileInputWrapper} ${
          isDragging ? styles.dragging : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleFileButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className={styles.fileInput}
          accept="image/*"
        />
        <div className={styles.fileButton}>
          <img src={upload} alt="Upload" className={styles.uploadIcon} />
          <span>{image ? "파일 첨부됨" : "여기에 파일을 끌어다 놓습니다"}</span>
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: "#03A9F4",
          color: "#fff",
        }}
      >
        수정
      </Button>
      {error && <p className={styles.error}>{error.message}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  );
};

export default PostEdit;
