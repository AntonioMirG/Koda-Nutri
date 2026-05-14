export const RECIPES_DB = [
  {
    id: 1,
    name: {
      en: "Lemon Garlic Butter Salmon",
      es: "Salmón con Mantequilla de Limón y Ajo"
    },
    description: {
      en: "A high-protein, healthy fat meal perfect for muscle recovery.",
      es: "Una comida rica en proteínas y grasas saludables, perfecta para la recuperación muscular."
    },
    macros: { p: 35, c: 5, f: 22, calories: 360 },
    ingredients: {
      en: ["Salmon fillet", "Lemon", "Garlic", "Asparagus", "Olive oil"],
      es: ["Filete de salmón", "Limón", "Ajo", "Espárragos", "Aceite de oliva"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Season salmon with garlic and lemon. Bake at 200C with asparagus for 15-20 mins.",
      es: "Sazona el salmón con ajo y limón. Hornea a 200C con espárragos durante 15-20 min."
    }
  },
  {
    id: 2,
    name: {
      en: "Quinoa Chicken Bowl",
      es: "Bowl de Pollo y Quinoa"
    },
    description: {
      en: "Balanced meal with complex carbs and lean protein.",
      es: "Comida equilibrada con carbohidratos complejos y proteína magra."
    },
    macros: { p: 40, c: 45, f: 12, calories: 450 },
    ingredients: {
      en: ["Chicken breast", "Quinoa", "Spinach", "Cherry tomatoes", "Avocado"],
      es: ["Pechuga de pollo", "Quinoa", "Espinacas", "Tomates cherry", "Aguacate"]
    },
    time: "25 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook quinoa. Grill chicken. Mix in a bowl with fresh veggies and avocado.",
      es: "Cocina la quinoa. Cocina el pollo a la plancha. Mezcla en un bowl con verduras frescas y aguacate."
    }
  },
  {
    id: 3,
    name: {
      en: "Tofu Stir-Fry with Broccoli",
      es: "Salteado de Tofu con Brócoli"
    },
    description: {
      en: "Plant-based protein powerhouse with fiber-rich veggies.",
      es: "Fuente de proteína vegetal con verduras ricas en fibra."
    },
    macros: { p: 25, c: 30, f: 15, calories: 350 },
    ingredients: {
      en: ["Firm Tofu", "Broccoli", "Soy sauce", "Ginger", "Sesame oil"],
      es: ["Tofu firme", "Brócoli", "Salsa de soja", "Jengibre", "Aceite de sésamo"]
    },
    time: "15 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Press tofu, cut into cubes. Sauté with broccoli and ginger in sesame oil.",
      es: "Presiona el tofu, córtalo en cubos. Saltéalo con brócoli y jengibre en aceite de sésamo."
    }
  },
  {
    id: 4,
    name: {
      en: "Oatmeal with Blueberries",
      es: "Avena con Arándanos"
    },
    description: {
      en: "The ultimate energy-boosting breakfast.",
      es: "El desayuno definitivo para aumentar la energía."
    },
    macros: { p: 15, c: 60, f: 18, calories: 460 },
    ingredients: {
      en: ["Oats", "Blueberries", "Walnuts", "Almond milk", "Honey"],
      es: ["Avena", "Arándanos", "Nueces", "Leche de almendras", "Miel"]
    },
    time: "10 min",
    category: "Carb Load",
    image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook oats with milk. Top with berries, nuts and a drizzle of honey.",
      es: "Cocina la avena con leche. Cubre con arándanos, nueces y un chorrito de miel."
    }
  },
  {
    id: 5,
    name: {
      en: "Zucchini Noodles Pesto",
      es: "Tallarines de Calabacín al Pesto"
    },
    description: {
      en: "Low-carb alternative to pasta with high satiety.",
      es: "Alternativa baja en carbohidratos a la pasta con alta saciedad."
    },
    macros: { p: 32, c: 12, f: 25, calories: 400 },
    ingredients: {
      en: ["Zucchini", "Ground Turkey", "Basil Pesto", "Parmesan"],
      es: ["Calabacín", "Pavo picado", "Pesto de albahaca", "Parmesano"]
    },
    time: "15 min",
    category: "Low Carb",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Spiralize zucchini. Brown turkey in a pan. Mix with pesto and noodles.",
      es: "Haz espirales con el calabacín. Dora el pavo en una sartén. Mezcla con el pesto y los tallarines."
    }
  },
  {
    id: 6,
    name: {
      en: "Greek Yogurt Parfait",
      es: "Parfait de Yogur Griego"
    },
    description: {
      en: "Quick snack or breakfast high in probiotics and protein.",
      es: "Snack rápido o desayuno rico en probióticos y proteínas."
    },
    macros: { p: 22, c: 25, f: 5, calories: 240 },
    ingredients: {
      en: ["Greek Yogurt", "Granola", "Strawberries", "Chia seeds"],
      es: ["Yogur griego", "Granola", "Fresas", "Semillas de chía"]
    },
    time: "5 min",
    category: "Quick Snack",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Layer yogurt, fruit and granola in a glass. Sprinkle chia on top.",
      es: "Coloca capas de yogur, fruta y granola en un vaso. Espolvorea chía por encima."
    }
  },
  {
    id: 7,
    name: {
      en: "Turkey & Avocado Wrap",
      es: "Wrap de Pavo y Aguacate"
    },
    description: {
      en: "Portable and filling meal for busy days.",
      es: "Comida portátil y saciante para días ajetreados."
    },
    macros: { p: 28, c: 35, f: 15, calories: 380 },
    ingredients: {
      en: ["Whole wheat tortilla", "Turkey slices", "Avocado", "Hummus", "Lettuce"],
      es: ["Tortilla de trigo integral", "Lonchas de pavo", "Aguacate", "Hummus", "Lechuga"]
    },
    time: "10 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Spread hummus on tortilla. Add turkey, avocado and lettuce. Roll and serve.",
      es: "Extiende hummus en la tortilla. Añade pavo, aguacate y lechuga. Enrolla y sirve."
    }
  },
  {
    id: 8,
    name: {
      en: "Lentil Soup with Kale",
      es: "Sopa de Lentejas con Kale"
    },
    description: {
      en: "Hearty, fiber-packed vegetarian stew.",
      es: "Guiso vegetariano abundante y rico en fibra."
    },
    macros: { p: 20, c: 55, f: 8, calories: 370 },
    ingredients: {
      en: ["Lentils", "Kale", "Carrots", "Onion", "Turmeric"],
      es: ["Lentejas", "Kale", "Zanahorias", "Cebolla", "Cúrcuma"]
    },
    time: "40 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1547592112-f32252b36e84?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté veggies. Add lentils and water. Simmer until soft. Stir in kale at the end.",
      es: "Saltea las verduras. Añade lentejas y agua. Cocina a fuego lento hasta que estén blandas. Añade el kale al final."
    }
  },
  {
    id: 9,
    name: {
      en: "Beef & Broccoli Bowl",
      es: "Bowl de Ternera y Brócoli"
    },
    description: {
      en: "Classic high-protein meal for muscle building.",
      es: "Comida clásica rica en proteínas para ganar músculo."
    },
    macros: { p: 38, c: 20, f: 18, calories: 390 },
    ingredients: {
      en: ["Lean beef strips", "Broccoli", "Garlic", "Sesame seeds", "Brown rice"],
      es: ["Tiras de ternera magra", "Brócoli", "Ajo", "Semillas de sésamo", "Arroz integral"]
    },
    time: "20 min",
    category: "Bulk",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté beef and broccoli with garlic. Serve over brown rice.",
      es: "Saltea la ternera y el brócoli con ajo. Sirve sobre arroz integral."
    }
  },
  {
    id: 10,
    name: {
      en: "Shrimp Tacos with Lime",
      es: "Tacos de Camarón con Lima"
    },
    description: {
      en: "Light and flavorful seafood tacos.",
      es: "Tacos de marisco ligeros y sabrosos."
    },
    macros: { p: 25, c: 30, f: 12, calories: 330 },
    ingredients: {
      en: ["Shrimp", "Corn tortillas", "Cabbage slaw", "Lime", "Cilantro"],
      es: ["Camarones", "Tortillas de maíz", "Ensalada de col", "Lima", "Cilantro"]
    },
    time: "15 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Grill shrimp with lime. Assemble on tortillas with slaw and cilantro.",
      es: "Cocina los camarones a la plancha con lima. Monta en tortillas con ensalada de col y cilantro."
    }
  },
  {
    id: 11,
    name: {
      en: "Açaí Recovery Bowl",
      es: "Bowl de Açaí Recuperador"
    },
    description: {
      en: "Post-training antioxidant powerhouse.",
      es: "Fuente de antioxidantes para después del entrenamiento."
    },
    macros: { p: 8, c: 65, f: 12, calories: 410 },
    ingredients: {
      en: ["Açaí pulp", "Banana", "Granola", "Coconut flakes", "Berries"],
      es: ["Pulpa de açaí", "Plátano", "Granola", "Coco rallado", "Bayas"]
    },
    time: "10 min",
    category: "Carb Load",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Blend açaí with banana. Top with granola and coconut.",
      es: "Mezcla el açaí con plátano. Cubre con granola y coco."
    }
  },
  {
    id: 12,
    name: {
      en: "Mediterranean Sea Bass",
      es: "Lubina Mediterránea"
    },
    description: {
      en: "Light white fish with aromatic herbs.",
      es: "Pescado blanco ligero con hierbas aromáticas."
    },
    macros: { p: 32, c: 8, f: 14, calories: 290 },
    ingredients: {
      en: ["Sea bass", "Olives", "Tomatoes", "Parsley", "Lemon"],
      es: ["Lubina", "Aceitunas", "Tomates", "Perejil", "Limón"]
    },
    time: "25 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Bake sea bass with tomatoes and olives. Drizzle with lemon.",
      es: "Hornea la lubina con tomates y aceitunas. Rocía con limón."
    }
  },
  {
    id: 13,
    name: {
      en: "Lentil Pasta Bolognese",
      es: "Pasta de Lentejas Boloñesa"
    },
    description: {
      en: "Healthy twist on the Italian classic.",
      es: "Giro saludable al clásico italiano."
    },
    macros: { p: 28, c: 55, f: 10, calories: 420 },
    ingredients: {
      en: ["Lentil pasta", "Lean ground beef", "Tomato sauce", "Carrots", "Onion"],
      es: ["Pasta de lentejas", "Ternera magra picada", "Salsa de tomate", "Zanahorias", "Cebolla"]
    },
    time: "20 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook pasta. Brown beef with veggies. Simmer in sauce.",
      es: "Cocina la pasta. Dora la ternera con verduras. Cocina a fuego lento en la salsa."
    }
  },
  {
    id: 14,
    name: {
      en: "Peanut Tofu Buddha Bowl",
      es: "Buddha Bowl de Tofu y Cacahuete"
    },
    description: {
      en: "Creamy peanut sauce over fresh plant-based protein.",
      es: "Salsa cremosa de cacahuete sobre proteína vegetal fresca."
    },
    macros: { p: 24, c: 40, f: 18, calories: 450 },
    ingredients: {
      en: ["Tofu", "Brown rice", "Peanut butter", "Cucumber", "Edamame"],
      es: ["Tofu", "Arroz integral", "Mantequilla de cacahuete", "Pepino", "Edamame"]
    },
    time: "20 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Assemble rice and tofu. Drizzle with homemade peanut sauce.",
      es: "Monta el arroz y el tofu. Rocía con salsa de cacahuete casera."
    }
  },
  {
    id: 15,
    name: {
      en: "Grilled Turkey & Asparagus",
      es: "Pavo a la Plancha con Espárragos"
    },
    description: {
      en: "Simple, effective, and extremely lean.",
      es: "Simple, efectivo y extremadamente magro."
    },
    macros: { p: 42, c: 4, f: 6, calories: 250 },
    ingredients: {
      en: ["Turkey breast", "Asparagus", "Black pepper", "Lemon juice"],
      es: ["Pechuga de pavo", "Espárragos", "Pimienta negra", "Zumo de limón"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Grill turkey and asparagus with minimal oil. Season with lemon.",
      es: "Cocina el pavo y los espárragos a la plancha con poco aceite. Sazona con limón."
    }
  },
  {
    id: 16,
    name: {
      en: "Avocado & Egg Toast",
      es: "Tostada de Aguacate y Huevo"
    },
    description: {
      en: "The classic nutrient-dense start to your day.",
      es: "El clásico comienzo del día denso en nutrientes."
    },
    macros: { p: 16, c: 30, f: 22, calories: 380 },
    ingredients: {
      en: ["Sourdough", "Avocado", "Poached Egg", "Red pepper flakes"],
      es: ["Pan de masa madre", "Aguacate", "Huevo poché", "Copos de pimiento rojo"]
    },
    time: "10 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Mash avocado on toast. Top with a perfect poached egg.",
      es: "Machaca el aguacate sobre la tostada. Cubre con un huevo poché perfecto."
    }
  },
  {
    id: 17,
    name: {
      en: "Chickpea Coconut Curry",
      es: "Curry de Garbanzos y Coco"
    },
    description: {
      en: "Warm and comforting plant-based curry.",
      es: "Curry vegetal cálido y reconfortante."
    },
    macros: { p: 18, c: 55, f: 20, calories: 480 },
    ingredients: {
      en: ["Chickpeas", "Coconut milk", "Curry powder", "Rice", "Spinach"],
      es: ["Garbanzos", "Leche de coco", "Curry en polvo", "Arroz", "Espinacas"]
    },
    time: "30 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Simmer chickpeas in coconut milk and spices. Serve with rice.",
      es: "Cocina los garbanzos a fuego lento en leche de coco y especias. Sirve con arroz."
    }
  },
  {
    id: 18,
    name: {
      en: "Grilled Steak & Salad",
      es: "Filete a la Plancha con Ensalada"
    },
    description: {
      en: "Iron-rich meal for strength and stamina.",
      es: "Comida rica en hierro para fuerza y resistencia."
    },
    macros: { p: 45, c: 10, f: 25, calories: 460 },
    ingredients: {
      en: ["Sirloin steak", "Arugula", "Balsamic glaze", "Parmesan"],
      es: ["Filete de solomillo", "Rúcula", "Glaseado balsámico", "Parmesano"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sear steak to preference. Serve over fresh arugula with glaze.",
      es: "Sella el filete al gusto. Sirve sobre rúcula fresca con glaseado."
    }
  },
  {
    id: 19,
    name: {
      en: "Banana Protein Pancakes",
      es: "Tortitas de Plátano y Proteína"
    },
    description: {
      en: "Fluffy pancakes without the sugar crash.",
      es: "Tortitas esponjosas sin el bajón de azúcar."
    },
    macros: { p: 32, c: 35, f: 10, calories: 360 },
    ingredients: {
      en: ["Protein powder", "Banana", "Egg whites", "Cinnamon"],
      es: ["Proteína en polvo", "Plátano", "Claras de huevo", "Canela"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Blend all ingredients. Cook on a non-stick griddle.",
      es: "Mezcla todos los ingredientes. Cocina en una plancha antiadherente."
    }
  },
  {
    id: 20,
    name: {
      en: "Roasted Veggie Pasta",
      es: "Pasta con Verduras Asadas"
    },
    description: {
      en: "Fiber-packed and colorful pasta bowl.",
      es: "Bowl de pasta colorido y rico en fibra."
    },
    macros: { p: 12, c: 70, f: 15, calories: 490 },
    ingredients: {
      en: ["Whole wheat penne", "Bell peppers", "Zucchini", "Olive oil"],
      es: ["Penne de trigo integral", "Pimientos", "Calabacín", "Aceite de oliva"]
    },
    time: "30 min",
    category: "Carb Load",
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Roast veggies. Mix with cooked pasta and olive oil.",
      es: "Asa las verduras. Mezcla con pasta cocida y aceite de oliva."
    }
  },
  {
    id: 21,
    name: { en: "Teriyaki Ginger Salmon", es: "Salmón Teriyaki con Jengibre" },
    description: { en: "Omega-3 rich salmon with a sweet and savory glaze.", es: "Salmón rico en Omega-3 con un glaseado dulce y salado." },
    macros: { p: 34, c: 15, f: 18, calories: 380 },
    ingredients: {
      en: ["Salmon fillet", "Teriyaki sauce", "Fresh ginger", "Snap peas", "Brown rice"],
      es: ["Filete de salmón", "Salsa teriyaki", "Jengibre fresco", "Guisantes", "Arroz integral"]
    },
    time: "25 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Marinate salmon in teriyaki and ginger. Bake at 200C. Serve with steamed snap peas.",
      es: "Marina el salmón en teriyaki y jengibre. Hornea a 200C. Sirve con guisantes al vapor."
    }
  },
  {
    id: 22,
    name: { en: "Quinoa Tabbouleh", es: "Tabulé de Quinoa" },
    description: { en: "Fresh Mediterranean salad with a protein twist.", es: "Ensalada mediterránea fresca con un toque de proteína." },
    macros: { p: 12, c: 45, f: 10, calories: 310 },
    ingredients: {
      en: ["Quinoa", "Parsley", "Mint", "Cucumber", "Lemon juice", "Olive oil"],
      es: ["Quinoa", "Perejil", "Menta", "Pepino", "Zumo de limón", "Aceite de oliva"]
    },
    time: "15 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook quinoa and let cool. Mix with chopped herbs and veggies. Dress with lemon and oil.",
      es: "Cocina la quinoa y deja enfriar. Mezcla con hierbas y verduras picadas. Aliña con limón y aceite."
    }
  },
  {
    id: 23,
    name: { en: "Egg White Veggie Omelet", es: "Tortilla de Claras con Verduras" },
    description: { en: "Ultimate lean protein breakfast for cutting.", es: "El desayuno definitivo de proteína magra para definición." },
    macros: { p: 28, c: 6, f: 4, calories: 180 },
    ingredients: {
      en: ["Egg whites", "Spinach", "Mushrooms", "Bell peppers", "Onion"],
      es: ["Claras de huevo", "Espinacas", "Champiñones", "Pimientos", "Cebolla"]
    },
    time: "10 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1510627489930-0c1b0ba84658?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté veggies. Pour egg whites over and cook until set. Fold and serve.",
      es: "Saltea las verduras. Vierte las claras y cocina hasta que cuajen. Dobla y sirve."
    }
  },
  {
    id: 24,
    name: { en: "Classic Beef Chili", es: "Chili con Carne Clásico" },
    description: { en: "Hearty and warming high-protein stew.", es: "Guiso sustancioso y reconfortante rico en proteínas." },
    macros: { p: 35, c: 40, f: 12, calories: 420 },
    ingredients: {
      en: ["Lean ground beef", "Kidney beans", "Tomato purée", "Chili powder", "Onion"],
      es: ["Ternera magra picada", "Frijoles rojos", "Puré de tomate", "Chili en polvo", "Cebolla"]
    },
    time: "45 min",
    category: "Bulk",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Brown beef with onions. Add beans, tomatoes and spices. Simmer for 30 mins.",
      es: "Dora la ternera con cebolla. Añade frijoles, tomate y especias. Cocina a fuego lento 30 min."
    }
  },
  {
    id: 25,
    name: { en: "Miso Glazed Cod", es: "Bacalao Glaseado con Miso" },
    description: { en: "Umami-packed light fish dish.", es: "Plato de pescado ligero lleno de sabor umami." },
    macros: { p: 30, c: 12, f: 8, calories: 260 },
    ingredients: {
      en: ["Cod fillet", "White miso paste", "Mirin", "Sake", "Ginger"],
      es: ["Filete de bacalao", "Pasta de miso blanco", "Mirin", "Sake", "Jengibre"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Marinate cod in miso mixture. Broil for 10-12 mins until caramelized.",
      es: "Marina el bacalao en la mezcla de miso. Gratina 10-12 min hasta que caramelice."
    }
  },
  {
    id: 26,
    name: { en: "Sweet Potato & Black Bean Bowl", es: "Bowl de Camote y Frijoles Negros" },
    description: { en: "Fiber and complex carb powerhouse.", es: "Fuente de fibra y carbohidratos complejos." },
    macros: { p: 15, c: 65, f: 12, calories: 430 },
    ingredients: {
      en: ["Sweet potato", "Black beans", "Corn", "Avocado", "Lime dressing"],
      es: ["Camote", "Frijoles negros", "Maíz", "Aguacate", "Aliño de lima"]
    },
    time: "35 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Roast sweet potato cubes. Mix with beans and corn. Top with avocado and lime.",
      es: "Asa cubos de camote. Mezcla con frijoles y maíz. Cubre con aguacate y lima."
    }
  },
  {
    id: 27,
    name: { en: "Thai Green Curry Chicken", es: "Pollo al Curry Verde Tailandés" },
    description: { en: "Spicy and aromatic coconut curry.", es: "Curry de coco picante y aromático." },
    macros: { p: 35, c: 15, f: 25, calories: 450 },
    ingredients: {
      en: ["Chicken breast", "Green curry paste", "Coconut milk", "Bamboo shoots", "Thai basil"],
      es: ["Pechuga de pollo", "Pasta de curry verde", "Leche de coco", "Brotes de bambú", "Albahaca tailandesa"]
    },
    time: "30 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Fry curry paste. Add coconut milk and chicken. Simmer with veggies and basil.",
      es: "Fríe la pasta de curry. Añade leche de coco y pollo. Cocina con verduras y albahaca."
    }
  },
  {
    id: 28,
    name: { en: "Tuna Salad with Greek Yogurt", es: "Ensalada de Atún con Yogur Griego" },
    description: { en: "Lean and creamy protein snack.", es: "Snack proteico magro y cremoso." },
    macros: { p: 32, c: 5, f: 6, calories: 210 },
    ingredients: {
      en: ["Canned tuna", "Greek yogurt", "Celery", "Red onion", "Dill"],
      es: ["Atún en lata", "Yogur griego", "Apio", "Cebolla roja", "Eneldo"]
    },
    time: "5 min",
    category: "Quick Snack",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Mix tuna with yogurt and chopped veggies. Season with dill and pepper.",
      es: "Mezcla el atún con yogur y verduras picadas. Sazona con eneldo y pimienta."
    }
  },
  {
    id: 29,
    name: { en: "Portobello Mushroom Burgers", es: "Hamburguesas de Champiñón Portobello" },
    description: { en: "Low-carb and vegetarian alternative to beef burgers.", es: "Alternativa vegetariana y baja en carbohidratos a la carne." },
    macros: { p: 12, c: 15, f: 18, calories: 280 },
    ingredients: {
      en: ["Portobello caps", "Goat cheese", "Roasted peppers", "Spinach", "Balsamic"],
      es: ["Champiñones Portobello", "Queso de cabra", "Pimientos asados", "Espinacas", "Balsámico"]
    },
    time: "20 min",
    category: "Low Carb",
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Grill mushroom caps. Fill with cheese and peppers. Serve over spinach with balsamic.",
      es: "Cocina los portobellos a la plancha. Rellena con queso y pimientos. Sirve sobre espinacas."
    }
  },
  {
    id: 30,
    name: { en: "Hummus & Veggie Platter", es: "Plato de Hummus y Verduras" },
    description: { en: "Crunchy and satisfying plant-based snack.", es: "Snack vegetal crujiente y satisfactorio." },
    macros: { p: 10, c: 35, f: 20, calories: 360 },
    ingredients: {
      en: ["Hummus", "Carrots", "Bell peppers", "Cucumber", "Whole wheat pita"],
      es: ["Hummus", "Zanahorias", "Pimientos", "Pepino", "Pan de pita integral"]
    },
    time: "5 min",
    category: "Quick Snack",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Slice veggies and pita. Arrange on a platter with hummus.",
      es: "Corta las verduras y el pita. Organiza en un plato con el hummus."
    }
  },
  {
    id: 31,
    name: { en: "Beef Pho", es: "Pho de Ternera" },
    description: { en: "Aromatic Vietnamese noodle soup.", es: "Sopa de fideos vietnamita aromática." },
    macros: { p: 28, c: 50, f: 12, calories: 420 },
    ingredients: {
      en: ["Rice noodles", "Beef slices", "Bean sprouts", "Star anise", "Cilantro"],
      es: ["Fideos de arroz", "Láminas de ternera", "Brotes de soja", "Anís estrellado", "Cilantro"]
    },
    time: "40 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Simmer beef bones with spices. Blanch noodles. Serve with raw beef and hot broth.",
      es: "Cocina huesos de ternera con especias. Escalda los fideos. Sirve con ternera cruda y caldo caliente."
    }
  },
  {
    id: 32,
    name: { en: "Zucchini Lasagna", es: "Lasaña de Calabacín" },
    description: { en: "Low-carb lasagna using zucchini sheets.", es: "Lasaña baja en carbohidratos usando láminas de calabacín." },
    macros: { p: 35, c: 15, f: 22, calories: 380 },
    ingredients: {
      en: ["Zucchini", "Ground beef", "Ricotta", "Marinara sauce", "Mozzarella"],
      es: ["Calabacín", "Ternera picada", "Ricotta", "Salsa marinara", "Mozzarella"]
    },
    time: "45 min",
    category: "Low Carb",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Slice zucchini thin. Layer with meat sauce and cheeses. Bake until golden.",
      es: "Corta el calabacín fino. Pon capas de carne y quesos. Hornea hasta dorar."
    }
  },
  {
    id: 33,
    name: { en: "Tofu Scramble", es: "Revuelto de Tofu" },
    description: { en: "The vegan alternative to scrambled eggs.", es: "La alternativa vegana a los huevos revueltos." },
    macros: { p: 18, c: 10, f: 12, calories: 240 },
    ingredients: {
      en: ["Firm tofu", "Turmeric", "Nutritional yeast", "Kale", "Mushrooms"],
      es: ["Tofu firme", "Cúrcuma", "Levadura nutricional", "Kale", "Champiñones"]
    },
    time: "15 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Crumble tofu into a pan. Season with turmeric and yeast. Sauté with veggies.",
      es: "Desmenuza el tofu en una sartén. Sazona con cúrcuma y levadura. Saltea con verduras."
    }
  },
  {
    id: 34,
    name: { en: "Chicken Shawarma Plate", es: "Plato de Shawarma de Pollo" },
    description: { en: "Middle Eastern spiced chicken with fresh salad.", es: "Pollo especiado al estilo oriental con ensalada fresca." },
    macros: { p: 40, c: 12, f: 15, calories: 360 },
    ingredients: {
      en: ["Chicken thighs", "Cumin", "Paprika", "Tahini", "Cucumber salad"],
      es: ["Muslos de pollo", "Comino", "Pimentón", "Tahini", "Ensalada de pepino"]
    },
    time: "30 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Season chicken and grill. Slice thin. Serve with tahini and salad.",
      es: "Sazona el pollo y cocínalo a la plancha. Córtalo fino. Sirve con tahini y ensalada."
    }
  },
  {
    id: 35,
    name: { en: "Berry Protein Smoothie", es: "Batido de Proteína y Bayas" },
    description: { en: "Refreshing post-workout shake.", es: "Batido refrescante para después de entrenar." },
    macros: { p: 25, c: 20, f: 5, calories: 220 },
    ingredients: {
      en: ["Whey protein", "Mixed berries", "Spinach", "Almond milk", "Ice"],
      es: ["Proteína de suero", "Bayas mixtas", "Espinacas", "Leche de almendras", "Hielo"]
    },
    time: "5 min",
    category: "Quick Snack",
    image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Blend all ingredients until smooth. Drink immediately.",
      es: "Mezcla todos los ingredientes hasta que quede suave. Bebe inmediatamente."
    }
  },
  {
    id: 36,
    name: { en: "Minestrone Soup", es: "Sopa Minestrone" },
    description: { en: "Classic Italian vegetable soup.", es: "Clásica sopa italiana de verduras." },
    macros: { p: 12, c: 45, f: 6, calories: 280 },
    ingredients: {
      en: ["Beans", "Pasta", "Carrots", "Zucchini", "Tomato broth"],
      es: ["Alubias", "Pasta", "Zanahorias", "Calabacín", "Caldo de tomate"]
    },
    time: "35 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1547592112-f32252b36e84?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook veggies in broth. Add beans and pasta. Simmer until tender.",
      es: "Cocina las verduras en caldo. Añade las alubias y la pasta. Cocina a fuego lento."
    }
  },
  {
    id: 37,
    name: { en: "Grilled Sea Bream", es: "Dorada a la Plancha" },
    description: { en: "Clean and lean white fish.", es: "Pescado blanco limpio y magro." },
    macros: { p: 35, c: 0, f: 8, calories: 220 },
    ingredients: {
      en: ["Sea bream", "Lemon", "Sea salt", "Parsley", "Olive oil"],
      es: ["Dorada", "Limón", "Sal marina", "Perejil", "Aceite de oliva"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Grill fish whole or fillets. Season with salt, lemon and parsley.",
      es: "Cocina el pescado entero o en filetes. Sazona con sal, limón y perejil."
    }
  },
  {
    id: 38,
    name: { en: "Pulled Pork Tacos", es: "Tacos de Pulled Pork" },
    description: { en: "Slow-cooked savory pork in corn tortillas.", es: "Cerdo cocinado a fuego lento en tortillas de maíz." },
    macros: { p: 32, c: 35, f: 18, calories: 430 },
    ingredients: {
      en: ["Pork shoulder", "Corn tortillas", "Pickled onions", "Cilantro", "Lime"],
      es: ["Paleta de cerdo", "Tortillas de maíz", "Cebolla encurtida", "Cilantro", "Lima"]
    },
    time: "120 min",
    category: "Bulk",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Slow cook pork until shreddable. Assemble tacos with toppings.",
      es: "Cocina el cerdo a fuego lento hasta que se pueda desmenuzar. Monta los tacos."
    }
  },
  {
    id: 39,
    name: { en: "Roasted Cauliflower Salad", es: "Ensalada de Coliflor Asada" },
    description: { en: "Nutty and warm vegetable salad.", es: "Ensalada de verduras templada con sabor a nuez." },
    macros: { p: 8, c: 20, f: 15, calories: 250 },
    ingredients: {
      en: ["Cauliflower", "Tahini", "Pomegranate", "Spinach", "Cumin"],
      es: ["Coliflor", "Tahini", "Granada", "Espinacas", "Comino"]
    },
    time: "30 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Roast cauliflower with cumin. Toss with spinach, tahini and pomegranate.",
      es: "Asa la coliflor con comino. Mezcla con espinacas, tahini y granada."
    }
  },
  {
    id: 40,
    name: { en: "Steak and Sweet Potato", es: "Filete con Camote" },
    description: { en: "The ultimate athlete fuel.", es: "El combustible definitivo para atletas." },
    macros: { p: 45, c: 40, f: 20, calories: 520 },
    ingredients: {
      en: ["Ribeye steak", "Sweet potato", "Green beans", "Butter", "Garlic"],
      es: ["Filete ribeye", "Camote", "Judías verdes", "Mantequilla", "Ajo"]
    },
    time: "25 min",
    category: "Bulk",
    image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sear steak. Roast sweet potato. Sauté beans in garlic butter.",
      es: "Sella el filete. Asa el camote. Saltea las judías en mantequilla de ajo."
    }
  },
  {
    id: 41,
    name: { en: "Tofu and Soba Noodles", es: "Tofu con Fideos Soba" },
    description: { en: "Cold buckwheat noodles with protein.", es: "Fideos de trigo sarraceno fríos con proteína." },
    macros: { p: 22, c: 55, f: 10, calories: 410 },
    ingredients: {
      en: ["Soba noodles", "Firm tofu", "Edamame", "Soy sauce", "Sesame seeds"],
      es: ["Fideos soba", "Tofu firme", "Edamame", "Salsa de soja", "Semillas de sésamo"]
    },
    time: "20 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook soba. Pan-sear tofu. Mix with edamame and dressing.",
      es: "Cocina los soba. Sella el tofu en la sartén. Mezcla con edamame y aliño."
    }
  },
  {
    id: 42,
    name: { en: "Salmon Poké Bowl", es: "Poké Bowl de Salmón" },
    description: { en: "Raw salmon over rice with fresh toppings.", es: "Salmón crudo sobre arroz con ingredientes frescos." },
    macros: { p: 30, c: 50, f: 18, calories: 480 },
    ingredients: {
      en: ["Raw salmon", "Sushi rice", "Mango", "Cucumber", "Nori", "Wasabi mayo"],
      es: ["Salmón crudo", "Arroz de sushi", "Mango", "Pepino", "Nori", "Mayo wasabi"]
    },
    time: "25 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook rice. Slice salmon and fruit. Assemble with nori and mayo.",
      es: "Cocina el arroz. Corta el salmón y la fruta. Monta con nori y mayo."
    }
  },
  {
    id: 43,
    name: { en: "Turkey Chili Con Carne", es: "Chili con Carne de Pavo" },
    description: { en: "Leaner version of the classic chili.", es: "Versión más magra del clásico chili." },
    macros: { p: 38, c: 35, f: 8, calories: 360 },
    ingredients: {
      en: ["Ground turkey", "Black beans", "Corn", "Bell peppers", "Spices"],
      es: ["Pavo picado", "Frijoles negros", "Maíz", "Pimientos", "Especias"]
    },
    time: "40 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Simmer all ingredients in a pot until flavors meld.",
      es: "Cocina todos los ingredientes en una olla hasta que los sabores se mezclen."
    }
  },
  {
    id: 44,
    name: { en: "Mediterranean Chickpea Salad", es: "Ensalada de Garbanzos Mediterránea" },
    description: { en: "Quick and crunchy vegetarian salad.", es: "Ensalada vegetariana rápida y crujiente." },
    macros: { p: 15, c: 40, f: 12, calories: 330 },
    ingredients: {
      en: ["Chickpeas", "Feta cheese", "Olives", "Cucumber", "Red onion", "Oregano"],
      es: ["Garbanzos", "Queso feta", "Aceitunas", "Pepino", "Cebolla roja", "Orégano"]
    },
    time: "10 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Mix all ingredients in a bowl. Drizzle with lemon and oil.",
      es: "Mezcla todos los ingredientes en un bowl. Rocía con limón y aceite."
    }
  },
  {
    id: 45,
    name: { en: "Cod with Asparagus", es: "Bacalao con Espárragos" },
    description: { en: "Ultra-clean protein meal.", es: "Comida proteica ultra limpia." },
    macros: { p: 32, c: 5, f: 4, calories: 200 },
    ingredients: {
      en: ["Cod", "Asparagus", "Lemon", "Black pepper", "Dill"],
      es: ["Bacalao", "Espárragos", "Limón", "Pimienta negra", "Eneldo"]
    },
    time: "15 min",
    category: "Low Carb",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Steam cod and asparagus. Season with lemon and dill.",
      es: "Cocina al vapor el bacalao y los espárragos. Sazona con limón y eneldo."
    }
  },
  {
    id: 46,
    name: { en: "Beef Stir-Fry with Snap Peas", es: "Salteado de Ternera con Guisantes" },
    description: { en: "High-heat asian style beef.", es: "Ternera al estilo asiático a fuego fuerte." },
    macros: { p: 35, c: 12, f: 18, calories: 350 },
    ingredients: {
      en: ["Beef strips", "Snap peas", "Ginger", "Garlic", "Oyster sauce"],
      es: ["Tiras de ternera", "Guisantes", "Jengibre", "Ajo", "Salsa de ostras"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Flash fry beef and peas. Add sauce at the end.",
      es: "Saltea rápido la ternera y los guisantes. Añade la salsa al final."
    }
  },
  {
    id: 47,
    name: { en: "Greek Salad with Grilled Chicken", es: "Ensalada Griega con Pollo a la Plancha" },
    description: { en: "The classic salad with extra protein.", es: "La ensalada clásica con extra de proteína." },
    macros: { p: 42, c: 10, f: 15, calories: 340 },
    ingredients: {
      en: ["Chicken breast", "Tomato", "Cucumber", "Kalamata olives", "Feta"],
      es: ["Pechuga de pollo", "Tomate", "Pepino", "Aceitunas Kalamata", "Feta"]
    },
    time: "20 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Grill chicken and slice. Toss with fresh veggies and cheese.",
      es: "Cocina el pollo y córtalo. Mezcla con verduras frescas y queso."
    }
  },
  {
    id: 48,
    name: { en: "Mushroom Risotto", es: "Risotto de Champiñones" },
    description: { en: "Creamy Italian rice with earthy mushrooms.", es: "Arroz italiano cremoso con champiñones." },
    macros: { p: 10, c: 65, f: 18, calories: 480 },
    ingredients: {
      en: ["Arborio rice", "Porcini mushrooms", "Parmesan", "White wine", "Broth"],
      es: ["Arroz arborio", "Boletus", "Parmesano", "Vino blanco", "Caldo"]
    },
    time: "40 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Add broth slowly to rice while stirring. Finish with mushrooms and cheese.",
      es: "Añade caldo poco a poco al arroz sin dejar de remover. Termina con champiñones y queso."
    }
  },
  {
    id: 49,
    name: { en: "Tofu Curry with Spinach", es: "Curry de Tofu con Espinacas" },
    description: { en: "Healthy plant-based curry.", es: "Curry vegetal saludable." },
    macros: { p: 20, c: 40, f: 15, calories: 370 },
    ingredients: {
      en: ["Tofu", "Spinach", "Curry spices", "Coconut cream", "Rice"],
      es: ["Tofu", "Espinacas", "Especias de curry", "Crema de coco", "Arroz"]
    },
    time: "25 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook tofu in spices and coconut. Wilt in spinach. Serve with rice.",
      es: "Cocina el tofu en especias y coco. Añade las espinacas. Sirve con arroz."
    }
  },
  {
    id: 50,
    name: { en: "Lean Beef Burgers", es: "Hamburguesas de Ternera Magra" },
    description: { en: "High-protein burgers without the guilt.", es: "Hamburguesas ricas en proteínas sin remordimientos." },
    macros: { p: 40, c: 30, f: 15, calories: 410 },
    ingredients: {
      en: ["Lean ground beef", "Whole wheat bun", "Lettuce", "Tomato", "Pickles"],
      es: ["Ternera magra picada", "Pan integral", "Lechuga", "Tomate", "Pepinillos"]
    },
    time: "20 min",
    category: "Bulk",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Grill patties. Assemble on buns with fresh toppings.",
      es: "Cocina las hamburguesas a la plancha. Monta en el pan con ingredientes frescos."
    }
  },
  {
    id: 51,
    name: { en: "Lentil Salad with Beets", es: "Ensalada de Lentejas con Remolacha" },
    description: { en: "Earthy and nutrient-dense salad.", es: "Ensalada con sabor a tierra y rica en nutrientes." },
    macros: { p: 15, c: 45, f: 8, calories: 310 },
    ingredients: {
      en: ["Lentils", "Roasted beets", "Goat cheese", "Walnuts", "Spinach"],
      es: ["Lentejas", "Remolacha asada", "Queso de cabra", "Nueces", "Espinacas"]
    },
    time: "15 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Toss all ingredients together. Drizzle with balsamic vinegar.",
      es: "Mezcla todos los ingredientes. Rocía con vinagre balsámico."
    }
  },
  {
    id: 52,
    name: { en: "Scallops with Pea Purée", es: "Vieiras con Puré de Guisantes" },
    description: { en: "Elegant and light seafood dish.", es: "Plato de marisco elegante y ligero." },
    macros: { p: 28, c: 20, f: 6, calories: 240 },
    ingredients: {
      en: ["Scallops", "Frozen peas", "Mint", "Lemon juice", "Butter"],
      es: ["Vieiras", "Guisantes", "Menta", "Zumo de limón", "Mantequilla"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1532634822-4047a6b29668?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sear scallops until golden. Blend peas with mint into a smooth purée.",
      es: "Sella las vieiras hasta que doren. Tritura los guisantes con menta para el puré."
    }
  },
  {
    id: 53,
    name: { en: "Chicken Stir-Fry with Broccoli", es: "Salteado de Pollo con Brócoli" },
    description: { en: "The classic bodybuilding staple.", es: "El básico clásico del fitness." },
    macros: { p: 40, c: 15, f: 8, calories: 300 },
    ingredients: {
      en: ["Chicken breast", "Broccoli", "Soy sauce", "Garlic", "Sesame oil"],
      es: ["Pechuga de pollo", "Brócoli", "Salsa de soja", "Ajo", "Aceite de sésamo"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté chicken and broccoli at high heat. Season with soy and garlic.",
      es: "Saltea el pollo y el brócoli a fuego fuerte. Sazona con soja y ajo."
    }
  },
  {
    id: 54,
    name: { en: "Turkey Meatballs and Zoodles", es: "Albóndigas de Pavo con Zoodles" },
    description: { en: "Italian style without the carb load.", es: "Estilo italiano sin la carga de carbohidratos." },
    macros: { p: 35, c: 12, f: 15, calories: 320 },
    ingredients: {
      en: ["Ground turkey", "Zucchini noodles", "Marinara sauce", "Parmesan", "Basil"],
      es: ["Pavo picado", "Zoodles de calabacín", "Salsa marinara", "Parmesano", "Albahaca"]
    },
    time: "30 min",
    category: "Low Carb",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Bake turkey meatballs. Serve over zoodles with hot marinara.",
      es: "Hornea las albóndigas de pavo. Sirve sobre zoodles con marinara caliente."
    }
  },
  {
    id: 55,
    name: { en: "Pasta e Fagioli", es: "Pasta e Fagioli" },
    description: { en: "Traditional Italian pasta and bean stew.", es: "Guiso tradicional italiano de pasta y alubias." },
    macros: { p: 18, c: 60, f: 10, calories: 410 },
    ingredients: {
      en: ["Ditalini pasta", "Borlotti beans", "Tomatoes", "Garlic", "Rosemary"],
      es: ["Pasta ditalini", "Alubias borlotti", "Tomates", "Ajo", "Romero"]
    },
    time: "40 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1547592112-f32252b36e84?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Simmer beans with aromatics. Add pasta and cook until creamy.",
      es: "Cocina las alubias con aromáticos. Añade la pasta y cocina hasta que esté cremoso."
    }
  },
  {
    id: 56,
    name: { en: "Seared Tuna with Ginger", es: "Atún Sellado con Jengibre" },
    description: { en: "Fresh tuna steaks with a Japanese twist.", es: "Filetes de atún fresco con un toque japonés." },
    macros: { p: 38, c: 5, f: 10, calories: 280 },
    ingredients: {
      en: ["Tuna steak", "Fresh ginger", "Soy sauce", "Green onions", "Sesame seeds"],
      es: ["Filete de atún", "Jengibre fresco", "Salsa de soja", "Cebolletas", "Semillas de sésamo"]
    },
    time: "10 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sear tuna very quickly on each side. Garnish with ginger and soy.",
      es: "Sella el atún muy rápido por cada lado. Decora con jengibre y soja."
    }
  },
  {
    id: 57,
    name: { en: "Cottage Cheese and Fruit", es: "Queso Cottage con Fruta" },
    description: { en: "High-protein snack or breakfast.", es: "Snack o desayuno rico en proteínas." },
    macros: { p: 24, c: 18, f: 4, calories: 210 },
    ingredients: {
      en: ["Cottage cheese", "Pineapple", "Honey", "Walnuts"],
      es: ["Queso cottage", "Piña", "Miel", "Nueces"]
    },
    time: "5 min",
    category: "Quick Snack",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Serve cheese in a bowl topped with fruit and honey.",
      es: "Sirve el queso en un bowl cubierto con fruta y miel."
    }
  },
  {
    id: 58,
    name: { en: "Lamb Chops with Mint", es: "Chuletas de Cordero con Menta" },
    description: { en: "Succulent lamb with fresh herb sauce.", es: "Cordero suculento con salsa de hierbas frescas." },
    macros: { p: 35, c: 2, f: 28, calories: 420 },
    ingredients: {
      en: ["Lamb chops", "Fresh mint", "Vinegar", "Garlic", "Olive oil"],
      es: ["Chuletas de cordero", "Menta fresca", "Vinagre", "Ajo", "Aceite de oliva"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Grill chops. Blend mint with vinegar and oil for the sauce.",
      es: "Cocina las chuletas. Tritura la menta con vinagre y aceite para la salsa."
    }
  },
  {
    id: 59,
    name: { en: "Eggplant Parmigiana", es: "Berenjena a la Parmesana" },
    description: { en: "Classic Italian vegetarian bake.", es: "Clásico horneado italiano vegetariano." },
    macros: { p: 15, c: 25, f: 18, calories: 340 },
    ingredients: {
      en: ["Eggplant", "Mozzarella", "Parmesan", "Tomato sauce", "Basil"],
      es: ["Berenjena", "Mozzarella", "Parmesano", "Salsa de tomate", "Albahaca"]
    },
    time: "50 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Slice and grill eggplant. Layer with sauce and cheese. Bake until bubbly.",
      es: "Corta y cocina la berenjena. Pon capas de salsa y queso. Hornea hasta burbujear."
    }
  },
  {
    id: 60,
    name: { en: "Cod Tacos with Slaw", es: "Tacos de Bacalao con Ensalada" },
    description: { en: "Fresh and light seafood tacos.", es: "Tacos de marisco frescos y ligeros." },
    macros: { p: 25, c: 35, f: 12, calories: 350 },
    ingredients: {
      en: ["Cod fillets", "Corn tortillas", "Cabbage slaw", "Lime", "Chipotle mayo"],
      es: ["Filetes de bacalao", "Tortillas de maíz", "Ensalada de col", "Lima", "Mayo chipotle"]
    },
    time: "20 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Pan-fry cod. Serve in tortillas with slaw and lime.",
      es: "Fríe el bacalao en la sartén. Sirve en tortillas con col y lima."
    }
  },
  {
    id: 61,
    name: { en: "Brussels Sprouts with Bacon", es: "Coles de Bruselas con Bacon" },
    description: { en: "Savory vegetable side or light meal.", es: "Guarnición de verduras sabrosa o comida ligera." },
    macros: { p: 12, c: 15, f: 15, calories: 240 },
    ingredients: {
      en: ["Brussels sprouts", "Bacon bits", "Balsamic glaze", "Onion"],
      es: ["Coles de Bruselas", "Bacon", "Glaseado balsámico", "Cebolla"]
    },
    time: "25 min",
    category: "Low Carb",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Roast sprouts with bacon until crispy. Drizzle with balsamic.",
      es: "Asa las coles con bacon hasta que estén crujientes. Rocía con balsámico."
    }
  },
  {
    id: 62,
    name: { en: "Hummus Chicken Bowl", es: "Bowl de Pollo y Hummus" },
    description: { en: "Mediterranean flavors in a convenient bowl.", es: "Sabores mediterráneos en un cómodo bowl." },
    macros: { p: 42, c: 15, f: 20, calories: 410 },
    ingredients: {
      en: ["Chicken breast", "Hummus", "Kalamata olives", "Cherry tomatoes", "Cucumber"],
      es: ["Pechuga de pollo", "Hummus", "Aceitunas Kalamata", "Tomates cherry", "Pepino"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Assemble bowl with grilled chicken, hummus and fresh veggies.",
      es: "Monta el bowl con pollo a la plancha, hummus y verduras frescas."
    }
  },
  {
    id: 63,
    name: { en: "Beef and Peppers Stir-Fry", es: "Salteado de Ternera y Pimientos" },
    description: { en: "Colorful and fast high-protein meal.", es: "Comida colorida y rápida rica en proteínas." },
    macros: { p: 38, c: 12, f: 18, calories: 370 },
    ingredients: {
      en: ["Beef strips", "Bell peppers", "Onion", "Ginger", "Soy sauce"],
      es: ["Tiras de ternera", "Pimientos", "Cebolla", "Jengibre", "Salsa de soja"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté all ingredients at high heat. Season with ginger and soy.",
      es: "Saltea todos los ingredientes a fuego fuerte. Sazona con jengibre y soja."
    }
  },
  {
    id: 64,
    name: { en: "Vegan Poke with Edamame", es: "Poké Vegano con Edamame" },
    description: { en: "Plant-based version of the Hawaiian favorite.", es: "Versión vegetal del favorito hawaiano." },
    macros: { p: 18, c: 55, f: 12, calories: 420 },
    ingredients: {
      en: ["Sushi rice", "Edamame", "Tofu cubes", "Seaweed salad", "Pickled ginger"],
      es: ["Arroz de sushi", "Edamame", "Dados de tofu", "Ensalada de algas", "Jengibre encurtido"]
    },
    time: "20 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Assemble rice, edamame and tofu in a bowl with toppings.",
      es: "Monta el arroz, edamame y tofu en un bowl con los acompañamientos."
    }
  },
  {
    id: 65,
    name: { en: "Salmon with Mango Salsa", es: "Salmón con Salsa de Mango" },
    description: { en: "Tropical and refreshing fish dish.", es: "Plato de pescado tropical y refrescante." },
    macros: { p: 34, c: 18, f: 20, calories: 390 },
    ingredients: {
      en: ["Salmon fillet", "Fresh mango", "Red onion", "Cilantro", "Lime juice"],
      es: ["Filete de salmón", "Mango fresco", "Cebolla roja", "Cilantro", "Zumo de lima"]
    },
    time: "25 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Bake salmon. Mix mango and aromatics for salsa. Serve on top.",
      es: "Hornea el salmón. Mezcla el mango y los aromáticos para la salsa. Sirve encima."
    }
  },
  {
    id: 66,
    name: { en: "Chicken Skewers with Peppers", es: "Brochetas de Pollo con Pimientos" },
    description: { en: "Easy grilled chicken for any occasion.", es: "Pollo a la plancha fácil para cualquier ocasión." },
    macros: { p: 38, c: 8, f: 10, calories: 290 },
    ingredients: {
      en: ["Chicken pieces", "Bell peppers", "Red onion", "Oregano", "Lemon"],
      es: ["Trozos de pollo", "Pimientos", "Cebolla roja", "Orégano", "Limón"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Thread chicken and veggies onto skewers. Grill until cooked through.",
      es: "Ensarta el pollo y las verduras en brochetas. Cocina a la plancha."
    }
  },
  {
    id: 67,
    name: { en: "Lentil Pasta with Broccoli", es: "Pasta de Lentejas con Brócoli" },
    description: { en: "Gluten-free and high-protein pasta.", es: "Pasta sin gluten y rica en proteínas." },
    macros: { p: 25, c: 50, f: 8, calories: 380 },
    ingredients: {
      en: ["Lentil penne", "Broccoli florets", "Garlic", "Red pepper flakes", "Olive oil"],
      es: ["Penne de lentejas", "Brócoli", "Ajo", "Copos de pimiento", "Aceite de oliva"]
    },
    time: "15 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook pasta and broccoli together. Toss with garlic oil and spices.",
      es: "Cocina la pasta y el brócoli juntos. Mezcla con aceite de ajo y especias."
    }
  },
  {
    id: 68,
    name: { en: "Steak and Asparagus Stir-Fry", es: "Salteado de Ternera y Espárragos" },
    description: { en: "Lean and fast high-protein dinner.", es: "Cena magra y rápida rica en proteínas." },
    macros: { p: 42, c: 8, f: 18, calories: 380 },
    ingredients: {
      en: ["Sirloin strips", "Asparagus", "Garlic", "Ginger", "Soy sauce"],
      es: ["Tiras de solomillo", "Espárragos", "Ajo", "Jengibre", "Salsa de soja"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Stir-fry steak and asparagus in a wok. Season with ginger and garlic.",
      es: "Saltea la ternera y los espárragos en un wok. Sazona con jengibre y ajo."
    }
  },
  {
    id: 69,
    name: { en: "Cauliflower Steaks", es: "Filetes de Coliflor" },
    description: { en: "Roasted cauliflower slices with bold spices.", es: "Láminas de coliflor asadas con especias intensas." },
    macros: { p: 6, c: 15, f: 12, calories: 190 },
    ingredients: {
      en: ["Cauliflower", "Turmeric", "Paprika", "Tahini", "Lemon"],
      es: ["Coliflor", "Cúrcuma", "Pimentón", "Tahini", "Limón"]
    },
    time: "25 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Slice cauliflower into thick 'steaks'. Season and roast until tender.",
      es: "Corta la coliflor en 'filetes' gruesos. Sazona y asa hasta que esté tierna."
    }
  },
  {
    id: 70,
    name: { en: "Greek Meatballs (Keftedes)", es: "Albóndigas Griegas (Keftedes)" },
    description: { en: "Aromatic herb-filled meatballs.", es: "Albóndigas aromáticas llenas de hierbas." },
    macros: { p: 32, c: 10, f: 20, calories: 360 },
    ingredients: {
      en: ["Ground beef", "Fresh mint", "Dried oregano", "Garlic", "Lemon"],
      es: ["Ternera picada", "Menta fresca", "Orégano seco", "Ajo", "Limón"]
    },
    time: "30 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Mix ingredients and form small balls. Bake or pan-fry until brown.",
      es: "Mezcla los ingredientes y forma bolitas. Hornea o fríe hasta dorar."
    }
  },
  {
    id: 71,
    name: { en: "Lemon Herb Roasted Chicken", es: "Pollo Asado al Limón y Hierbas" },
    description: { en: "Classic juicy roasted chicken with aromatic herbs.", es: "Pollo asado jugoso clásico con hierbas aromáticas." },
    macros: { p: 42, c: 5, f: 15, calories: 330 },
    ingredients: {
      en: ["Whole chicken", "Lemon", "Rosemary", "Thyme", "Garlic"],
      es: ["Pollo entero", "Limón", "Romero", "Tomillo", "Ajo"]
    },
    time: "90 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Stuff chicken with lemon and garlic. Rub with herbs and roast until done.",
      es: "Rellena el pollo con limón y ajo. Frota con hierbas y asa hasta que esté listo."
    }
  },
  {
    id: 72,
    name: { en: "Spicy Tofu with Green Beans", es: "Tofu Picante con Judías Verdes" },
    description: { en: "Szechuan style tofu with a kick.", es: "Tofu al estilo Szechuan con un toque picante." },
    macros: { p: 20, c: 15, f: 12, calories: 260 },
    ingredients: {
      en: ["Firm tofu", "Green beans", "Chili paste", "Soy sauce", "Ginger"],
      es: ["Tofu firme", "Judías verdes", "Pasta de chili", "Salsa de soja", "Jengibre"]
    },
    time: "20 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Stir-fry tofu and beans with chili paste and ginger.",
      es: "Saltea el tofu y las judías con pasta de chili y jengibre."
    }
  },
  {
    id: 73,
    name: { en: "Prawn and Avocado Salad", es: "Ensalada de Gambas y Aguacate" },
    description: { en: "Light and refreshing seafood salad.", es: "Ensalada de marisco ligera y refrescante." },
    macros: { p: 28, c: 10, f: 18, calories: 310 },
    ingredients: {
      en: ["Prawns", "Avocado", "Mixed greens", "Lemon dressing", "Cherry tomatoes"],
      es: ["Gambas", "Aguacate", "Mezcla de lechugas", "Aliño de limón", "Tomates cherry"]
    },
    time: "15 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Mix all ingredients. Toss with a light lemon and oil dressing.",
      es: "Mezcla todos los ingredientes. Aliña con limón y aceite."
    }
  },
  {
    id: 74,
    name: { en: "Beef and Mushroom Skewers", es: "Brochetas de Ternera y Champiñones" },
    description: { en: "Grilled savory beef and earthy mushrooms.", es: "Ternera sabrosa y champiñones a la plancha." },
    macros: { p: 38, c: 5, f: 20, calories: 380 },
    ingredients: {
      en: ["Sirloin chunks", "Cremini mushrooms", "Soy sauce", "Garlic", "Rosemary"],
      es: ["Trozos de solomillo", "Champiñones", "Salsa de soja", "Ajo", "Romero"]
    },
    time: "25 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Thread beef and mushrooms. Grill until medium-rare.",
      es: "Ensarta la ternera y los champiñones. Cocina a la plancha."
    }
  },
  {
    id: 75,
    name: { en: "Vegetable Paella", es: "Paella de Verduras" },
    description: { en: "Colorful Spanish rice dish with fresh veggies.", es: "Plato de arroz español colorido con verduras frescas." },
    macros: { p: 12, c: 75, f: 10, calories: 480 },
    ingredients: {
      en: ["Rice", "Saffron", "Bell peppers", "Artichokes", "Green beans"],
      es: ["Arroz", "Azafrán", "Pimientos", "Alcachofas", "Judías verdes"]
    },
    time: "45 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1534080564607-317f549ca4a3?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté veggies. Add rice and saffron broth. Simmer without stirring.",
      es: "Saltea las verduras. Añade el arroz y el caldo con azafrán. Cocina sin remover."
    }
  },
  {
    id: 76,
    name: { en: "Lamb Tagine with Apricots", es: "Tagine de Cordero con Albaricoques" },
    description: { en: "Moroccan slow-cooked lamb with sweet notes.", es: "Cordero marroquí a fuego lento con toques dulces." },
    macros: { p: 35, c: 45, f: 25, calories: 550 },
    ingredients: {
      en: ["Lamb chunks", "Dried apricots", "Cinnamon", "Chickpeas", "Couscous"],
      es: ["Trozos de cordero", "Albaricoques secos", "Canela", "Garbanzos", "Cuscús"]
    },
    time: "120 min",
    category: "Bulk",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Slow cook lamb with spices and apricots. Serve over couscous.",
      es: "Cocina el cordero con especias y albaricoques. Sirve sobre cuscús."
    }
  },
  {
    id: 77,
    name: { en: "Tuna and White Bean Salad", es: "Ensalada de Atún y Alubias Blancas" },
    description: { en: "Quick and filling high-protein salad.", es: "Ensalada rica en proteínas rápida y saciante." },
    macros: { p: 32, c: 30, f: 8, calories: 340 },
    ingredients: {
      en: ["Canned tuna", "White beans", "Red onion", "Parsley", "Vinegar"],
      es: ["Atún en lata", "Alubias blancas", "Cebolla roja", "Perejil", "Vinagre"]
    },
    time: "10 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Toss tuna and beans with aromatics and vinegar.",
      es: "Mezcla el atún y las alubias con aromáticos y vinagre."
    }
  },
  {
    id: 78,
    name: { en: "Grilled Haloumi with Veggies", es: "Haloumi a la Plancha con Verduras" },
    description: { en: "Satisfying vegetarian meal with salty cheese.", es: "Comida vegetariana satisfactoria con queso salado." },
    macros: { p: 18, c: 15, f: 22, calories: 350 },
    ingredients: {
      en: ["Haloumi cheese", "Zucchini", "Bell peppers", "Cherry tomatoes"],
      es: ["Queso haloumi", "Calabacín", "Pimientos", "Tomates cherry"]
    },
    time: "15 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Grill haloumi and veggies together. Season with herbs.",
      es: "Cocina el haloumi y las verduras a la plancha. Sazona con hierbas."
    }
  },
  {
    id: 79,
    name: { en: "Beef and Barley Soup", es: "Sopa de Ternera y Cebada" },
    description: { en: "Hearty and warming nutrient-dense soup.", es: "Sopa sustanciosa y reconfortante rica en nutrientes." },
    macros: { p: 30, c: 40, f: 12, calories: 380 },
    ingredients: {
      en: ["Beef chunks", "Barley", "Carrots", "Celery", "Beef broth"],
      es: ["Trozos de ternera", "Cebada", "Zanahorias", "Apio", "Caldo de ternera"]
    },
    time: "60 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1547592112-f32252b36e84?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Simmer beef and barley with veggies until tender.",
      es: "Cocina la ternera y la cebada con verduras hasta que estén tiernas."
    }
  },
  {
    id: 80,
    name: { en: "Lentil Bolognese", es: "Boloñesa de Lentejas" },
    description: { en: "Vegan twist on the pasta classic.", es: "Giro vegano al clásico de pasta." },
    macros: { p: 18, c: 65, f: 8, calories: 420 },
    ingredients: {
      en: ["Lentejas", "Whole wheat pasta", "Tomato sauce", "Carrots", "Onion"],
      es: ["Lentejas", "Pasta integral", "Salsa de tomate", "Zanahorias", "Cebolla"]
    },
    time: "30 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook lentils in tomato sauce. Serve over pasta.",
      es: "Cocina las lentejas en salsa de tomate. Sirve sobre pasta."
    }
  },
  {
    id: 81,
    name: { en: "Chicken Piccata", es: "Pollo a la Piccata" },
    description: { en: "Lemon and caper pan-seared chicken.", es: "Pollo a la sartén con limón y alcaparras." },
    macros: { p: 38, c: 10, f: 12, calories: 310 },
    ingredients: {
      en: ["Chicken breast", "Lemon", "Capers", "Parsley", "White wine"],
      es: ["Pechuga de pollo", "Limón", "Alcaparras", "Perejil", "Vino blanco"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Pan-fry chicken. Make a sauce with lemon and capers.",
      es: "Fríe el pollo. Haz una salsa con limón y alcaparras."
    }
  },
  {
    id: 82,
    name: { en: "Cod with Tomato and Olives", es: "Bacalao con Tomate y Aceitunas" },
    description: { en: "Mediterranean style white fish.", es: "Pescado blanco al estilo mediterráneo." },
    macros: { p: 32, c: 12, f: 10, calories: 280 },
    ingredients: {
      en: ["Cod fillets", "Cherry tomatoes", "Black olives", "Garlic", "Basil"],
      es: ["Filetes de bacalao", "Tomates cherry", "Aceitunas negras", "Ajo", "Albahaca"]
    },
    time: "25 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Bake cod with tomatoes and olives. Garnish with basil.",
      es: "Hornea el bacalao con tomates y aceitunas. Decora con albahaca."
    }
  },
  {
    id: 83,
    name: { en: "Beef and Broccoli Ramen", es: "Ramen de Ternera y Brócoli" },
    description: { en: "Quick and savory noodle bowl.", es: "Bowl de fideos rápido y sabroso." },
    macros: { p: 35, c: 45, f: 15, calories: 450 },
    ingredients: {
      en: ["Ramen noodles", "Beef strips", "Broccoli", "Egg", "Soy broth"],
      es: ["Fideos ramen", "Tiras de ternera", "Brócoli", "Huevo", "Caldo de soja"]
    },
    time: "20 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook noodles. Sauté beef and broccoli. Serve in hot broth with an egg.",
      es: "Cocina los fideos. Saltea ternera y brócoli. Sirve en caldo con un huevo."
    }
  },
  {
    id: 84,
    name: { en: "Vegan Buddha Bowl", es: "Buddha Bowl Vegano" },
    description: { en: "A rainbow of nutrition in one bowl.", es: "Un arcoíris de nutrición en un bowl." },
    macros: { p: 15, c: 55, f: 18, calories: 450 },
    ingredients: {
      en: ["Quinoa", "Roasted chickpeas", "Kale", "Sweet potato", "Tahini dressing"],
      es: ["Quinoa", "Garbanzos asados", "Kale", "Camote", "Aliño de tahini"]
    },
    time: "30 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Assemble all components. Drizzle with creamy tahini.",
      es: "Monta todos los componentes. Rocía con tahini cremoso."
    }
  },
  {
    id: 85,
    name: { en: "Grilled Lamb Chops", es: "Chuletas de Cordero a la Plancha" },
    description: { en: "Tender and flavorful grilled lamb.", es: "Cordero a la plancha tierno y sabroso." },
    macros: { p: 40, c: 0, f: 25, calories: 400 },
    ingredients: {
      en: ["Lamb chops", "Rosemary", "Garlic", "Sea salt", "Black pepper"],
      es: ["Chuletas de cordero", "Romero", "Ajo", "Sal marina", "Pimienta negra"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Grill chops with aromatics until preferred doneness.",
      es: "Cocina las chuletas con aromáticos al punto deseado."
    }
  },
  {
    id: 86,
    name: { en: "Zucchini and Corn Fritters", es: "Buñuelos de Calabacín y Maíz" },
    description: { en: "Light and crispy vegetable pancakes.", es: "Tortitas de verdura ligeras y crujientes." },
    macros: { p: 10, c: 35, f: 12, calories: 280 },
    ingredients: {
      en: ["Grated zucchini", "Sweet corn", "Flour", "Egg", "Green onions"],
      es: ["Calabacín rallado", "Maíz dulce", "Harina", "Huevo", "Cebolletas"]
    },
    time: "20 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Mix ingredients into a batter. Fry small portions until golden.",
      es: "Mezcla los ingredientes en una masa. Fríe pequeñas porciones hasta dorar."
    }
  },
  {
    id: 87,
    name: { en: "Beef Stew with Potatoes", es: "Estofado de Ternera con Patatas" },
    description: { en: "Classic comfort food for cold days.", es: "Comida reconfortante clásica para días fríos." },
    macros: { p: 35, c: 45, f: 15, calories: 460 },
    ingredients: {
      en: ["Beef chunks", "Potatoes", "Carrots", "Onion", "Red wine"],
      es: ["Trozos de ternera", "Patatas", "Zanahorias", "Cebolla", "Vino tinto"]
    },
    time: "90 min",
    category: "Bulk",
    image: "https://images.unsplash.com/photo-1547592112-f32252b36e84?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Slow cook beef and veggies in wine and broth until meltingly tender.",
      es: "Cocina la ternera y verduras a fuego lento en vino y caldo."
    }
  },
  {
    id: 88,
    name: { en: "Salmon and Spinach Pasta", es: "Pasta con Salmón y Espinacas" },
    description: { en: "Creamy and elegant high-protein pasta.", es: "Pasta cremosa y elegante rica en proteínas." },
    macros: { p: 38, c: 55, f: 20, calories: 550 },
    ingredients: {
      en: ["Pasta", "Smoked salmon", "Spinach", "Cream", "Lemon zest"],
      es: ["Pasta", "Salmón ahumado", "Espinacas", "Nata", "Ralladura de limón"]
    },
    time: "20 min",
    category: "Bulk",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook pasta. Toss with cream, salmon and spinach until wilted.",
      es: "Cocina la pasta. Mezcla con nata, salmón y espinacas."
    }
  },
  {
    id: 89,
    name: { en: "Roasted Root Veggies", es: "Verduras de Raíz Asadas" },
    description: { en: "Simple and earthy vegetable mix.", es: "Mezcla de verduras sencilla y natural." },
    macros: { p: 6, c: 40, f: 10, calories: 270 },
    ingredients: {
      en: ["Carrots", "Parsnips", "Sweet potato", "Beets", "Olive oil"],
      es: ["Zanahorias", "Chirivías", "Camote", "Remolacha", "Aceite de oliva"]
    },
    time: "40 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Toss veggies in oil and salt. Roast until caramelized.",
      es: "Mezcla las verduras con aceite y sal. Asa hasta que caramelicen."
    }
  },
  {
    id: 90,
    name: { en: "Chicken Burrito Bowl", es: "Burrito Bowl de Pollo" },
    description: { en: "All the burrito flavors without the wrap.", es: "Todos los sabores del burrito sin la tortilla." },
    macros: { p: 42, c: 45, f: 18, calories: 510 },
    ingredients: {
      en: ["Grilled chicken", "Brown rice", "Black beans", "Corn", "Guacamole"],
      es: ["Pollo a la plancha", "Arroz integral", "Frijoles negros", "Maíz", "Guacamole"]
    },
    time: "20 min",
    category: "Bulk",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Assemble all ingredients in a bowl. Top with salsa.",
      es: "Monta todos los ingredientes en un bowl. Cubre con salsa."
    }
  },
  {
    id: 91,
    name: { en: "Lentil Tacos", es: "Tacos de Lentejas" },
    description: { en: "Savory plant-based taco filling.", es: "Relleno vegetal sabroso para tacos." },
    macros: { p: 18, c: 45, f: 10, calories: 340 },
    ingredients: {
      en: ["Lentils", "Taco seasoning", "Corn tortillas", "Cabbage", "Avocado"],
      es: ["Lentejas", "Sazón para tacos", "Tortillas de maíz", "Col", "Aguacate"]
    },
    time: "25 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook lentils with seasoning. Serve in tortillas with toppings.",
      es: "Cocina las lentejas con sazón. Sirve en tortillas con acompañamientos."
    }
  },
  {
    id: 92,
    name: { en: "Grilled Turkey Burgers", es: "Hamburguesas de Pavo a la Plancha" },
    description: { en: "Lean and tasty alternative to beef.", es: "Alternativa magra y sabrosa a la ternera." },
    macros: { p: 38, c: 5, f: 12, calories: 280 },
    ingredients: {
      en: ["Ground turkey", "Spinach", "Feta", "Red onion", "Lettuce wrap"],
      es: ["Pavo picado", "Espinacas", "Feta", "Cebolla roja", "Envoltorio de lechuga"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Mix turkey with spinach and feta. Grill patties. Serve in lettuce.",
      es: "Mezcla pavo con espinacas y feta. Haz hamburguesas. Sirve en lechuga."
    }
  },
  {
    id: 93,
    name: { en: "Quinoa and Black Bean Salad", es: "Ensalada de Quinoa y Frijoles Negros" },
    description: { en: "Protein-packed vegetarian side or meal.", es: "Guarnición o comida vegetariana rica en proteínas." },
    macros: { p: 15, c: 50, f: 12, calories: 370 },
    ingredients: {
      en: ["Quinoa", "Black beans", "Corn", "Lime", "Cilantro"],
      es: ["Quinoa", "Frijoles negros", "Maíz", "Lima", "Cilantro"]
    },
    time: "20 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Toss cooked quinoa with beans and corn. Dress with lime and oil.",
      es: "Mezcla la quinoa cocida con frijoles y maíz. Aliña con lima y aceite."
    }
  },
  {
    id: 94,
    name: { en: "Baked Salmon with Broccoli", es: "Salmón al Horno con Brócoli" },
    description: { en: "The classic healthy dinner.", es: "La cena saludable clásica." },
    macros: { p: 35, c: 8, f: 22, calories: 380 },
    ingredients: {
      en: ["Salmon fillet", "Broccoli florets", "Lemon", "Garlic", "Olive oil"],
      es: ["Filete de salmón", "Brócoli", "Limón", "Ajo", "Aceite de oliva"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Bake salmon and broccoli together with lemon and oil.",
      es: "Hornea el salmón y el brócoli juntos con limón y aceite."
    }
  },
  {
    id: 95,
    name: { en: "Chickpea Curry (Chana Masala)", es: "Curry de Garbanzos (Chana Masala)" },
    description: { en: "Flavorful and spicy Indian chickpea stew.", es: "Guiso de garbanzos indio sabroso y picante." },
    macros: { p: 15, c: 55, f: 12, calories: 390 },
    ingredients: {
      en: ["Chickpeas", "Tomato sauce", "Onion", "Ginger", "Garam masala"],
      es: ["Garbanzos", "Salsa de tomate", "Cebolla", "Jengibre", "Garam masala"]
    },
    time: "30 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté aromatics. Add chickpeas and tomato. Simmer with spices.",
      es: "Saltea los aromáticos. Añade garbanzos y tomate. Cocina con especias."
    }
  },
  {
    id: 96,
    name: { en: "Beef and Snap Pea Stir-Fry", es: "Salteado de Ternera y Guisantes" },
    description: { en: "Quick and crunchy high-protein stir-fry.", es: "Salteado rápido y crujiente rico en proteínas." },
    macros: { p: 38, c: 15, f: 18, calories: 380 },
    ingredients: {
      en: ["Beef strips", "Snap peas", "Soy sauce", "Ginger", "Garlic"],
      es: ["Tiras de ternera", "Guisantes", "Salsa de soja", "Jengibre", "Ajo"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Flash fry beef and peas. Season with soy, ginger and garlic.",
      es: "Saltea rápido ternera y guisantes. Sazona con soja, jengibre y ajo."
    }
  },
  {
    id: 97,
    name: { en: "Mushroom and Spinach Omelet", es: "Tortilla de Champiñones y Espinacas" },
    description: { en: "Quick and nutrient-dense egg dish.", es: "Plato de huevo rápido y rico en nutrientes." },
    macros: { p: 18, c: 6, f: 14, calories: 240 },
    ingredients: {
      en: ["Eggs", "Mushrooms", "Spinach", "Cheese", "Green onions"],
      es: ["Huevos", "Champiñones", "Espinacas", "Queso", "Cebolletas"]
    },
    time: "10 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1510627489930-0c1b0ba84658?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté mushrooms and spinach. Pour eggs over and cook until set.",
      es: "Saltea champiñones y espinacas. Vierte los huevos y cocina."
    }
  },
  {
    id: 98,
    name: { en: "Grilled Shrimp Skewers", es: "Brochetas de Gambas a la Plancha" },
    description: { en: "Light and flavorful seafood skewers.", es: "Brochetas de marisco ligeras y sabrosas." },
    macros: { p: 30, c: 5, f: 10, calories: 240 },
    ingredients: {
      en: ["Shrimp", "Lemon", "Garlic", "Parsley", "Chili flakes"],
      es: ["Gambas", "Limón", "Ajo", "Perejil", "Copos de chili"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1532634822-4047a6b29668?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Thread shrimp. Grill with lemon and garlic butter.",
      es: "Ensarta las gambas. Cocina a la plancha con mantequilla de limón y ajo."
    }
  },
  {
    id: 99,
    name: { en: "Tofu Stir-Fry with Cashews", es: "Salteado de Tofu con Anacardos" },
    description: { en: "Crunchy and savory plant-based stir-fry.", es: "Salteado vegetal crujiente y sabroso." },
    macros: { p: 22, c: 20, f: 25, calories: 390 },
    ingredients: {
      en: ["Firm tofu", "Cashews", "Bell peppers", "Soy sauce", "Sesame oil"],
      es: ["Tofu firme", "Anacardos", "Pimientos", "Salsa de soja", "Aceite de sésamo"]
    },
    time: "20 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Stir-fry tofu and peppers. Add cashews and sauce at the end.",
      es: "Saltea el tofu y los pimientos. Añade los anacardos y la salsa al final."
    }
  },
  {
    id: 100,
    name: { en: "Mediterranean Fish Bake", es: "Pescado al Horno Mediterráneo" },
    description: { en: "Flaky white fish with sun-drenched flavors.", es: "Pescado blanco con sabores del mediterráneo." },
    macros: { p: 32, c: 10, f: 12, calories: 290 },
    ingredients: {
      en: ["White fish fillets", "Cherry tomatoes", "Olives", "Garlic", "Lemon"],
      es: ["Filetes de pescado blanco", "Tomates cherry", "Aceitunas", "Ajo", "Limón"]
    },
    time: "25 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Bake fish with tomatoes and olives. Season with lemon and garlic.",
      es: "Hornea el pescado con tomates y aceitunas. Sazona con limón y ajo."
    }
  },
  {
    id: 101,
    name: { en: "Beef and Asparagus Stir-Fry", es: "Salteado de Ternera y Espárragos" },
    description: { en: "Lean and fast high-protein meal.", es: "Comida magra y rápida rica en proteínas." },
    macros: { p: 38, c: 10, f: 18, calories: 360 },
    ingredients: {
      en: ["Beef strips", "Asparagus", "Soy sauce", "Ginger", "Garlic"],
      es: ["Tiras de ternera", "Espárragos", "Salsa de soja", "Jengibre", "Ajo"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Flash fry beef and asparagus. Season with aromatics.",
      es: "Saltea rápido ternera y espárragos. Sazona con aromáticos."
    }
  },
  {
    id: 102,
    name: { en: "Vegan Chili Sin Carne", es: "Chili Sin Carne Vegano" },
    description: { en: "Hearty bean-based chili with rich flavors.", es: "Chili de alubias sustancioso con sabores intensos." },
    macros: { p: 20, c: 55, f: 10, calories: 380 },
    ingredients: {
      en: ["Mixed beans", "Tomatoes", "Corn", "Spices", "Avocado"],
      es: ["Mezcla de alubias", "Tomates", "Maíz", "Especias", "Aguacate"]
    },
    time: "40 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Simmer all ingredients until thick. Top with fresh avocado.",
      es: "Cocina todos los ingredientes hasta que espese. Cubre con aguacate."
    }
  },
  {
    id: 103,
    name: { en: "Chicken Thighs with Thyme", es: "Contramuslos de Pollo con Tomillo" },
    description: { en: "Juicy and aromatic pan-seared chicken.", es: "Pollo a la sartén jugoso y aromático." },
    macros: { p: 35, c: 0, f: 22, calories: 340 },
    ingredients: {
      en: ["Chicken thighs", "Thyme", "Garlic", "Lemon", "Olive oil"],
      es: ["Contramuslos de pollo", "Tomillo", "Ajo", "Limón", "Aceite de oliva"]
    },
    time: "25 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sear chicken thighs skin-side down. Roast with aromatics.",
      es: "Sella los contramuslos por la piel. Hornea con aromáticos."
    }
  },
  {
    id: 104,
    name: { en: "Sweet Potato and Quinoa Bowl", es: "Bowl de Camote y Quinoa" },
    description: { en: "Energy-boosting complex carb bowl.", es: "Bowl de carbohidratos complejos para energía." },
    macros: { p: 12, c: 60, f: 15, calories: 420 },
    ingredients: {
      en: ["Sweet potato", "Quinoa", "Spinach", "Pomegranate", "Lemon dressing"],
      es: ["Camote", "Quinoa", "Espinacas", "Granada", "Aliño de limón"]
    },
    time: "35 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Assemble roasted camote with quinoa and fresh greens.",
      es: "Monta el camote asado con quinoa y verdes frescos."
    }
  },
  {
    id: 105,
    name: { en: "Seafood Risotto", es: "Risotto de Marisco" },
    description: { en: "Luxurious Italian rice with mixed seafood.", es: "Arroz italiano de lujo con mezcla de marisco." },
    macros: { p: 30, c: 65, f: 18, calories: 540 },
    ingredients: {
      en: ["Arborio rice", "Shrimp", "Mussels", "Clams", "White wine", "Saffron"],
      es: ["Arroz arborio", "Gambas", "Mejillones", "Almejas", "Vino blanco", "Azafrán"]
    },
    time: "45 min",
    category: "Bulk",
    image: "https://images.unsplash.com/photo-1534080564607-317f549ca4a3?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook rice with wine and saffron broth. Stir in seafood at the end.",
      es: "Cocina el arroz con vino y caldo con azafrán. Añade el marisco al final."
    }
  },
  {
    id: 106,
    name: { en: "Turkey Sausage and Peppers", es: "Salchichas de Pavo con Pimientos" },
    description: { en: "Quick and savory one-pan meal.", es: "Comida sabrosa en una sola sartén rápida." },
    macros: { p: 32, c: 12, f: 15, calories: 310 },
    ingredients: {
      en: ["Turkey sausages", "Bell peppers", "Onion", "Oregano", "Garlic"],
      es: ["Salchichas de pavo", "Pimientos", "Cebolla", "Orégano", "Ajo"]
    },
    time: "20 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté sausages and veggies together until browned.",
      es: "Saltea las salchichas y verduras juntas hasta que doren."
    }
  },
  {
    id: 107,
    name: { en: "Lentil Soup with Spinach", es: "Sopa de Lentejas con Espinacas" },
    description: { en: "Warm and iron-rich vegetarian soup.", es: "Sopa vegetariana templada y rica en hierro." },
    macros: { p: 18, c: 45, f: 6, calories: 310 },
    ingredients: {
      en: ["Lentils", "Spinach", "Carrots", "Turmeric", "Vegetable broth"],
      es: ["Lentejas", "Espinacas", "Zanahorias", "Cúrcuma", "Caldo de verduras"]
    },
    time: "40 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1547592112-f32252b36e84?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Simmer lentils with carrots. Stir in spinach at the end.",
      es: "Cocina las lentejas con zanahorias. Añade las espinacas al final."
    }
  },
  {
    id: 108,
    name: { en: "Greek Salad with Chickpeas", es: "Ensalada Griega con Garbanzos" },
    description: { en: "The classic salad made into a full meal.", es: "La ensalada clásica convertida en comida completa." },
    macros: { p: 15, c: 40, f: 20, calories: 380 },
    ingredients: {
      en: ["Chickpeas", "Tomato", "Cucumber", "Feta", "Olives", "Red onion"],
      es: ["Garbanzos", "Tomate", "Pepino", "Feta", "Aceitunas", "Cebolla roja"]
    },
    time: "10 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Toss all ingredients together. Season with lemon and oregano.",
      es: "Mezcla todos los ingredientes. Sazona con limón y Orégano."
    }
  },
  {
    id: 109,
    name: { en: "Beef and Green Bean Stir-Fry", es: "Salteado de Ternera y Judías Verdes" },
    description: { en: "Simple and crunchy high-protein stir-fry.", es: "Salteado rico en proteínas sencillo y crujiente." },
    macros: { p: 38, c: 12, f: 18, calories: 370 },
    ingredients: {
      en: ["Beef strips", "Green beans", "Garlic", "Soy sauce", "Ginger"],
      es: ["Tiras de ternera", "Judías verdes", "Ajo", "Salsa de soja", "Jengibre"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté beef and beans at high heat. Season with aromatics.",
      es: "Saltea ternera y judías a fuego fuerte. Sazona con aromáticos."
    }
  },
  {
    id: 110,
    name: { en: "Hummus and Falafel Bowl", es: "Bowl de Hummus y Falafel" },
    description: { en: "Traditional Middle Eastern flavors in a bowl.", es: "Sabores tradicionales de oriente medio en un bowl." },
    macros: { p: 18, c: 55, f: 22, calories: 490 },
    ingredients: {
      en: ["Falafel balls", "Hummus", "Tabbouleh", "Pickled turnip", "Tahini"],
      es: ["Falafels", "Hummus", "Tabulé", "Nabo encurtido", "Tahini"]
    },
    time: "20 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Assemble falafel with hummus and fresh salad components.",
      es: "Monta los falafels con hummus y ensalada fresca."
    }
  },
  {
    id: 111,
    name: { en: "Pan-Seared Salmon with Asparagus", es: "Salmón a la Plancha con Espárragos" },
    description: { en: "Quick and healthy high-protein dinner.", es: "Cena saludable y rápida rica en proteínas." },
    macros: { p: 34, c: 5, f: 18, calories: 320 },
    ingredients: {
      en: ["Salmon fillet", "Asparagus", "Lemon", "Butter", "Garlic"],
      es: ["Filete de salmón", "Espárragos", "Limón", "Mantequilla", "Ajo"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sear salmon and asparagus with lemon butter.",
      es: "Cocina el salmón y los espárragos con mantequilla de limón."
    }
  },
  {
    id: 112,
    name: { en: "Vegetarian Tacos with Black Beans", es: "Tacos Vegetarianos con Frijoles Negros" },
    description: { en: "Protein-packed plant-based tacos.", es: "Tacos vegetales ricos en proteínas." },
    macros: { p: 15, c: 45, f: 12, calories: 340 },
    ingredients: {
      en: ["Black beans", "Corn tortillas", "Avocado", "Feta", "Cilantro"],
      es: ["Frijoles negros", "Tortillas de maíz", "Aguacate", "Feta", "Cilantro"]
    },
    time: "15 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Assemble tacos with seasoned beans and fresh toppings.",
      es: "Monta los tacos con frijoles sazonados e ingredientes frescos."
    }
  },
  {
    id: 113,
    name: { en: "Beef and Snap Pea Stir-Fry", es: "Salteado de Ternera y Guisantes" },
    description: { en: "Quick and crunchy high-protein meal.", es: "Comida rica en proteínas rápida y crujiente." },
    macros: { p: 38, c: 15, f: 18, calories: 380 },
    ingredients: {
      en: ["Beef strips", "Snap peas", "Soy sauce", "Ginger", "Garlic"],
      es: ["Tiras de ternera", "Guisantes", "Salsa de soja", "Jengibre", "Ajo"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Flash fry beef and peas. Season with soy, ginger and garlic.",
      es: "Saltea rápido ternera y guisantes. Sazona con soja, jengibre y ajo."
    }
  },
  {
    id: 114,
    name: { en: "Quinoa and Sweet Potato Salad", es: "Ensalada de Quinoa y Camote" },
    description: { en: "Nutrient-dense and filling vegetarian salad.", es: "Ensalada vegetariana rica en nutrientes y saciante." },
    macros: { p: 12, c: 55, f: 12, calories: 380 },
    ingredients: {
      en: ["Quinoa", "Roasted sweet potato", "Spinach", "Walnuts", "Lemon"],
      es: ["Quinoa", "Camote asado", "Espinacas", "Nueces", "Limón"]
    },
    time: "30 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Toss all ingredients together. Dress with lemon and olive oil.",
      es: "Mezcla todos los ingredientes. Aliña con limón y aceite de oliva."
    }
  },
  {
    id: 115,
    name: { en: "Cod with Tomato and Olive Tapenade", es: "Bacalao con Tapenade de Tomate y Aceitunas" },
    description: { en: "Mediterranean flavors in a light fish dish.", es: "Sabores mediterráneos en un plato de pescado ligero." },
    macros: { p: 30, c: 8, f: 10, calories: 240 },
    ingredients: {
      en: ["Cod fillets", "Cherry tomatoes", "Black olives", "Capers", "Basil"],
      es: ["Filetes de bacalao", "Tomates cherry", "Aceitunas negras", "Alcaparras", "Albahaca"]
    },
    time: "25 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Bake cod with tomatoes and olives. Season with herbs.",
      es: "Hornea el bacalao con tomates y aceitunas. Sazona con hierbas."
    }
  },
  {
    id: 116,
    name: { en: "Chicken Stir-Fry with Broccoli", es: "Salteado de Pollo con Brócoli" },
    description: { en: "Classic healthy high-protein stir-fry.", es: "Salteado rico en proteínas saludable clásico." },
    macros: { p: 40, c: 15, f: 8, calories: 300 },
    ingredients: {
      en: ["Chicken breast", "Broccoli", "Soy sauce", "Garlic", "Ginger"],
      es: ["Pechuga de pollo", "Brócoli", "Salsa de soja", "Ajo", "Jengibre"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté chicken and broccoli. Season with soy and aromatics.",
      es: "Saltea el pollo y el brócoli. Sazona con soja y aromáticos."
    }
  },
  {
    id: 117,
    name: { en: "Lentil Soup with Spinach", es: "Sopa de Lentejas con Espinacas" },
    description: { en: "Warm and iron-rich vegetarian soup.", es: "Sopa vegetariana templada y rica en hierro." },
    macros: { p: 18, c: 45, f: 6, calories: 310 },
    ingredients: {
      en: ["Lentils", "Spinach", "Carrots", "Onion", "Turmeric"],
      es: ["Lentejas", "Espinacas", "Zanahorias", "Cebolla", "Cúrcuma"]
    },
    time: "40 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1547592112-f32252b36e84?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Simmer lentils with carrots. Stir in spinach at the end.",
      es: "Cocina las lentejas con zanahorias. Añade las espinacas al final."
    }
  },
  {
    id: 118,
    name: { en: "Beef and Broccoli Ramen", es: "Ramen de Ternera y Brócoli" },
    description: { en: "Quick and savory noodle bowl.", es: "Bowl de fideos rápido y sabroso." },
    macros: { p: 35, c: 45, f: 15, calories: 450 },
    ingredients: {
      en: ["Ramen noodles", "Beef strips", "Broccoli", "Egg", "Soy broth"],
      es: ["Fideos ramen", "Tiras de ternera", "Brócoli", "Huevo", "Caldo de soja"]
    },
    time: "20 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook noodles. Sauté beef and broccoli. Serve in broth with an egg.",
      es: "Cocina los fideos. Saltea ternera y brócoli. Sirve en caldo con un huevo."
    }
  },
  {
    id: 119,
    name: { en: "Grilled Turkey Burgers", es: "Hamburguesas de Pavo a la Plancha" },
    description: { en: "Lean and tasty alternative to beef.", es: "Alternativa magra y sabrosa a la ternera." },
    macros: { p: 38, c: 5, f: 12, calories: 280 },
    ingredients: {
      en: ["Ground turkey", "Spinach", "Feta", "Red onion", "Lettuce wrap"],
      es: ["Pavo picado", "Espinacas", "Feta", "Cebolla roja", "Envoltorio de lechuga"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Mix turkey with spinach and feta. Grill patties. Serve in lettuce.",
      es: "Mezcla pavo con espinacas y feta. Haz hamburguesas. Sirve en lechuga."
    }
  },
  {
    id: 120,
    name: { en: "Mushroom and Spinach Omelet", es: "Tortilla de Champiñones y Espinacas" },
    description: { en: "Quick and nutrient-dense egg dish.", es: "Plato de huevo rápido y rico en nutrientes." },
    macros: { p: 18, c: 6, f: 14, calories: 240 },
    ingredients: {
      en: ["Eggs", "Mushrooms", "Spinach", "Cheese", "Green onions"],
      es: ["Huevos", "Champiñones", "Espinacas", "Queso", "Cebolletas"]
    },
    time: "10 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1510627489930-0c1b0ba84658?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté mushrooms and spinach. Pour eggs over and cook until set.",
      es: "Saltea champiñones y espinacas. Vierte los huevos y cocina."
    }
  },
  {
    id: 121,
    name: { en: "Chickpea and Spinach Curry", es: "Curry de Garbanzos y Espinacas" },
    description: { en: "Flavorful and healthy plant-based curry.", es: "Curry vegetal saludable y sabroso." },
    macros: { p: 15, c: 50, f: 12, calories: 370 },
    ingredients: {
      en: ["Chickpeas", "Spinach", "Coconut milk", "Curry spices", "Onion"],
      es: ["Garbanzos", "Espinacas", "Leche de coco", "Especias de curry", "Cebolla"]
    },
    time: "30 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté aromatics. Add chickpeas and coconut milk. Simmer with spices.",
      es: "Saltea los aromáticos. Añade garbanzos y leche de coco. Cocina con especias."
    }
  },
  {
    id: 122,
    name: { en: "Beef and Peppers Stir-Fry", es: "Salteado de Ternera y Pimientos" },
    description: { en: "Colorful and fast high-protein meal.", es: "Comida colorida y rápida rica en proteínas." },
    macros: { p: 38, c: 12, f: 18, calories: 370 },
    ingredients: {
      en: ["Beef strips", "Bell peppers", "Onion", "Soy sauce", "Ginger"],
      es: ["Tiras de ternera", "Pimientos", "Cebolla", "Salsa de soja", "Jengibre"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Sauté all ingredients at high heat. Season with ginger and soy.",
      es: "Saltea todos los ingredientes a fuego fuerte. Sazona con jengibre y soja."
    }
  },
  {
    id: 123,
    name: { en: "Grilled Shrimp and Veggie Skewers", es: "Brochetas de Gambas y Verduras" },
    description: { en: "Light and flavorful seafood skewers.", es: "Brochetas de marisco ligeras y sabrosas." },
    macros: { p: 30, c: 10, f: 12, calories: 280 },
    ingredients: {
      en: ["Shrimp", "Bell peppers", "Zucchini", "Lemon", "Garlic"],
      es: ["Gambas", "Pimientos", "Calabacín", "Limón", "Ajo"]
    },
    time: "20 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1532634822-4047a6b29668?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Thread shrimp and veggies onto skewers. Grill until cooked through.",
      es: "Ensarta las gambas y verduras en brochetas. Cocina a la plancha."
    }
  },
  {
    id: 124,
    name: { en: "Tofu and Edamame Poké Bowl", es: "Poké Bowl de Tofu y Edamame" },
    description: { en: "Plant-based version of the Hawaiian favorite.", es: "Versión vegetal del favorito hawaiano." },
    macros: { p: 20, c: 55, f: 12, calories: 410 },
    ingredients: {
      en: ["Sushi rice", "Edamame", "Tofu cubes", "Seaweed salad", "Pickled ginger"],
      es: ["Arroz de sushi", "Edamame", "Dados de tofu", "Ensalada de algas", "Jengibre encurtido"]
    },
    time: "20 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Assemble all components in a bowl. Drizzle with soy and sesame.",
      es: "Monta todos los componentes en un bowl. Rocía con soja y sésamo."
    }
  },
  {
    id: 125,
    name: { en: "Turkey Chili with Black Beans", es: "Chili de Pavo con Frijoles Negros" },
    description: { en: "Lean and hearty high-protein stew.", es: "Guiso rico en proteínas magro y sustancioso." },
    macros: { p: 35, c: 30, f: 8, calories: 330 },
    ingredients: {
      en: ["Ground turkey", "Black beans", "Tomato sauce", "Corn", "Spices"],
      es: ["Pavo picado", "Frijoles negros", "Salsa de tomate", "Maíz", "Especias"]
    },
    time: "40 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Simmer all ingredients until flavors meld and thickened.",
      es: "Cocina todos los ingredientes hasta que los sabores se mezclen y espese."
    }
  },
  {
    id: 126,
    name: { en: "Roasted Root Vegetables with Tahini", es: "Verduras de Raíz con Tahini" },
    description: { en: "Nutrient-dense and earthy vegetable dish.", es: "Plato de verduras natural y rico en nutrientes." },
    macros: { p: 8, c: 45, f: 15, calories: 340 },
    ingredients: {
      en: ["Carrots", "Beets", "Parsnips", "Tahini", "Lemon"],
      es: ["Zanahorias", "Remolacha", "Chirivías", "Tahini", "Limón"]
    },
    time: "40 min",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Roast root veggies until tender. Drizzle with creamy tahini.",
      es: "Asa las verduras de raíz. Rocía con tahini cremoso."
    }
  },
  {
    id: 127,
    name: { en: "Greek Salad with Grilled Chicken", es: "Ensalada Griega con Pollo a la Plancha" },
    description: { en: "The classic salad with extra protein.", es: "La ensalada clásica con extra de proteína." },
    macros: { p: 42, c: 10, f: 15, calories: 340 },
    ingredients: {
      en: ["Chicken breast", "Tomato", "Cucumber", "Feta", "Olives", "Red onion"],
      es: ["Pechuga de pollo", "Tomate", "Pepino", "Feta", "Aceitunas", "Cebolla roja"]
    },
    time: "20 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Grill chicken and slice. Toss with fresh veggies and cheese.",
      es: "Cocina el pollo y córtalo. Mezcla con verduras frescas y queso."
    }
  },
  {
    id: 128,
    name: { en: "Beef Stew with Barley", es: "Estofado de Ternera con Cebada" },
    description: { en: "Hearty and warming nutrient-dense soup.", es: "Sopa sustanciosa y reconfortante rica en nutrientes." },
    macros: { p: 30, c: 40, f: 12, calories: 380 },
    ingredients: {
      en: ["Beef chunks", "Barley", "Carrots", "Celery", "Beef broth"],
      es: ["Trozos de ternera", "Cebada", "Zanahorias", "Apio", "Caldo de ternera"]
    },
    time: "60 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1547592112-f32252b36e84?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Simmer beef and barley with veggies until tender.",
      es: "Cocina la ternera y la cebada con verduras hasta que estén tiernas."
    }
  },
  {
    id: 129,
    name: { en: "Vegetable Minestrone with Beans", es: "Minestrone de Verduras con Alubias" },
    description: { en: "Classic Italian soup packed with nutrients.", es: "Sopa italiana clásica llena de nutrientes." },
    macros: { p: 15, c: 50, f: 8, calories: 330 },
    ingredients: {
      en: ["Mixed veggies", "White beans", "Tomato broth", "Pasta", "Parmesan"],
      es: ["Verduras mixtas", "Alubias blancas", "Caldo de tomate", "Pasta", "Parmesano"]
    },
    time: "40 min",
    category: "Balanced",
    image: "https://images.unsplash.com/photo-1547592112-f32252b36e84?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Cook veggies and beans in broth. Stir in pasta until tender.",
      es: "Cocina verduras y alubias en caldo. Añade la pasta hasta que esté tierna."
    }
  },
  {
    id: 130,
    name: { en: "Grilled Salmon with Lemon and Dill", es: "Salmón a la Plancha con Limón y Eneldo" },
    description: { en: "Simple and clean high-protein fish dish.", es: "Plato de pescado rico en proteínas sencillo y limpio." },
    macros: { p: 34, c: 0, f: 18, calories: 300 },
    ingredients: {
      en: ["Salmon fillet", "Lemon slices", "Fresh dill", "Olive oil", "Sea salt"],
      es: ["Filete de salmón", "Rodajas de limón", "Eneldo fresco", "Aceite de oliva", "Sal marina"]
    },
    time: "15 min",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    instructions: {
      en: "Grill salmon. Season with lemon, dill and sea salt.",
      es: "Cocina el salmón a la plancha. Sazona con limón, eneldo y sal marina."
    }
  }
];
