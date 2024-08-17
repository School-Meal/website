import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import logo from "../../assets/images/logo.png";
import Button from "../../components/Button/Button";

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/meal");
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="Meal" className={styles.image} />
      <h1 className={styles.header}>급식 앱에 오신 것을 환영합니다</h1>
      <p className={styles.description}>
        이 앱을 통해 학교 급식 정보를 쉽게 확인할 수 있습니다.
        <br />
        오늘의 메뉴를 확인하고, 다른 학교의 급식도 함께 확인 해보세요.
      </p>
      <Button onClick={handleButtonClick}>급식 정보 확인하기</Button>
    </div>
  );
}

export default Home;
