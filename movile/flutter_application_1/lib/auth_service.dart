import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  final String baseUrl = 'http://localhost:3000/api/auth'; // Ajusta la URL si es necesario

  // Login
  Future<bool> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      return true; // Si el backend responde bien, devuelve true
    } else {
      return false; // Si hay error, devuelve false
    }
  }

  // Registro
  Future<bool> register(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 201) {
      return true; // Si se registra bien, devuelve true
    } else {
      return false; // Si hay error, devuelve false
    }
  }
}
