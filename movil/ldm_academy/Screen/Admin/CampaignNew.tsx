import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
const jwt_decode = require('jwt-decode');

const CampaignNew = () => {
  const [campaña, setCampaña] = useState({
    nom_campana: '',
    descripcion: '',
    fecha: '',
    cupos: '',
    id_docente: '',
    foto: null,
  });

  const [image, setImage] = useState<string | null>(null);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setCampaña((prev) => ({
        ...prev,
        id_docente: decodedToken.id,
      }));
    }
  };
  React.useEffect(() => {
    getToken();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('nom_campana', campaña.nom_campana);
    formData.append('descripcion', campaña.descripcion);
    formData.append('fecha', campaña.fecha);
    formData.append('cupos', campaña.cupos);
    formData.append('id_docente', campaña.id_docente);

    if (campaña.foto) {
      const file = {
        uri: campaña.foto,
        name: 'campaña_imagen.jpg',
        type: '', 
      };
      formData.append('foto', file);
    }

    try {
      const res = await axios.post('http://192.168.1.11:3000/api/campanas/agregarCampana', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 200) {
        Alert.alert("Éxito", res.data.title);
        setCampaña({
          nom_campana: '',
          descripcion: '',
          fecha: '',
          cupos: '',
          id_docente: '',
          foto: null,
        });
      } else {
        Alert.alert("Error", 'Error al crear la campaña');
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.response?.data?.title || 'Error inesperado');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setCampaña({
        ...campaña,
        foto: result.uri,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Campaña</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la campaña"
          value={campaña.nom_campana}
          onChangeText={(text) => setCampaña({ ...campaña, nom_campana: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de cupos"
          keyboardType="numeric"
          value={campaña.cupos}
          onChangeText={(text) => setCampaña({ ...campaña, cupos: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción de la campaña"
          multiline
          numberOfLines={4}
          value={campaña.descripcion}
          onChangeText={(text) => setCampaña({ ...campaña, descripcion: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio"
          value={campaña.fecha}
          onChangeText={(text) => setCampaña({ ...campaña, fecha: text })}
        />
        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Button title="Subir foto de campaña" onPress={pickImage} />
        </View>
        <Button title="Crear Campaña" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default CampaignNew;
