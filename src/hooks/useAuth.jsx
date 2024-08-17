import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

const useAuth = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      setMessage("사용자 프로필을 가져오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchUserProfile();
    }
  }, []);

  const signin = async (email, password, setIsLoggedIn) => {
    try {
      const response = await axiosInstance.post("/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setMessage(response.data.message);
      setIsLoggedIn(true);
      fetchUserProfile();
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Signin failed", error);
      setMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const signup = async (email, password, schoolName, nickName) => {
    try {
      const response = await axiosInstance.post("/auth/signup", {
        email,
        password,
        schoolName,
        nickName,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/signin"), 1000);
    } catch (error) {
      console.error("Signup failed", error);
      setMessage("이미 존재하는 이메일입니다.");
    }
  };

  const updateProfile = async (formData) => {
    try {
      const response = await axiosInstance.patch("/auth/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(response.data); // 수정된 프로필 데이터로 사용자 상태 업데이트
      setMessage("프로필이 성공적으로 업데이트되었습니다.");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      console.error("Profile update failed", error);
      setMessage("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
      setMessage("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const deleteAccount = async () => {
    try {
      await axiosInstance.delete("/auth/me");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      navigate("/signin");
    } catch (error) {
      console.error("Account deletion failed", error);
      setMessage("계정 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return {
    message,
    user,
    signin,
    signup,
    updateProfile,
    logout,
    deleteAccount,
    fetchUserProfile,
  };
};

export default useAuth;
