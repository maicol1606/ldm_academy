import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList, StyleSheet } from 'react-native';

const DocenteList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = [
        { id_usuario: 1, nombre: 'Juan', apellido: 'Pérez', correo: 'juan@example.com', telefono: '123456789', curso: 'Matemáticas' },
        { id_usuario: 2, nombre: 'Ana', apellido: 'García', correo: 'ana@example.com', telefono: '987654321', curso: 'Física' },
      ];
      setUsuarios(data);
    };
    fetchUsuarios();
  }, []);

  const handleEdit = (id) => {
    Alert.alert('Editar Usuario', `Estás editando el usuario con ID: ${id}`);
  };

  const handleDelete = (id) => {
    Alert.alert(
      '¿Estás seguro?',
      '¡No podrás deshacer esta acción!',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí, eliminarlo!',
          onPress: () => {
            setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== id));
            Alert.alert('Eliminado!', 'El usuario ha sido eliminado.');
          },
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text>{index + 1}. {item.nombre} {item.apellido}</Text>
      <Text>{item.correo} - {item.telefono}</Text>
      <Text>Curso: {item.curso}</Text>
      <Button title="Editar" onPress={() => handleEdit(item.id_usuario)} />
      <Button title="Eliminar" onPress={() => handleDelete(item.id_usuario)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={usuarios}
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
    backgroundColor: '#fff',
  },
  row: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
});

export default DocenteList;
