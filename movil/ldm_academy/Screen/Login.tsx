import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  AdminHome: undefined; 
  HomeEstudiante: undefined;
  HomeDocentes: undefined;
  Register: undefined;
  OlvidarContrasena: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface UserLogin {
  correo: string;
  contrasena: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<UserLogin>({
    correo: '',
    contrasena: '',
  });
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const handleChange = (name: keyof UserLogin, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.11:3000/api/auth/login', user);
      if (response.status === 200) {
        Alert.alert('Éxito', response.data.message, [
          {
            text: 'Continuar',
            onPress: () => {
              const { token, rol } = response.data;

              switch (rol) {
                case 1:
                  navigation.navigate('AdminHome'); 
                  break;
                case 2:
                  navigation.navigate('HomeEstudiante');
                  break;
                case 3:
                  navigation.navigate('HomeDocentes');
                  break;
                default:
                  navigation.navigate('Home');
              }
            },
          },
        ]);
      }
    } catch (error: any) {
      const title = error?.response?.data?.title || 'Error';
      Alert.alert(title, 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo"
        value={user.correo}
        onChangeText={(text) => handleChange('correo', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={user.contrasena}
        onChangeText={(text) => handleChange('contrasena', text)}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('OlvidarContrasena')}>
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>¿Aún no tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecundario}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonSecundario: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
});
