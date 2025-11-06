// ==============================
// Tela de Login (LoginScreen)
// Atende aos requisitos da seção "1. Tela de Login" da atividade
// ==============================

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router'; // Requisito: Navegação entre telas com React Navigation
import { useUser } from '../context/UserContext'; // Requisito: Uso de Context API para compartilhar dados globais

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useUser(); // Função global para autenticar o usuário

  // Requisito: Gerenciamento de estado dos campos de formulário com useState
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // ==============================
  // Função que realiza o login
  // ==============================
  function handleEntrar() {
    // Validação: todos os campos devem ser preenchidos
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha email e senha.');
      return;
    }

    // Requisito: Verificar se as credenciais estão corretas
    const ok = login(email.trim(), senha);
    if (ok) {
      // Requisito: Redirecionar para Lista de Usuários após login bem-sucedido
      router.replace('/lista');
    } else {
      // Requisito: Mostrar alerta se email/senha estiverem incorretos
      Alert.alert('Erro', 'Email ou senha inválidos.');
    }
  }

  // ==============================
  // Estrutura visual (Componentes)
  // ==============================
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        {/* Requisito: Título "Bem-vindo(a) de volta!" */}
        <Text style={styles.title}>Bem-vindo(a) de volta!</Text>

        {/* Requisito: Campos de entrada Email e Senha */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry // Requisito: senha com caracteres ocultos
          value={senha}
          onChangeText={setSenha}
        />

        {/* Requisito: Botão "Entrar" que executa a lógica de autenticação */}
        <TouchableOpacity style={styles.button} onPress={handleEntrar}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Requisito: Link para acessar a tela de cadastro */}
        <TouchableOpacity onPress={() => router.push('/cadastro')}>
          <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ==============================
// Estilos visuais (tema claro e moderno)
// ==============================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Fundo branco claro
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5, // sombra no Android
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f1f3f5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007bff', // Azul moderno
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  link: {
    textAlign: 'center',
    color: '#007bff',
    marginTop: 16,
    fontSize: 15,
  },
});
