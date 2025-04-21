import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

interface Estudiante {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  curso: string;
}

const EstudianteList: React.FC = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const res = await axios.get('http://192.168.1.11:3000/api/estudiantes/llamarEstudiantes');
        setEstudiantes(res.data);
      } catch (error) {
        console.error('Error al obtener estudiantes:', error);
      }
    };

    fetchEstudiantes();
  }, []);

  const eliminarEstudiante = (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de borrar al estudiante?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí, borrar', onPress: async () => await handleDelete(id) },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`http://192.168.1.11:3000/api/estudiantes/eliminarEstudiante/${id}`);
      if (res.status === 200) {
        Alert.alert('Estudiante borrado', 'El estudiante ha sido borrado');
        setEstudiantes(prevEstudiantes => prevEstudiantes.filter(estudiante => estudiante.id_usuario !== id));
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error al eliminar al estudiante');
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Editar usuario con ID: ${id}`);
  };

  const renderItem = ({ item }: { item: Estudiante }) => (
    <View style={styles.row}>
      <Text style={styles.text}>{item.nombre}</Text>
      <Text style={styles.text}>{item.apellido}</Text>
      <Text style={styles.text}>{item.correo}</Text>
      <Text style={styles.text}>{item.telefono}</Text>
      <Text style={styles.text}>{item.curso}</Text>
      <View style={styles.actions}>
        <Button title="Editar" onPress={() => handleEdit(item.id_usuario)} />
        <Button title="Eliminar" color="red" onPress={() => eliminarEstudiante(item.id_usuario)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Listado de estudiantes en plataforma</Text>
      <FlatList
        data={estudiantes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_usuario.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  text: {
    flex: 1,
    marginRight: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default EstudianteList;
