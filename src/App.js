import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import Home from "./components/Home/Home";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./components/register/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
