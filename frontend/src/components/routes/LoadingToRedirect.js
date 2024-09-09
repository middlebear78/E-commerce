import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((current) => {
        if (current === 1) {
          clearInterval(interval);
          navigate("/login");
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="container p-5 text-center">
      <h4>Redirecting You in {count} seconds...</h4>
    </div>
  );
}

export default LoadingToRedirect;
