import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "component/pages/error";
import { HomePage } from "component/pages/home/HomePage";
import { ListUser } from "component/molecules/home/ListUser";
import { ListPlaylist } from "component/molecules/home/ListpPaylists";
import { SongList } from "component/molecules/home/SongList";
import { PlayList } from "component/molecules/home/PlayList";
import SignIn from "component/molecules/signIn/index";
import RootLayout from "component/templates/root_layout/RootLayout";
import PlayListPage from "component/organisms/playlist/index";

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
      // {
      //   path: "/playlist",
      //   element: <HomePage />,
      //   children: [{ path: "/playlist", element: <PlayList /> }],
      // },
      {
        path: "playlist",
        element: <PlayListPage />,
        children: [{ path: ":version", element: <PlayListPage /> }],
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
