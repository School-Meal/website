import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import Button from "../../../components/Button/Button";
import styles from "./PostCreate.module.css";
import upload from "../../../assets/images/upload.png";

const PostCreate = () => {
  const { createPost, loading, error } = usePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    await createPost(formData);
    setSuccessMessage("게시글이 성공적으로 생성되었습니다!");
    setTimeout(() => navigate("/posts"), 1000);
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

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>게시글 생성</h1>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        required
      />
      <textarea
        placeholder="내용"
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
      <Button type="submit" disabled={loading}>
        게시글 생성
      </Button>
      {error && <p className={styles.error}>{error.message}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  );
};

export default PostCreate;
