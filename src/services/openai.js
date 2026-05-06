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
    // Convertir File a Base64
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(imageFile);
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un experto en nutrición y estimación visual de porciones. Tu tarea es identificar los alimentos y estimar sus macros. Reglas: 1. Analiza raciones comparando con platos/cubiertos. 2. Suma ingredientes. 3. Considera grasas ocultas. 4. Responde estrictamente en JSON."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze food. Return JSON: {name, calories, protein, carbs, fat, review, healthScore}."
            },
            {
              type: "image_url",
              image_url: {
                url: base64,
                detail: "low"
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 500,
    });

    // --- AUDITORÍA DE TOKENS ---
    console.log("📊 COSTO DE ANÁLISIS DE IMAGEN:");
    console.log(`- Entrada (Prompt + Imagen): ${response.usage.prompt_tokens}`);
    console.log(`- Salida (Respuesta JSON): ${response.usage.completion_tokens}`);
    console.log(`- Total: ${response.usage.total_tokens}`);

    const jsonString = response.choices[0].message.content;
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error calling OpenAI directly:", error);
    return {
      name: "Fallback Meal (API Error)",
      calories: 540,
      protein: 25,
      carbs: 60,
      fat: 18,
      review: "Error al conectar con OpenAI.",
      healthScore: 7
    };
  }
};

/**
 * Calcula los macros del Onboarding y muestra el costo en tokens.
 */
export const calculateOnboardingMacros = async (profileData) => {
  try {
    const prompt = `JSON targets for: ${profileData.gender}, ${profileData.age}y, ${profileData.weight}kg, ${profileData.height}cm, goal:${profileData.goal}, activity:${profileData.lifestyle}. Keys: {targetCalories, targetProtein, targetCarbs, targetFats}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 150,
    });

    // --- AUDITORÍA DE TOKENS ---
    console.log("📊 COSTO DE CÁLCULO ONBOARDING:");
    console.log(`- Total tokens: ${response.usage.total_tokens}`);

    const jsonString = response.choices[0].message.content;
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error calculating macros directly:", error);
    return {
      targetCalories: 2150,
      targetProtein: 140,
      targetCarbs: 210,
      targetFats: 65
    };
  }
};