// 📘 Importação das bibliotecas necessárias
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';
import Header from '../components/header'; // Import do Header

// 🧭 Tela responsável por listar os usuários cadastrados
export default function ListaUsuariosScreen() {
  const router = useRouter(); // Hook usado para navegação entre as telas
  const { users, isAuthenticated } = useUser(); // Acessa os usuários e o estado de autenticação do contexto global

  // 🧩 Verificação de autenticação
  // Caso o usuário tente acessar esta tela sem estar logado,
  // ele será redirecionado automaticamente para a tela de Login.
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/app'); // Redireciona para o login
    }
  }, [isAuthenticated]);

  return (
    // 🎨 Estrutura principal da tela
    <View style={styles.container}>

      {/* 🧾 Título da página de lista de usuários */}
      <Text style={styles.title}>Usuários Cadastrados</Text>
        <Header title="Usuários Cadastrados" />

      {/* 📋 FlatList para exibir dinamicamente os usuários cadastrados */}
      <FlatList
        // Recebe os dados vindos do contexto global
        data={users}

        // Garante que cada item da lista tenha uma chave única
        keyExtractor={(item) => String(item.id)}

        // Define espaçamento interno da lista
        contentContainerStyle={{ padding: 20 }}

        // Renderização de cada usuário em um card visual
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Exibe o nome do usuário */}
            <Text style={styles.nome}>{item.nome}</Text>

            {/* Exibe o email do usuário */}
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

// 💅 Estilos modernos com tema branco (clean e elegante)
const styles = StyleSheet.create({
  // 🎨 Container principal da tela
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Tema branco
    paddingTop: 60, // Espaço no topo
  },

  // 🏷️ Título da tela
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333', // Cinza escuro para contraste
  },

  // 🧱 Card que representa cada usuário
  card: {
    backgroundColor: '#f9f9f9', // Fundo levemente acinzentado
    padding: 15,
    borderRadius: 10, // Bordas arredondadas
    marginBottom: 12, // Espaçamento entre os cards
    borderWidth: 1,
    borderColor: '#e0e0e0', // Borda discreta
    shadowColor: '#000', // Sombra suave
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Efeito de elevação no Android
  },

  // 🧍 Nome do usuário (destaque)
  nome: {
    color: '#222',
    fontWeight: '700',
    fontSize: 16,
  },

  // ✉️ Email do usuário (texto secundário)
  email: {
    color: '#555',
    marginTop: 4,
  },
});
