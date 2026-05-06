// Este archivo ahora actúa como un cliente que se comunica con nuestro propio Backend Express (server.js)

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Envía la imagen cruda al backend, donde será optimizada con Sharp y enviada a OpenAI.
 * @param {File} imageFile El objeto File de la imagen seleccionada por el usuario.
 */
export const analyzeFoodImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('fotoComida', imageFile);

    const response = await fetch(`${API_BASE_URL}/analizar-comida`, {
      method: 'POST',
      body: formData,
      // No configurar 'Content-Type' manualmente cuando se usa FormData; el navegador lo hace automáticamente.
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error communicating with backend for image analysis:", error);
    // Fallback in case backend is totally down
    return {
      name: "Fallback Meal (Backend Error)",
      calories: 540,
      protein: 25,
      carbs: 60,
      fat: 18,
      review: "Could not connect to local backend.",
      healthScore: 7
    };
  }
};

/**
 * Envía los datos del perfil al backend para calcular los macros.
 */
export const calculateOnboardingMacros = async (profileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/calcular-macros`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    ºº
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error communicating with backend for macros:", error);
    // Fallback in case backend is totally down
    return {
      targetCalories: 2150,
      targetProtein: 140,
      targetCarbs: 210,
      targetFats: 65
    };
  }
};
