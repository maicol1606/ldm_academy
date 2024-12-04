import React from "react";
import users, { User } from "../../data/users";
import "../../styles/Student.css";

const StudentManagement: React.FC = () => {
  const students = users.filter((user: User) => user.role === "student");

  return (
    <div className="student-management">
      <h2>Gestión de Estudiantes</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentManagement;
