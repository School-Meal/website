import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

function useMeal() {
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMealData() {
      try {
        const response = await axiosInstance.get("/meal");
        if (response.data.message) {
          setMealData({ meals: [], schoolName: "" });
        } else {
          setMealData(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMealData();
  }, []);

  return { mealData, loading, error };
}

export default useMeal;
