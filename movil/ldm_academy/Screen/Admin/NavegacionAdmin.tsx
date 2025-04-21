import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProfileData {
  name: string;
  email: string;
  role: string;
  profilePicture: string;
}

export default function NavegacionAdmin() {
  const navigation = useNavigation<any>();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Administrador',
    email: 'admin@gmail.com',
    role: 'Administrador',
    profilePicture: 'https://via.placeholder.com/150',
  });

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleInputChange = (name: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <TouchableOpacity onPress={() => setShowProfileModal(true)} style={styles.avatarContainer}>
          <Image source={{ uri: profileData.profilePicture }} style={styles.avatar} />
          <Text style={styles.name}>{profileData.name}</Text>
        </TouchableOpacity>

        <ScrollView style={styles.menu}>
          <MenuItem icon="home-outline" label="Inicio" onPress={() => navigation.navigate('AdminHome')} />
          <MenuItem icon="notifications-outline" label="Notificaciones" onPress={() => navigation.navigate('NotificacionesAdmin')} />

          <MenuGroup title="Estudiantes" active={activeMenu === 'Estudiantes'} onToggle={() => toggleMenu('Estudiantes')} items={[
            { label: 'Agregar Estudiante', route: 'EstudianteNew' },
            { label: 'Lista de Estudiantes', route: 'EstudianteList' },
          ]} />

          <MenuGroup title="Docentes" active={activeMenu === 'Docentes'} onToggle={() => toggleMenu('Docentes')} items={[
            { label: 'Agregar Docente', route: 'DocenteNew' },
            { label: 'Lista de Docentes', route: 'DocenteList' },
          ]} />

          <MenuGroup title="Campañas" active={activeMenu === 'Campañas'} onToggle={() => toggleMenu('Campañas')} items={[
            { label: 'Crear Campaña', route: 'CampaignNew' },
            { label: 'Lista de Campañas', route: 'CampaignList' },
          ]} />

          <MenuItem icon="exit-outline" label="Cerrar Sesión" onPress={() => console.log('Cerrar sesión')} />
        </ScrollView>
      </View>

      {/* Modal de Perfil */}
      <Modal visible={showProfileModal} animationType="slide" onRequestClose={() => setShowProfileModal(false)}>
        <View style={styles.modalContent}>
          <Image source={{ uri: profileData.profilePicture }} style={styles.modalAvatar} />
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={profileData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholder="Nombre"
              />
              <TextInput
                style={styles.input}
                value={profileData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Correo"
                keyboardType="email-address"
              />
              <TouchableOpacity style={styles.button} onPress={() => setIsEditing(false)}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.modalText}>{profileData.name}</Text>
              <Text style={styles.modalText}>{profileData.email}</Text>
              <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={() => setShowProfileModal(false)}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

function MenuItem({ icon, label, onPress }: { icon: string, label: string, onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Icon name={icon} size={22} color="#fff" style={styles.menuIcon} />
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
}

function MenuGroup({
  title,
  active,
  onToggle,
  items,
}: {
  title: string;
  active: boolean;
  onToggle: () => void;
  items: { label: string; route: string }[];
}) {
  const navigation = useNavigation<any>();
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity style={styles.menuItem} onPress={onToggle}>
        <Icon name={active ? 'chevron-down-outline' : 'chevron-forward-outline'} size={20} color="#fff" style={styles.menuIcon} />
        <Text style={styles.menuText}>{title}</Text>
      </TouchableOpacity>
      {active && (
        <View style={styles.subMenu}>
          {items.map((item, index) => (
            <TouchableOpacity key={index} style={styles.subMenuItem} onPress={() => navigation.navigate(item.route)}>
              <Text style={styles.subMenuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#1a1a1a',
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  subMenu: {
    marginLeft: 25,
    marginTop: 5,
  },
  subMenuItem: {
    paddingVertical: 8,
  },
  subMenuText: {
    color: '#ccc',
    fontSize: 14,
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  modalAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
