import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../../components/Button/Button";
import styles from "./ProfileEdit.module.css";
import basicProfile from "../../../../assets/images/basic-profile.png";

function ProfileEdit() {
  const { user, updateProfile, message, fetchUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    nickName: "",
    schoolName: "",
    imageUri: null,
    email: "",
  });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserProfile();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        nickName: user.nickName || "",
        schoolName: user.schoolName || "",
        email: user.email || "",
        imageUri: user.imageUri || null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nickName", formData.nickName);
    data.append("schoolName", formData.schoolName);
    data.append("email", formData.email);
    if (formData.imageUri && typeof formData.imageUri !== "string") {
      data.append("image", formData.imageUri);
    }
    await updateProfile(data);
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileEdit}>
        <h1 className={styles.title}>프로필 수정</h1>
        <div className={styles.imageContainer} onClick={handleImageClick}>
          {formData.imageUri ? (
            <img
              className={styles.profileImage}
              src={
                typeof formData.imageUri === "string"
                  ? formData.imageUri
                  : URL.createObjectURL(formData.imageUri)
              }
              alt="Profile"
            />
          ) : (
            <img
              className={styles.profileImage}
              src={basicProfile}
              alt="Basic Profile"
            />
          )}
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="file"
            id="imageUri"
            name="imageUri"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <div className={styles.formGroup}>
            <label htmlFor="nickName">닉네임:</label>
            <input
              type="text"
              id="nickName"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="schoolName">학교:</label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button type="submit">수정 완료</Button>
            <Button type="button" onClick={handleCancel}>
              취소
            </Button>
          </div>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

export default ProfileEdit;
