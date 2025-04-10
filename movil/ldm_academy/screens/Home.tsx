import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RootStackParamList } from '../navigation/PublicNavigate';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [campanas, setCampanas] = useState<any[]>([]);
  const [postulaciones, setPostulaciones] = useState<any[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // ✅ Mostrar modal solo una vez
  useEffect(() => {
    const checkIfAlertShown = async () => {
      try {
        const value = await AsyncStorage.getItem('hasSeenAlert');
        if (value === null) {
          setShowModal(true);
          await AsyncStorage.setItem('hasSeenAlert', 'true');
        }
      } catch (error) {
        console.log('Error verificando AsyncStorage:', error);
      }
    };

    checkIfAlertShown();
  }, []);

  // ✅ Obtener campañas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campanasResponse, postulacionesResponse] = await Promise.all([
          axios.get('http://10.0.2.2:3000/api/campanas/mostrarCampanas'),
          axios.get('http://10.0.2.2:3000/api/postulaciones'),
        ]);
        setCampanas(campanasResponse.data);
        setPostulaciones(postulacionesResponse.data);
      } catch (error) {
        console.log('Error al cargar campañas o postulaciones:', error);
      }
    };

    fetchData();
  }, []);

  const formatearFecha = (fecha: string) => {
    const f = new Date(fecha);
    return `${f.getDate().toString().padStart(2, '0')}/${(f.getMonth() + 1).toString().padStart(2, '0')}/${f.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Encabezado con imagen */}
        <ImageBackground
          //source={require('../assets/header-image.jpg')}
          style={styles.headerImage}
          imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <View style={styles.headerOverlay}>
            <Text style={styles.headerTitle}>Bienvenido al Servicio Social</Text>
          </View>
        </ImageBackground>

        {/* Texto de bienvenida */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>¿Listo para iniciar tu servicio social?</Text>
          <Text style={styles.introSubtitle}>¡Todo estudiante debe hacerlo!</Text>
          <Text style={styles.introText}>
            El servicio social constituye una actividad que permite al estudiante en formación retribuir a la sociedad,
            contribuyendo con propuestas de solución y aplicación de conocimientos integrales hacia los sectores más desfavorecidos.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
            <Text style={styles.buttonText}>Ver</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de bienvenida */}
        <Modal transparent visible={showModal} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>¿Por qué postularse?</Text>
              <Text style={styles.modalText}>
                Completar las <Text style={{ fontWeight: 'bold' }}>120 horas</Text> de servicio social es obligatorio y
                te brinda la oportunidad de contribuir al bienestar de tu comunidad mientras desarrollas habilidades clave
                para tu formación.
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => setShowModal(false)}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Lista de campañas */}
        <View style={styles.campaignsContainer}>
          <Text style={styles.sectionTitle}>Campañas disponibles</Text>
          {campanas.map((campana, index) => {
            const postulados = postulaciones.filter(p => p.campana_id === campana.id).length;

            return (
              <View key={index} style={styles.campaignItem}>
                {campana.imagen && (
                  <Image
                    source={{ uri: `http://10.0.2.2:3000/img/campañas/${campana.imagen}` }}
                    style={styles.campaignImage}
                  />
                )}
                <Text style={styles.campaignName}>{campana.nom_campaña}</Text>
                <Text>{campana.descripcion}</Text>
                <Text>Cupos: {campana.cupos}</Text>
                <Text>Postulados: {postulados}</Text>
                <Text>Inicio: {formatearFecha(campana.fecha)}</Text>
                <TouchableOpacity
                  style={styles.postulateButton}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.postulateText}>Postúlate</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Menú inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
          <Icon name="sign-in-alt" size={24} color="#007bff" />
          <Text style={styles.menuText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Register')}>
          <Icon name="user-plus" size={24} color="#28a745" />
          <Text style={styles.menuText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafc',
  },
  headerImage: {
    height: 180,
    justifyContent: 'center',
  },
  headerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  introSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: -15,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0077cc',
    marginBottom: 5,
  },
  introSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  introText: {
    fontSize: 14,
    textAlign: 'justify',
    color: '#444',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0077cc',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  campaignsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  campaignItem: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  campaignImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postulateButton: {
    backgroundColor: '#90caf9',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  postulateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#ffffff',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
  },
});

export default Home;
