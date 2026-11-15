import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./app/routes/AppRoutes";
import PageLoader from "./components/shared/PageLoader";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return <PageLoader />;
  }

  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <AppRoutes authUser={authUser} />
    </div>
  );
};

export default App;
