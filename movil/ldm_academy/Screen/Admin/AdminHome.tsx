import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

// Si tienes un componente de navegación personalizado
import NavegacionAdmin from "./NavegacionAdmin";

interface Estadisticas {
  total?: number;
  finalizados?: number;
  enProceso?: number;
  postulados?: number;
}

interface Estudiante {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  curso: string;
}

const AdminHome: React.FC = () => {
  const [datos, setDatos] = useState<Estadisticas>({});
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  useEffect(() => {
    axios.get("http://192.168.1.11:3000/api/obtenerEstadisticas")
      .then(res => setDatos(res.data))
      .catch(err => console.error("Error al cargar estadísticas:", err));

    axios.get("http://192.168.1.11:3000/api/estudiantes/llamarEstudiantes")
      .then(res => setEstudiantes(res.data))
      .catch(err => {
        console.error("Error al obtener estudiantes:", err);
        setEstudiantes([]);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <NavegacionAdmin />

      <Text style={styles.header}>Panel de Estadísticas</Text>

      <View style={styles.statsContainer}>
        <View style={[styles.card, { backgroundColor: "#343a40" }]}>
          <Text style={styles.cardTitle}>Total de Estudiantes</Text>
          <Text style={styles.cardValue}>{datos.total ?? 0}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: "#28a745" }]}>
          <Text style={styles.cardTitle}>Finalizados</Text>
          <Text style={styles.cardValue}>{datos.finalizados ?? 0}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: "#ffc107" }]}>
          <Text style={styles.cardTitle}>En Proceso</Text>
          <Text style={styles.cardValue}>{datos.enProceso ?? 0}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: "#007bff" }]}>
          <Text style={styles.cardTitle}>Postulados</Text>
          <Text style={styles.cardValue}>{datos.postulados ?? 0}</Text>
        </View>
      </View>

      <Text style={styles.header}>Lista de Estudiantes</Text>

      <View style={styles.table}>
        {estudiantes.map((usuario, index) => (
          <View key={usuario.id_usuario} style={styles.tableRow}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{usuario.nombre}</Text>
            <Text style={styles.cell}>{usuario.apellido}</Text>
            <Text style={styles.cell}>{usuario.correo}</Text>
            <Text style={styles.cell}>{usuario.telefono}</Text>
            <Text style={styles.cell}>{usuario.curso}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  cardValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  cell: {
    width: "33%",
    padding: 4,
    fontSize: 14,
  },
});

export default AdminHome;
