import React from "react";
import styles from "./Meal.module.css";
import useMeal from "../../hooks/useMeal";

function Meal() {
  const { mealData, loading, error } = useMeal();

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (error) {
    return <div className={styles.error}>오류: {error.message}</div>;
  }

  if (!mealData || !mealData.meals.length) {
    return <div className={styles.noMealMessage}>오늘 급식이 없습니다.</div>;
  }

  const getEmoji = (type) => {
    switch (type) {
      case "조식":
        return "🌞";
      case "중식":
        return "☀️";
      case "석식":
        return "🌙";
      default:
        return "🍽️";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>{mealData.schoolName} 오늘의 급식</div>
      <div className={styles.mealBoxContainer}>
        {mealData.meals.map((meal, index) => (
          <div key={index} className={styles.mealBox}>
            <div className={styles.mealType}>
              {getEmoji(meal.type)} {meal.type}
            </div>
            {meal.menu.map((item, idx) => (
              <div key={idx} className={styles.menuItem}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meal;
