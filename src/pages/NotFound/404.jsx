import React from "react";

function NotFoundPage() {
  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ minHeight: "100vh" }}
    >
      <div className="container px-4">
        <h3 className="inline-block pr-5 mb-2 text-xl font-bold border-b">
          Oops!
        </h3>
        <p>없는 페이지 이거나 접속할 수 없습니다!</p>
        <p>
          <b>올바른 경로</b>에 접속하세요.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
