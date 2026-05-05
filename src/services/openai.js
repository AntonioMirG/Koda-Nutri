import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo purposes. In production, this should be called from a backend.
});

export const analyzeFoodImage = async (base64Image) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "Analyze this image of food. Please return the response strictly as a JSON object with the following keys: 'name' (string), 'calories' (number), 'protein' (number in grams), 'carbs' (number in grams), 'fat' (number in grams), 'review' (string, a short nutritional review), 'healthScore' (number from 0 to 100). Do not include any markdown formatting or extra text outside the JSON." 
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const jsonString = response.choices[0].message.content;
    const result = JSON.parse(jsonString.replace(/```json\n?|```/g, ''));
    return result;
  } catch (error) {
    console.error("Error analyzing image with OpenAI:", error);
    throw error;
  }
};
