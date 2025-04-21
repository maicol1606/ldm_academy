import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const DocenteNew = () => {
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
  });

  const handleChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/docentes/agregarDocente', user);
      
      if (response.status === 200) {
        Alert.alert('Éxito', response.data.message, [
          {
            text: 'Aceptar',
            onPress: () => {
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Error al crear el Docente');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error al crear el Docente');
    }
  };

  const handleClear = () => {
    setUser({
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '',
      telefono: '',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Docente</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={user.nombre}
          onChangeText={(value) => handleChange('nombre', value)}
          placeholder="Nombre"
          maxLength={27}
        />
        
        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          value={user.apellido}
          onChangeText={(value) => handleChange('apellido', value)}
          placeholder="Apellido"
          maxLength={40}
        />
        
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          value={user.correo}
          onChangeText={(value) => handleChange('correo', value)}
          placeholder="Correo"
          keyboardType="email-address"
          maxLength={40}
        />
        
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={user.contrasena}
          onChangeText={(value) => handleChange('contrasena', value)}
          placeholder="Contraseña"
          secureTextEntry
          maxLength={20}
        />
        
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={user.telefono}
          onChangeText={(value) => handleChange('telefono', value)}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          maxLength={15}
        />
        
        <View style={styles.buttonContainer}>
          <Button title="Limpiar" onPress={handleClear} color="#6c757d" />
          <Button title="Guardar" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DocenteNew;
