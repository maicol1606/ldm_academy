import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export default function CampaignList() {
  const [campañas, setCampañas] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [CampañaEdit, setCampañaEdit] = useState({
    id_campaña: '',
    nom_campaña: '',
    descripcion: '',
    fecha: '',
    cupos: '',
    id_docente: '',
    foto: null,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campanasRes, docentesRes] = await Promise.all([
          axios.get('http://192.168.1.11:3000/api/campanas/mostrarCampanas'),
          axios.get('http://192.168.1.11:3000/api/docentes/obtenerDocentes'),
        ]);
        setCampañas(campanasRes.data);
        setDocentes(docentesRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChangeEdit = (name, value) => {
    setCampañaEdit({ ...CampañaEdit, [name]: value });
  };

  const handleSubmitEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('nom_campaña', CampañaEdit.nom_campaña);
      formData.append('descripcion', CampañaEdit.descripcion);
      formData.append('fecha', CampañaEdit.fecha);
      formData.append('cupos', CampañaEdit.cupos);
      formData.append('id_docente', CampañaEdit.id_docente);
      if (CampañaEdit.foto) {
        formData.append('foto', CampañaEdit.foto);
      }

      const res = await axios.put(`http://192.168.1.11:3000/api/campanas/actualizarCampana/${CampañaEdit.id_campaña}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.status === 200) {
        Alert.alert('Success', 'Campaña actualizada');
        setModalVisible(false);
        setCampañaEdit({ ...CampañaEdit, foto: null }); // reset photo
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error al actualizar la campaña');
    }
  };

  const eliminarCampaña = async (id) => {
    try {
      const confirm = await new Promise((resolve) =>
        Alert.alert(
          '¿Estás seguro de borrar esta campaña?',
          'No podrás revertir esta operación',
          [
            { text: 'Cancelar', onPress: () => resolve(false) },
            { text: 'Sí, borrar', onPress: () => resolve(true) },
          ]
        )
      );
      if (confirm) {
        const res = await axios.delete(`http://192.168.1.11:3000/api/campanas/eliminarCampana/${id}`);
        if (res.status === 200) {
          Alert.alert('Success', 'Campaña borrada');
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error al eliminar la campaña');
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 10 }}>Lista de Campañas</Text>
      
      <FlatList
        data={campañas}
        keyExtractor={(item) => item.id_campaña.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Image
              source={{ uri: `/img/campañas/${item.imagen}` }}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
            <Text style={{ fontWeight: 'bold' }}>{item.nom_campaña}</Text>
            <Text>{item.descripcion}</Text>
            <Text>{item.cupos} cupos disponibles</Text>
            <Text>{moment(item.fecha).format('DD/MM/YYYY')}</Text>
            <Text>
              Docente: {docentes.find(docente => docente.id_usuario === item.id_docente)?.nombre}
            </Text>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => { setCampañaEdit(item); setModalVisible(true); }}
              >
                <Button title="Editar" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => eliminarCampaña(item.id_campaña)}>
                <Button title="Eliminar" color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal para Editar Campaña */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <TextInput
              placeholder="Nombre de la campaña"
              value={CampañaEdit.nom_campaña}
              onChangeText={(value) => handleChangeEdit('nom_campaña', value)}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
              placeholder="Descripción"
              value={CampañaEdit.descripcion}
              onChangeText={(value) => handleChangeEdit('descripcion', value)}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
              placeholder="Fecha"
              value={CampañaEdit.fecha}
              onChangeText={(value) => handleChangeEdit('fecha', value)}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
              placeholder="Cupos"
              keyboardType="numeric"
              value={CampañaEdit.cupos}
              onChangeText={(value) => handleChangeEdit('cupos', value)}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />

            <Button title="Guardar Cambios" onPress={handleSubmitEdit} />
            <Button title="Cerrar" onPress={() => setModalVisible(false)} color="gray" />
          </View>
        </View>
      </Modal>
    </View>
  );
}
