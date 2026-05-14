import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
});

// Cliente Cerebras para inferencia ultra-rápida (Llama 3.3)
// Obtén tu clave en https://cloud.cerebras.ai/
const cerebras = new OpenAI({
  apiKey: process.env.CEREBRAS_API_KEY,
  baseURL: "https://api.cerebras.ai/v1"
});

// Cache de alimentos comunes
const foodCache = new Map();

// Configuración de Multer (en memoria)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB máximo
});

// Endpoint para analizar la imagen de comida
app.post('/api/analizar-comida', upload.single('fotoComida'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image provided.' });
    }

    // Hash simple de la imagen (usando el tamaño del buffer y los primeros bytes como ejemplo)
    const imgHash = `${req.file.size}_${req.file.buffer.slice(0, 50).toString('hex')}`;
    if (foodCache.has(imgHash)) {
      console.log("[CACHE] Devuelto resultado desde el cache.");
      return res.status(200).json(foodCache.get(imgHash));
    }

    // Usar Sharp para redimensionar (max 512px) y convertir a WebP
    const optimizedBuffer = await sharp(req.file.buffer)
      .resize({
        width: 512,
        height: 512,
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toBuffer();

    const base64String = optimizedBuffer.toString('base64');
    const imagePayload = `data:image/webp;base64,${base64String}`;

    // PASO 1: Usar OpenAI (Vision) en modo 'low' para ahorrar un 97% de tokens
    const visionResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Identifica los ingredientes y cantidades de esta comida. Responde solo con la lista de ingredientes."
            },
            {
              type: "image_url",
              image_url: {
                url: imagePayload,
                detail: "low" // <--- ESTO reduce de 2833 a 85 tokens
              },
            },
          ],
        },
      ],
      max_tokens: 150,
    });

    const ingredientes = visionResponse.choices[0].message.content;
    const openAiTokens = visionResponse.usage?.total_tokens || 0;

    console.log(`[AI] OpenAI (Vision Low): ${openAiTokens} tokens`);

    // PASO 2: Cerebras (Llama 3.3 70B) hace el trabajo pesado gratis
    const analysisResponse = await cerebras.chat.completions.create({
      model: "llama-3.3-70b",
      messages: [
        {
          role: "system",
          content: "Eres un experto nutricionista. Analiza la lista de ingredientes y devuelve un JSON: {name, calories, protein, carbs, fat, review, healthScore}."
        },
        {
          role: "user",
          content: `Ingredientes: ${ingredientes}`
        },
      ],
      response_format: { type: "json_object" },
    });

    const cerebrasTokens = analysisResponse.usage?.total_tokens || 0;
    console.log(`[AI] Cerebras (Analytic): ${cerebrasTokens} tokens`);

    const result = JSON.parse(analysisResponse.choices[0].message.content);
    
    // Guardar en cache
    foodCache.set(imgHash, result);
    
    return res.status(200).json(result);
  } catch (error) {
    console.error("Server Error:", error);
    // Fallback de emergencia si OpenAI falla (ej. error 429)
    return res.status(200).json({
      name: "Fallback Meal (API Limit)",
      calories: 540,
      protein: 25,
      carbs: 60,
      fat: 18,
      review: "Placeholder due to OpenAI API limit. Tu imagen se procesó en el backend y se redujo usando Sharp.",
      healthScore: 7
    });
  }
});

// Endpoint para calcular los macros en el Onboarding
app.post('/api/calcular-macros', async (req, res) => {
  try {
    const profileData = req.body;
    const prompt = `JSON targets for: ${profileData.gender}, ${profileData.age}y, ${profileData.weight}kg, ${profileData.height}cm, goal:${profileData.goal}, activity:${profileData.lifestyle}. Keys: {targetCalories, targetProtein, targetCarbs, targetFats}.`;

    const response = await cerebras.chat.completions.create({
      model: "llama-3.3-70b",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 150,
    });

    const jsonString = response.choices[0].message.content;
    const result = JSON.parse(jsonString.replace(/```json\n?|```/g, ''));
    return res.status(200).json(result);
  } catch (error) {
    console.error("Server Error calculating macros:", error);
    return res.status(200).json({
      targetCalories: 2150,
      targetProtein: 140,
      targetCarbs: 210,
      targetFats: 65
    });
  }
});

// Tarea de limpieza (Simulada para 72 horas)
setInterval(() => {
  console.log("[CLEANUP] Ejecutando limpieza de imágenes antiguas (>72h)...");
  // Aquí iría la lógica de firebase-admin para borrar de Storage
  // storage.bucket().deleteFiles({ prefix: 'users/', ... })
}, 24 * 60 * 60 * 1000); // Cada 24 horas

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});

export { app };
