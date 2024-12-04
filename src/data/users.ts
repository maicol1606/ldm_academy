export interface User {
    id: number;
    name: string;
    email: string;
    role: "student" | "teacher";
  }
  
  const users: User[] = [
    { id: 1, name: "Juan Pérez", email: "juan.perez@example.com", role: "student" },
    { id: 2, name: "Ana Gómez", email: "ana.gomez@example.com", role: "student" },
    { id: 3, name: "Luis Martínez", email: "luis.martinez@example.com", role: "teacher" },
  ];
  
  export default users;
  