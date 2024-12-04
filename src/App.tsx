import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import StudentMenu from "./components/Student/StudentMenu";
import Campaigns from "./components/Student/Campaigns";
import AdminMenu from "./components/Admin/AdminMenu";
import StudentManagement from "./components/Admin/StudentManagement";
import TeacherManagement from "./components/Admin/TeacherManagement";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rutas para el estudiante */}
        <Route path="/student" element={<StudentMenu />} />
        <Route path="/student/campaigns" element={<Campaigns />} />

        {/* Rutas para el administrador */}
        <Route path="/admin" element={<AdminMenu />} />
        <Route path="/admin/students" element={<StudentManagement />} />
        <Route path="/admin/teachers" element={<TeacherManagement />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
