import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const NotificacionesAdmin = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('');
  const [alert, setAlert] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [estudianteNombre, setEstudianteNombre] = useState('');
  const [idEstudiante, setIdEstudiante] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalNotification, setModalNotification] = useState<any>(null);

  useEffect(() => {
    const nombre = localStorage.getItem('nombreEstudiante') || 'Estudiante';
    const id = localStorage.getItem('idUsuario');
    setEstudianteNombre(nombre);
    setIdEstudiante(id);

    axios
      .get('http://192.168.1.11:3000/api/notificaciones')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setNotifications(res.data);
        } else {
          console.error('La respuesta de la API no es un array');
        }
      })
      .catch((err) => {
        console.error('Error al obtener notificaciones:', err.response || err.message);
      });
  }, []);

  const handleAccept = (id: number) => {
    axios
      .put(`http://192.168.1.11:3000/api/notificaciones/${id}`, { estado: 'Aceptado' })
      .then(() => {
        setAlertType('success');
        setAlert('Notificación aceptada correctamente');
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id ? { ...notification, estado: 'Aceptado' } : notification
          )
        );
        setTimeout(() => setAlert(''), 3000);
      })
      .catch(() => {
        setAlertType('danger');
        setAlert('Error al aceptar la notificación');
        setTimeout(() => setAlert(''), 3000);
      });
  };

  const handleReject = (id: number) => {
    axios
      .put(`http://192.168.1.11:3000/api/notificaciones/${id}`, { estado: 'Rechazado' })
      .then(() => {
        setAlertType('danger');
        setAlert('Notificación rechazada');
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id ? { ...notification, estado: 'Rechazado' } : notification
          )
        );
        setTimeout(() => setAlert(''), 3000);
      })
      .catch(() => {
        setAlertType('danger');
        setAlert('Error al rechazar la notificación');
        setTimeout(() => setAlert(''), 3000);
      });
  };

  const showDetails = (notification: any) => {
    setModalNotification(notification);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalNotification(null);
  };

  const filteredNotifications = notifications.filter(
    (n) =>
      (searchTerm === '' ||
        (n.nombre_estudiante && n.nombre_estudiante.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (n.campaña && n.campaña.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (n.id && String(n.id).toLowerCase().includes(searchTerm.toLowerCase())) ||
        (n.idEstudiante && String(n.idEstudiante).toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (campaignFilter === '' || n.campaña === campaignFilter)
  );

  const campaignOptions = [
    'Comedor',
    'Orientación',
    'Coordinación',
    'Biblioteca',
    'Enfermería',
    'Salón',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido, administrador</Text>
      <Text style={styles.subHeader}>Tienes {notifications.length} notificaciones por revisar</Text>

      {alert && <Text style={alertType === 'success' ? styles.successAlert : styles.dangerAlert}>{alert}</Text>}

      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre, campaña o ID"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <View style={styles.selectContainer}>
          <Text>Filtrar por campaña</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar campaña"
            value={campaignFilter}
            onChangeText={(text) => setCampaignFilter(text)}
          />
        </View>
      </View>

      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationContainer}>
            <Text>ID Estudiante: {item.idEstudiante}</Text>
            <Text>ID: {item.id}</Text>
            <Text>Nombre: {item.nombre_estudiante || 'No disponible'}</Text>
            <Text>Campaña: {item.campaña || 'No disponible'}</Text>
            <Text>Fecha de Postulación: {item.fecha_postulacion || 'No disponible'}</Text>
            <Text>Estado: {item.estado || 'No disponible'}</Text>

            <View style={styles.buttonsContainer}>
              <Button title="Aceptar" onPress={() => handleAccept(item.id)} />
              <Button title="Rechazar" onPress={() => handleReject(item.id)} />
              <Button title="Ver Detalles" onPress={() => showDetails(item)} />
            </View>
          </View>
        )}
      />

      {/* Modal de detalles */}
      {modalNotification && (
        <Modal visible={showModal} onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Detalles de la Notificación</Text>
            <Text>ID Estudiante: {modalNotification.idEstudiante}</Text>
            <Text>ID Notificación: {modalNotification.id}</Text>
            <Text>Nombre Estudiante: {modalNotification.nombre_estudiante}</Text>
            <Text>Campaña: {modalNotification.campaña}</Text>
            <Text>Fecha de Postulación: {modalNotification.fecha_postulacion}</Text>
            <Text>Estado: {modalNotification.estado}</Text>
            <Button title="Cerrar" onPress={closeModal} />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subHeader: {
    marginVertical: 10,
    color: '#777',
  },
  filtersContainer: {
    marginVertical: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  selectContainer: {
    marginBottom: 20,
  },
  notificationContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successAlert: {
    color: 'green',
    marginBottom: 10,
  },
  dangerAlert: {
    color: 'red',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default NotificacionesAdmin;
