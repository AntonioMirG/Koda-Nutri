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
      model: "gpt-4o-mini",
      messages: [
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
                url: imagePayload,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 300,
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
    const prompt = `JSON targets for: ${profileData.gender}, ${profileData.age}y, ${profileData.weight}kg, ${profileData.height}cm, goal:${profileData.goal}, activity:${profileData.lifestyle}. Keys: {targetCalories, targetProtein, targetCarbs, targetFats}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
