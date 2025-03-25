import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'success_page.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final TextEditingController nombreController = TextEditingController();
  final TextEditingController apellidoController = TextEditingController();
  final TextEditingController correoController = TextEditingController();
  final TextEditingController contrasenaController = TextEditingController();
  final TextEditingController telefonoController = TextEditingController();
  final TextEditingController cursoController = TextEditingController();

  final _formKey = GlobalKey<FormState>();

  Future<void> register() async {
    if (!_formKey.currentState!.validate()) return;

    final url = Uri.parse('http://localhost:3000/api/auth/register');
    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "nombre": nombreController.text,
        "apellido": apellidoController.text,
        "correo": correoController.text,
        "contrasena": contrasenaController.text,
        "telefono": telefonoController.text,
        "curso": cursoController.text,
      }),
    );

    if (response.statusCode == 200) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => SuccessPage()),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error al registrarse")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Registrarse")),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              Text(
                "Regístrate Ahora",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 10),
              Text(
                "Crea tu cuenta con nosotros y empieza tu servicio social",
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 20),

              // Nombre
              TextFormField(
                controller: nombreController,
                decoration: InputDecoration(labelText: "Nombres"),
                validator: (value) {
                  if (value == null || value.isEmpty) return "Ingresa tu nombre";
                  if (!RegExp(r"^[A-Za-zÁ-ÿÑñ\s]+$").hasMatch(value)) return "Nombre inválido";
                  return null;
                },
              ),
              
              // Apellido
              TextFormField(
                controller: apellidoController,
                decoration: InputDecoration(labelText: "Apellidos"),
                validator: (value) {
                  if (value == null || value.isEmpty) return "Ingresa tu apellido";
                  if (!RegExp(r"^[A-Za-zÁ-ÿÑñ\s]+$").hasMatch(value)) return "Apellido inválido";
                  return null;
                },
              ),

              // Correo
              TextFormField(
                controller: correoController,
                decoration: InputDecoration(labelText: "Correo"),
                keyboardType: TextInputType.emailAddress,
                validator: (value) {
                  if (value == null || value.isEmpty) return "Ingresa tu correo";
                  if (!RegExp(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$").hasMatch(value)) return "Correo inválido";
                  return null;
                },
              ),

              // Contraseña
              TextFormField(
                controller: contrasenaController,
                decoration: InputDecoration(labelText: "Contraseña"),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) return "Ingresa tu contraseña";
                  if (value.length < 6) return "Debe tener al menos 6 caracteres";
                  return null;
                },
              ),

              // Teléfono
              TextFormField(
                controller: telefonoController,
                decoration: InputDecoration(labelText: "Teléfono"),
                keyboardType: TextInputType.phone,
                validator: (value) {
                  if (value == null || value.isEmpty) return "Ingresa tu teléfono";
                  if (!RegExp(r"^[0-9]{10}$").hasMatch(value)) return "Teléfono inválido";
                  return null;
                },
              ),

              // Curso
              TextFormField(
                controller: cursoController,
                decoration: InputDecoration(labelText: "Curso"),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) return "Ingresa tu curso";
                  if (!RegExp(r"^[0-9]{4}$").hasMatch(value)) return "Curso inválido";
                  return null;
                },
              ),

              SizedBox(height: 20),

              // Botón de Registro
              ElevatedButton(
                onPressed: register,
                child: Text("Registrarse"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
