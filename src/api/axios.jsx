import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:80",
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 오류가 발생하고, 리프레시 토큰이 존재할 때
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 방지 플래그 설정
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await axiosInstance.get("/auth/refresh", {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          const { accessToken } = response.data;

          localStorage.setItem("accessToken", accessToken); // 새로운 액세스 토큰 저장
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest); // 원래 요청 재시도
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          // 리프레시 토큰도 만료된 경우 로그아웃 처리
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/signin"; // 로그인 페이지로 리다이렉트
        }
      } else {
        // 리프레시 토큰이 없는 경우 로그아웃 처리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/signin"; // 로그인 페이지로 리다이렉트
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
