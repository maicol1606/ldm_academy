<<<<<<< HEAD
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
=======
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import axios from 'axios'; 
//import cerrarSesion from '../hooks/cerrarSesion'; // 

interface StudentData {
  nombre: string;
  campaña: string;
  horas: string;
  telefono: string;
  correo: string;
}
>>>>>>> parent of 9044f4c (movil/estudiante 50%)

const screenWidth = Dimensions.get('window').width;

const NavegadorEstudiante = () => {
  const [hover, setHover] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>('/img/navegacion/Avatar2.png');
  const [studentData, setStudentData] = useState<StudentData>({
    nombre: '',
    campaña: '',
    horas: '',
    telefono: '',
    correo: ''
  });

 // const CerrarSesion = cerrarSesion();

  const getProfileData = async () => {
    try {
      const response = await axios.get('http://192.168.1.11:3000/api/estudiantes/profile');
      setStudentData(response.data);
      setProfileImage(response.data.profileImage || '/img/navegacion/Avatar2.png');
    } catch (error) {
      console.error('Error obteniendo los datos del perfil:', error);
    }
  };

  // Función para guardar los cambios en el perfil
  const saveProfileChanges = async () => {
    try {
      const updatedData = {
        nombre: studentData.nombre,
        campaña: studentData.campaña,
        telefono: studentData.telefono,
        correo: studentData.correo,
        profileImage: profileImage 
      };
      const response = await axios.put('http://192.168.1.11:3000/api/estudiantes/profile', updatedData); 
      alert('Perfil actualizado con éxito');
      setShowEditModal(false); 
    } catch (error) {
      console.error('Error guardando los cambios:', error);
      alert('Hubo un error al actualizar el perfil.');
    }
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
    getProfileData();  
  };

  const handleEditClick = () => {
    setShowProfileModal(false);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowProfileModal(false);
    setShowEditModal(false);
  };

<<<<<<< HEAD
  // Quitamos listaCampañas y notificaciones del menú
  const optionItems = [
    { key: 'verHoras', title: 'Ver horas', icon: 'clock-outline', route: 'Horas' },
    { key: 'infoCampaña', title: 'Información de la campaña', icon: 'information-circle-outline', route: 'HomeEstudiante' },
    { key: 'certificados', title: 'Certificados', icon: 'clipboard-outline', route: 'Certificados' },
    { key: 'cerrarSesion', title: 'Cerrar sesión', icon: 'exit-outline', route: 'Login' },
  ];
=======
  const handleImageDelete = () => setProfileImage(null);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
>>>>>>> parent of 9044f4c (movil/estudiante 50%)

  return (
    <>
      <View style={{ backgroundColor: 'dark', width: 80, height: '100%', position: 'absolute', top: 0, left: 0, paddingTop: 20 }}>
        {/* Foto de perfil */}
        <TouchableOpacity onPress={handleProfileClick}>
          <Image
            source={{ uri: profileImage || '/img/navegacion/Avatar2.png' }}
            style={{ width: 50, height: 50, borderRadius: 25, marginBottom: 10 }}
          />
        </TouchableOpacity>

        {/* Íconos de navegación */}
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          {[ 
            { icon: 'clock', text: 'Ver horas', link: '/horas' },
            { icon: 'info-circle', text: 'Información de la campaña', link: '/HomeEstudiante' },
            { icon: 'list-task', text: 'Lista de campañas', link: '/ListCampañas' },
            { icon: 'bell', text: 'Notificaciones', link: '/Notificaciones' },
            { icon: 'clipboard-check', text: 'Certificados', link: '/GenCertificados' },
            { icon: 'box-arrow-right', text: 'Cerrar sesión', link: '/' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.text === 'Cerrar sesión') {
                  {/*CerrarSesion();*/}
                  return;
                }
                
              }}
              style={{ marginBottom: 20 }}
            >
              <View>
                <Text>{item.icon}</Text>
                {hover === item.text && (
                  <Text style={{ backgroundColor: 'dark', color: 'white', paddingHorizontal: 10, paddingVertical: 5 }}>
                    {item.text}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

<<<<<<< HEAD
      {/* Scroll horizontal de opciones, con mejor ajuste */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContainer, { minWidth: screenWidth }]}
        snapToInterval={110} // Para que el scroll "encaje" con cada card (ancho + margin)
        decelerationRate="fast"
      >
        {optionItems.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.card}
            onPress={() => {
              if (item.route) {
                navigation.navigate(item.route);
              }
            }}
          >
            <Icon name={item.icon} size={30} color="#333" />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal Ver Perfil */}
      <Modal visible={showProfileModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Perfil del Estudiante</Text>
=======
      {/* MODAL: Ver Perfil */}
      <Modal visible={showProfileModal} onRequestClose={closeModal} transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text>Perfil del Estudiante</Text>
>>>>>>> parent of 9044f4c (movil/estudiante 50%)
            <TouchableOpacity onPress={closeModal}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
<<<<<<< HEAD
            <Image source={{ uri: profileImage || '/img/navegacion/Avatar2.png' }} style={styles.profileImageLarge} />
            <Text><Text style={{fontWeight: 'bold'}}>Nombre:</Text> {studentData.nombre}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Campaña:</Text> {studentData.campaña}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Horas:</Text> {studentData.horas}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Teléfono:</Text> {studentData.telefono}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Correo:</Text> {studentData.correo}</Text>
            <TouchableOpacity onPress={handleEditClick}>
              <Text style={styles.modalButton}>Editar perfil</Text>
            </TouchableOpacity>
=======
            <Image
              source={{ uri: profileImage || '/img/navegacion/Avatar2.png' }}
              style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
            />
            <Text><strong>Nombre:</strong> {studentData.nombre}</Text>
            <Text><strong>Campaña:</strong> {studentData.campaña}</Text>
            <Text><strong>Horas revisadas:</strong> {studentData.horas}</Text>
            <Text><strong>Teléfono:</strong> {studentData.telefono}</Text>
            <Text><strong>Correo electrónico:</strong> {studentData.correo}</Text>

            <Button title="Editar perfil" onPress={handleEditClick} />
            <Button title="Cerrar" onPress={closeModal} />
>>>>>>> parent of 9044f4c (movil/estudiante 50%)
          </View>
        </View>
      </Modal>

      {/* MODAL: Editar Perfil */}
      <Modal visible={showEditModal} onRequestClose={closeModal} transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text>Editar Perfil</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text>Cerrar</Text>
            </TouchableOpacity>

            <Image
              source={{ uri: profileImage || '/img/navegacion/Avatar2.png' }}
              style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 20 }}
            />
            <Button title="Eliminar imagen" onPress={handleImageDelete} />
            <Button title="Subir nueva imagen" onPress={handleImageUpload} />

            <TextInput
              value={studentData.nombre}
              placeholder="Nombre"
              editable={false}
            />
            <TextInput
              value={studentData.campaña}
              placeholder="Campaña"
              editable={false}
            />
            <TextInput
              value={studentData.horas}
              placeholder="Horas"
              editable={false}
            />
            <TextInput
              value={studentData.telefono}
              placeholder="Teléfono"
              onChangeText={(text) => setStudentData({ ...studentData, telefono: text })}
            />
            <TextInput
              value={studentData.correo}
              placeholder="Correo electrónico"
              onChangeText={(text) => setStudentData({ ...studentData, correo: text })}
            />

            <Button title="Guardar Cambios" onPress={saveProfileChanges} />
            <Button title="Cancelar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </>
  );
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1a73e8',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    width: 100,
    height: 100,
    elevation: 5,
  },
  cardText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000aa',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    width: '75%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeModal: {
    color: '#007bff',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#1a73e8',
    padding: 8,
    borderRadius: 6,
    marginTop: 6,
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  profileImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 10,
    padding: 6,
  },
});

=======
>>>>>>> parent of 9044f4c (movil/estudiante 50%)
export default NavegadorEstudiante;
