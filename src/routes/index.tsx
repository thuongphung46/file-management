import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "component/pages/error";
import { HomePage } from "component/pages/home/HomePage";
import { ListMenu } from "component/molecules/home/ListMenu";
import SignIn from "component/molecules/signIn/index";
import RootLayout from "component/templates/root_layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      //dashboard=======================
      {
        path: "/dashboard",
        element: <HomePage />,
        children: [{ path: "/dashboard", element: <ListMenu /> }],
      },
    ],
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    children: [{ path: "/login", element: <SignIn /> }],
  },
]);

export { router };
