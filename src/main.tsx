import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Login from "./auth/Login.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import Register from "./auth/Register.tsx";
import "./index.css";
import { store } from "./store/index.ts";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");
const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    path: "/",
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
  {
    path: "/auth",
    element: <ProtectedRoute />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
