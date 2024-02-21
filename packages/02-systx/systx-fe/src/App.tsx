import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";

import { Login } from "./views";
import { Register } from "./views";

function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
