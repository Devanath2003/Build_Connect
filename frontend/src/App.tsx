
import {Routes, Route} from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";



import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";



function App() {
  const token = useAuthStore((state) => state.token);
  const fetchCurrentUser = useAuthStore(
    (state) => state.fetchCurrentUser
  );

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    }
  }, [token,fetchCurrentUser]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </>
  );
}

export default App;