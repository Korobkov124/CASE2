const API_BASE_URL = 'https://localhost:7194/api';

/**
 * Service for fetching graphics data
 */
export const GraphicsService = {
  /**
   * Fetches graphics parameters based on temperature and current
   * @param {number} T - Temperature value
   * @param {number} I - Current value
   * @returns {Promise<Object>} Response containing energyConsumption and currentOutput
   */
  getGraphicParameters: async (T, I) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/Graphic/GraphicParametrs?T=${T}&I=${I}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors', // Enable CORS
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching graphic parameters:', error);
      throw error;
    }
  },
};
