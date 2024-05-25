import React from "react";

const ErrorPage = ({ error = {}, errorInfo = {} }) => {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-3 text-white font-medium bg-gray-900/50 w-full">
      <h1>Something went wrong</h1>

      <button className="btn" onClick={() => window.location.reload()}>
        Reload Page
      </button>

      <details style={{ whiteSpace: "pre-wrap" }}>
        {error && error.toString()}
        <br />
        {errorInfo && errorInfo.componentStack}
      </details>
    </div>
  );
};

export default ErrorPage;
