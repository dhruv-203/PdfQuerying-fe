import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { RootState } from "../store";
import { useLazyCheckUserQuery } from "../store/auth.api";
import { User } from "../store/types";

function ProtectedRoute() {
  const location = useLocation();
  const user = useSelector<RootState, User | null>((state) => state.auth.user);
  const [checkUser, { isLoading }] = useLazyCheckUserQuery();
  useEffect(() => {
    if (!user) {
      checkUser()
        .unwrap()
        .catch((err) => {
          console.log(err);
        });
    }
  }, [checkUser, user]);
  if (user && isLoading === false) {
    
    if (location.pathname.includes("/auth")) {
      return <Navigate to="/" />;
    } else {
      return <Outlet />;
    }
  } else if (isLoading === false && user === null) {
    if (!location.pathname.includes("/auth")) {
      return <Navigate to="/auth/login" />;
    } else {
      return <Outlet />;
    }
  } else {
    return (
      <MainLayout>
        <div className="flex h-100 flex-col items-center justify-center">
          <h1 className="text-4xl py-5 font-bold text-white text-center">
            Authenticating...
          </h1>
        </div>
      </MainLayout>
    );
  }

  // return <div></div>;
}

export default ProtectedRoute;
