import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Button from "../../../components/Button/Button";
import styles from "./Signin.module.css";

function SigninPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { message, signin } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(email, password, setIsLoggedIn);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>로그인</h2>
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
        <Button type="submit" style={{ width: "100%" }}>
          로그인
        </Button>
        {message && <p className={styles.message}>{message}</p>}
        <p className={styles.signupLink}>
          아직 회원가입을 안하셨나요? <Link to="/signup">회원가입</Link>
        </p>
      </form>
    </div>
  );
}

export default SigninPage;
