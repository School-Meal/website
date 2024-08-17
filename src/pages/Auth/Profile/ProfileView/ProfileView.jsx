import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../../components/Button/Button";
import styles from "./ProfileView.module.css";

function ProfileView() {
  const { user } = useAuth();

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileView}>
        <h1 className={styles.title}>프로필</h1>
        <div className={styles.imageContainer}>
          {user.imageUri ? (
            <img
              className={styles.profileImage}
              src={user.imageUri}
              alt="Profile"
            />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
        </div>
        <div className={styles.info}>
          <p>
            <strong>이메일:</strong> {user.email || "N/A"}
          </p>
          <p>
            <strong>닉네임:</strong> {user.nickName || "N/A"}
          </p>
          <p>
            <strong>학교:</strong> {user.schoolName || "N/A"}
          </p>
        </div>
        <div className={styles.actions}>
          <Link to="/profile/edit">
            <Button
              style={{
                width: "100%",
              }}
            >
              프로필 수정
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
