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
      const response = await axios.get('http://192.168.104.49:3000/api/estudiantes/profile');
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
      const response = await axios.put('http://192.168.104.49:3000/api/estudiantes/profile', updatedData); 
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

  const handleImageDelete = () => setProfileImage(null);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

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

      {/* MODAL: Ver Perfil */}
      <Modal visible={showProfileModal} onRequestClose={closeModal} transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text>Perfil del Estudiante</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
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

export default NavegadorEstudiante;
