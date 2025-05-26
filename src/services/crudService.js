import { API } from './api';

/**
 * Serviço para operações CRUD reutilizáveis
 */
export const crudService = {
  /**
   * Busca todos os itens de um endpoint
   * @param {string} endpoint - Endpoint da API (ex: '/filmes', '/jogos')
   * @returns {Promise<Array>} - Lista de itens
   */
  getAll: async (endpoint) => {
    try {
      const response = await API.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar dados de ${endpoint}:`, error);
      throw error;
    }
  },

  /**
   * Cria um novo item
   * @param {string} endpoint - Endpoint da API
   * @param {Object} item - Dados do novo item
   * @returns {Promise<Object>} - Item criado
   */
  create: async (endpoint, item) => {
    try {
      const response = await API.post(endpoint, item);
      return response.data;
    } catch (error) {
      console.error(`Erro ao criar item em ${endpoint}:`, error);
      throw error;
    }
  },

  /**
   * Atualiza um item existente
   * @param {string} endpoint - Endpoint da API
   * @param {string|number} id - ID do item
   * @param {Object} item - Dados atualizados
   * @returns {Promise<Object>} - Item atualizado
   */
  update: async (endpoint, id, item) => {
    try {
      // Usando PATCH em vez de PUT para atualização parcial
      const response = await API.patch(`${endpoint}/${id}`, item);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar item ${id} em ${endpoint}:`, error);
      throw error;
    }
  },

  /**
   * Remove um item
   * @param {string} endpoint - Endpoint da API
   * @param {string|number} id - ID do item
   * @returns {Promise<void>}
   */
  delete: async (endpoint, id) => {
    try {
      await API.delete(`${endpoint}/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar item ${id} em ${endpoint}:`, error);
      throw error;
    }
  }
};