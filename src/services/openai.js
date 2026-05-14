import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Necesario para ejecutar en el frontend
});

/**
 * Analiza la imagen de comida y muestra el costo en tokens.
 */
export const analyzeFoodImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('fotoComida', imageFile);

    const response = await fetch('http://localhost:3000/api/analizar-comida', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling backend API:", error);
    return {
      name: "Fallback Meal (API Error)",
      calories: 540,
      protein: 25,
      carbs: 60,
      fat: 18,
      review: "Error al conectar con el servidor de análisis.",
      healthScore: 7
    };
  }
};

/**
 * Calcula los macros del Onboarding y muestra el costo en tokens.
 */
export const calculateOnboardingMacros = async (profileData) => {
  try {
    const response = await fetch('http://localhost:3000/api/calcular-macros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error calculating macros via backend:", error);
    return {
      targetCalories: 2150,
      targetProtein: 140,
      targetCarbs: 210,
      targetFats: 65
    };
  }
};