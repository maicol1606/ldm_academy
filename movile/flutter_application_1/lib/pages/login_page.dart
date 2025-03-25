import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'success_page.dart';
import 'register_page.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  Future<void> login() async {
    if (!_formKey.currentState!.validate()) return;

    final url = Uri.parse('http://localhost:3000/api/auth/login');
    try {
      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "email": emailController.text,
          "password": passwordController.text,
        }),
      );

      final responseData = jsonDecode(response.body);
      
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(responseData['message'], style: TextStyle(color: Colors.green))),
        );
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => SuccessPage()),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(responseData['message'], style: TextStyle(color: Colors.red))),
        );
      }
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error al conectar con el servidor")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Card(
            elevation: 4,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            child: Padding(
              padding: EdgeInsets.all(20),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text("Iniciar Sesión", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                    SizedBox(height: 20),
                    TextFormField(
                      controller: emailController,
                      decoration: InputDecoration(labelText: "Correo", prefixIcon: Icon(Icons.email)),
                      keyboardType: TextInputType.emailAddress,
                      validator: (value) {
                        if (value == null || value.isEmpty) return 'Ingrese un correo válido';
                        return null;
                      },
                    ),
                    SizedBox(height: 10),
                    TextFormField(
                      controller: passwordController,
                      obscureText: true,
                      decoration: InputDecoration(labelText: "Contraseña", prefixIcon: Icon(Icons.lock)),
                      validator: (value) {
                        if (value == null || value.isEmpty) return 'Ingrese su contraseña';
                        return null;
                      },
                    ),
                    SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: login,
                      child: Text("Ingresar"),
                      style: ElevatedButton.styleFrom(minimumSize: Size(double.infinity, 50)),
                    ),
                    TextButton(
                      onPressed: () {
                        
                      }, // Aquí puedes redirigir a la página de recuperar contraseña
                      child: Text("¿Olvidaste tu contraseña?"),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => RegisterPage()),
);
                      }, // Aquí puedes redirigir a la página de registro
                      child: Text("¿No tienes una cuenta? Regístrate"),
                    ),
                    SizedBox(height: 10),
                    OutlinedButton(
                      onPressed: () => Navigator.pop(context),
                      child: Text("Volver a inicio"),
                      style: OutlinedButton.styleFrom(minimumSize: Size(double.infinity, 50)),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}