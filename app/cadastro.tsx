// ==============================
// Tela de Cadastro (CadastroScreen)
// Atende aos requisitos da seção "2. Tela de Cadastro" da atividade
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

export default function CadastroScreen() {
  const router = useRouter();
  const { addUser } = useUser(); // Função global para adicionar novo usuário

  // Requisito: Gerenciamento de estado dos campos de formulário com useState
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // ==============================
  // Função que realiza o cadastro
  // ==============================
  function handleCadastrar() {
    // Validação: todos os campos devem ser preenchidos
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    // Requisito: verificar se o email já está em uso
    const ok = addUser(nome.trim(), email.trim(), senha);
    if (!ok) {
      Alert.alert('Erro', 'Este email já está cadastrado.');
      return;
    }

    // Requisito: mostrar alerta de sucesso e redirecionar para a tela de Login
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    router.back(); // Retorna para a tela anterior (Login)
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
        {/* Requisito: Título "Crie sua Conta" */}
        <Text style={styles.title}>Crie sua Conta</Text>

        {/* Requisito: Campos de entrada Nome, Email, Senha */}
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />
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

        {/* Requisito: Botão "Cadastrar" que executa a lógica de cadastro */}
        <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Link para voltar ao login */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Já tem uma conta? Entrar</Text>
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
    backgroundColor: '#f8f9fa', // Tema claro
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
    elevation: 5, // Sombra no Android
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
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
  backText: {
    textAlign: 'center',
    color: '#007bff',
    marginTop: 16,
    fontSize: 15,
  },
});
