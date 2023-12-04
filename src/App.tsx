import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainRoutes from "./routes/routes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<MainRoutes />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
