import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import IndexPage from "./pages/Home/Home";
import NotFoundPage from "./pages/NotFound/404";
import SignupPage from "./pages/Auth/Signup/Signup";
import SigninPage from "./pages/Auth/Signin/Signin";
import ProfileView from "./pages/Auth/Profile/ProfileView/ProfileView";
import ProfileEdit from "./pages/Auth/Profile/ProfileEdit/ProfileEdit";
import TopNav from "./components/TopNav/TopNav";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Meal from "./pages/Meal/Meal";
import PostView from "./pages/Post/PostView/PostView";
import PostCreate from "./pages/Post/PostCreate/PostCreate";
import PostEdit from "./pages/Post/PostEdit/PostEdit";
import PostDetail from "./pages/Post/PostDetail/PostDetail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  return (
    <div className="App">
      <TopNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <IndexPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/signin"
          element={<SigninPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfileView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meal"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Meal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PostView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/create"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PostCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PostDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/edit/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PostEdit />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
