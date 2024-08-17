import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Button from "../../../components/Button/Button";
import styles from "./Signup.module.css";

function SignupPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [nickName, setNickName] = useState("");
  const { message, signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    signup(email, password, schoolName, nickName, setIsLoggedIn);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>회원가입</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            minLength={6}
            maxLength={50}
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            maxLength={20}
            pattern="^[a-zA-z0-9]*$"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="schoolName">학교명</label>
          <input
            type="text"
            id="schoolName"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="nickName">닉네임</label>
          <input
            type="text"
            id="nickName"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            required
            minLength={1}
            maxLength={20}
          />
        </div>
        <Button type="submit" style={{ width: "100%" }}>
          회원가입
        </Button>
        {message && <p className={styles.message}>{message}</p>}
        <p className={styles.signinLink}>
          이미 회원이신가요? <Link to="/signin">로그인</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
