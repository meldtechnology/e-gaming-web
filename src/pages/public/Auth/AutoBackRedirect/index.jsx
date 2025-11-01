import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AutoBackRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (window.history.length > 1) window.history.back();
      // if (window.history.length > 1) navigate(-1);
      else navigate("/", { replace: true });
    }, 100); // short delay for smoother UX
  }, [navigate]);

  return (
    <div className="p-4 text-center text-gray-500">
      Redirecting you back...
    </div>
  );
};
