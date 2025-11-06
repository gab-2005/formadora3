// 📘 Importações necessárias
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';

// 🧭 Componente Header padrão
export default function Header({ title }: { title: string }) {
  const router = useRouter();
  const { isAuthenticated, logout } = useUser();

  // 🔒 Função para sair e voltar à tela de login
  const handleLogout = () => {
    logout();
    router.replace('/app'); // Redireciona para tela de login
  };

  return (
    <View style={styles.header}>
      {/* 🏷️ Título da página */}
      <Text style={styles.title}>{title}</Text>

      {/* 🔐 Botão de Logout (só aparece se o usuário estiver logado) */}
      {isAuthenticated && (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// 💅 Estilos do cabeçalho
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Título e botão lado a lado
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00bfff', // Azul suave
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: '#00bfff',
    fontWeight: '600',
  },
});
