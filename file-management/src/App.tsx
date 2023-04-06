import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
