import "./index.css"; 
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UrlProvider from "./context"; 

import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import LinkPage from "./pages/link";
import RedirectLink from "./pages/redirect-link";
import RequireAuth from "./components/require-auth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: <RequireAuth>
                <Dashboard />
                  </RequireAuth>,
      },
      {
        path: "/link/:id",
        element: <RequireAuth>
                    <LinkPage />
                  </RequireAuth>,
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    // CHANGE: Wrapped the RouterProvider inside your UrlProvider
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;