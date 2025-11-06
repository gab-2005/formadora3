// 📘 Importação dos módulos React e Context API
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 🧩 Tipo do usuário (estrutura dos dados de cada cadastro)
export type User = {
  id: number;
  nome: string;
  email: string;
  senha: string;
};

// 🧭 Tipo das informações que o contexto global vai disponibilizar
type UserContextType = {
  users: User[]; // Lista global de usuários cadastrados
  addUser: (nome: string, email: string, senha: string) => boolean; // Função de cadastro
  login: (email: string, senha: string) => boolean; // Função de login
  logout: () => void; // Encerra sessão
  isAuthenticated: boolean; // Controla se há um usuário logado
  currentUser?: User | null; // Armazena dados do usuário logado
};

// 🧱 Criação do contexto global
const UserContext = createContext<UserContextType | undefined>(undefined);

// 🪄 Hook customizado para acessar o contexto
export const useUser = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser deve ser usado dentro de um UserProvider');
  return ctx;
};

// 🧩 Provedor que envolve todo o app e disponibiliza os dados globalmente
export function UserProvider({ children }: { children: ReactNode }) {
  // 🚫 Removido o usuário de teste: agora começa com a lista vazia
  const [users, setUsers] = useState<User[]>([]);

  // 🔐 Estado de autenticação e usuário atual
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 🧾 Função de cadastro
  function addUser(nome: string, email: string, senha: string) {
    // Verifica se o email já está em uso
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;

    // Cria novo usuário com ID único
    const novo: User = { id: Date.now(), nome, email, senha };

    // Atualiza o array global de usuários
    setUsers((prev) => [novo, ...prev]);
    return true;
  }

  // 🔑 Função de login
  function login(email: string, senha: string) {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    );

    if (found) {
      setIsAuthenticated(true);
      setCurrentUser(found);
      return true;
    }

    return false;
  }

  // 🚪 Função de logout
  function logout() {
    setIsAuthenticated(false);
    setCurrentUser(null);
  }

  // 📦 Objeto que será compartilhado com todas as telas
  const value: UserContextType = {
    users,
    addUser,
    login,
    logout,
    isAuthenticated,
    currentUser,
  };

  // 🌍 Retorna o provedor que envolve a aplicação inteira
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
