import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "component/pages/error";
import { HomePage } from "component/pages/home/HomePage";
import { ListUser } from "component/molecules/home/ListUser";
import { ListPlaylist } from "component/molecules/home/ListpPaylists";
import { SongList } from "component/molecules/home/SongList";
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
        path: "/listuser",
        element: <HomePage />,
        children: [
          { path: "/listuser", element: <ListUser /> },
          { path: "/listuser/playlists/:id", element: <ListPlaylist /> },
          { path: "/listuser/playlists/song/:id", element: <SongList /> },
        ],
      },
      {
        path: "/listsong",
        element: <HomePage />,
        children: [{ path: "/listsong", element: <SongList /> }],
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
