import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

export default function CampaignNew() {
  const navigation = useNavigation();
  const [campaign, setCampaign] = useState({
    nom_campana: '',
    descripcion: '',
    fecha: '',
    cupos: '',
    foto: null,
  });

  const [imageUri, setImageUri] = useState(null);

  // Solicitar permisos para acceder a la galería o cámara
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Lo siento, necesitamos permisos para acceder a la galería de imágenes.');
    }
  };

  const pickImage = async () => {
    await requestPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      setCampaign({ ...campaign, foto: result.uri });
    }
  };

  const handleChange = (name: string, value: string) => {
    setCampaign({
      ...campaign,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('nom_campana', campaign.nom_campana);
    formData.append('descripcion', campaign.descripcion);
    formData.append('fecha', campaign.fecha);
    formData.append('cupos', campaign.cupos);

    if (campaign.foto) {
      const uri = campaign.foto;
      const fileName = uri.split('/').pop();
      const fileType = uri.split('.').pop();
      const file = {
        uri,
        name: fileName,
        type: `image/${fileType}`,
      };
      formData.append('foto', file);
    }

    try {
      const response = await axios.post('http://192.168.1.11:3000/api/campanas/agregarCampana', formData);
      if (response.status === 200) {
        showMessage({
          message: response.data.title,
          type: 'success',
        });
        // Resetear el formulario
        setCampaign({
          nom_campana: '',
          descripcion: '',
          fecha: '',
          cupos: '',
          foto: null,
        });
        setImageUri(null);
      } else {
        showMessage({
          message: 'Error al crear la campaña',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error(error);
      showMessage({
        message: 'Error de conexión o al procesar los datos',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Campaña</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la campaña"
        value={campaign.nom_campana}
        onChangeText={(text) => handleChange('nom_campana', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de cupos"
        value={campaign.cupos}
        keyboardType="numeric"
        onChangeText={(text) => handleChange('cupos', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={campaign.descripcion}
        onChangeText={(text) => handleChange('descripcion', text)}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de inicio"
        value={campaign.fecha}
        onChangeText={(text) => handleChange('fecha', text)}
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      <View style={styles.buttonsContainer}>
        <Button title="Limpiar" onPress={() => setCampaign({ nom_campana: '', descripcion: '', fecha: '', cupos: '', foto: null })} />
        <Button title="Guardar" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  imageButton: {
    backgroundColor: '#1D4ED8',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  imageButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
