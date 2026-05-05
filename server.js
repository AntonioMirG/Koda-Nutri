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

    // Llamada a OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image of food. Please return the response strictly as a JSON object with the following keys: 'name' (string), 'calories' (number), 'protein' (number in grams), 'carbs' (number in grams), 'fat' (number in grams), 'review' (string, a short nutritional review), 'healthScore' (number from 0 to 10). Do not include any markdown formatting or extra text outside the JSON."
            },
            {
              type: "image_url",
              image_url: {
                url: imagePayload,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const jsonString = response.choices[0].message.content;
    const result = JSON.parse(jsonString.replace(/```json\n?|```/g, ''));
    
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
    const prompt = `Calculate the daily nutritional targets for a user with the following profile:
    Gender: ${profileData.gender}
    Age: ${profileData.age} years
    Weight: ${profileData.weight} kg
    Height: ${profileData.height} cm
    Goal: ${profileData.goal} (lose, maintain, or gain weight)
    Activity Level: ${profileData.lifestyle} (sedentary, light, moderate, or very active)
    
    Please return the response STRICTLY as a JSON object with exactly these keys:
    - 'targetCalories' (number)
    - 'targetProtein' (number in grams)
    - 'targetCarbs' (number in grams)
    - 'targetFats' (number in grams)
    Do not include any markdown formatting or extra text outside the JSON.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
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

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
