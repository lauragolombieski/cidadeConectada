import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL da API - ajuste conforme necessário
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' // Para desenvolvimento local
  : 'http://your-production-url.com/api'; // Para produção

const TOKEN_KEY = '@ConectaFortaleza:token';

/**
 * Armazena o token de autenticação
 */
export const setToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Erro ao salvar token:', error);
    throw error;
  }
};

/**
 * Obtém o token de autenticação
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao buscar token:', error);
    return null;
  }
};

/**
 * Remove o token de autenticação (logout)
 */
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao remover token:', error);
    throw error;
  }
};

/**
 * Faz uma requisição HTTP com autenticação automática
 */
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = await getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token inválido ou expirado
    await removeToken();
    throw new Error('Sessão expirada. Por favor, faça login novamente.');
  }

  return response;
};

/**
 * API de Autenticação
 */
export const authAPI = {
  /**
   * Registra um novo usuário
   */
  register: async (userData: {
    email: string;
    password: string;
    full_name: string;
    phone_number: string;
    cpf: string;
    cep: string;
    full_address: string;
  }) => {
    const response = await apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao registrar usuário');
    }

    const data = await response.json();
    if (data.token) {
      await setToken(data.token);
    }
    return data;
  },

  /**
   * Faz login
   */
  login: async (email: string, password: string) => {
    const response = await apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Email ou senha inválidos');
    }

    const data = await response.json();
    if (data.token) {
      await setToken(data.token);
    }
    return data;
  },

  /**
   * Faz logout (remove token)
   */
  logout: async () => {
    await removeToken();
  },
};

/**
 * API de Usuário
 */
export const userAPI = {
  /**
   * Busca o perfil do usuário
   */
  getProfile: async () => {
    const response = await apiRequest('/users/profile', {
      method: 'GET',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao buscar perfil');
    }

    return response.json();
  },

  /**
   * Atualiza o perfil do usuário
   */
  updateProfile: async (userData: {
    full_name?: string;
    phone_number?: string;
    email?: string;
    cpf?: string;
    cep?: string;
    full_address?: string;
  }) => {
    const response = await apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao atualizar perfil');
    }

    return response.json();
  },

  /**
   * Altera a senha do usuário
   */
  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await apiRequest('/users/profile/password', {
      method: 'PUT',
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao alterar senha');
    }

    return response.json();
  },
};

/**
 * API de Solicitações
 */
export const requestAPI = {
  /**
   * Cria uma nova solicitação
   */
  create: async (requestData: {
    type: 'report' | 'help' | 'feedback';
    description?: string;
    feedback_text?: string;
    request_ambulance?: number;
    request_police?: number;
    latitude?: number;
    longitude?: number;
  }) => {
    const response = await apiRequest('/requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar solicitação');
    }

    return response.json();
  },

  /**
   * Lista todas as solicitações do usuário
   */
  getAll: async (filters?: { status?: string; type?: string }) => {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.type) queryParams.append('type', filters.type);
    
    const queryString = queryParams.toString();
    const endpoint = `/requests${queryString ? `?${queryString}` : ''}`;

    const response = await apiRequest(endpoint, {
      method: 'GET',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao buscar solicitações');
    }

    return response.json();
  },

  /**
   * Deleta uma solicitação
   */
  delete: async (requestId: string, type: 'report' | 'help' | 'feedback') => {
    const queryParams = new URLSearchParams();
    queryParams.append('type', type);
    
    const endpoint = `/requests/${requestId}?${queryParams.toString()}`;

    const response = await apiRequest(endpoint, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao deletar solicitação');
    }

    return response.json();
  },
};

