export const FOOD_DB = [
  { name: 'Chicken Breast', p: 31, c: 0, f: 3.6, cat: 'Protein' },
  { name: 'Salmon', p: 20, c: 0, f: 13, cat: 'Protein/Fat' },
  { name: 'Eggs (unit)', p: 6.5, c: 0.5, f: 5.5, cat: 'Protein/Fat', unit: 'unit' },
  { name: 'Greek Yogurt', p: 10, c: 4, f: 0, cat: 'Protein' },
  { name: 'Tofu (firm)', p: 15, c: 2, f: 8, cat: 'Protein/Vegan' },
  { name: 'Lean Beef', p: 26, c: 0, f: 15, cat: 'Protein/Fat' },
  { name: 'Turkey Breast', p: 29, c: 0, f: 1, cat: 'Protein' },
  { name: 'White Rice (cooked)', p: 2.7, c: 28, f: 0.3, cat: 'Carbs' },
  { name: 'Potato (boiled)', p: 2, c: 17, f: 0.1, cat: 'Carbs' },
  { name: 'Oats', p: 13, c: 66, f: 7, cat: 'Carbs' },
  { name: 'Quinoa (cooked)', p: 4.4, c: 21, f: 1.9, cat: 'Carbs/Protein' },
  { name: 'Sweet Potato', p: 1.6, c: 20, f: 0.1, cat: 'Carbs' },
  { name: 'Pasta (cooked)', p: 5, c: 25, f: 1, cat: 'Carbs' },
  { name: 'Avocado', p: 2, c: 9, f: 15, cat: 'Fat/Carbs' },
  { name: 'Olive Oil (tbsp)', p: 0, c: 0, f: 14, cat: 'Fat', unit: 'tbsp' },
  { name: 'Peanut Butter', p: 25, c: 20, f: 50, cat: 'Fat/Protein' },
  { name: 'Walnuts', p: 15, c: 14, f: 65, cat: 'Fat' },
  { name: 'Almonds', p: 21, c: 22, f: 50, cat: 'Fat/Protein' },
  { name: 'Broccoli', p: 2.8, c: 7, f: 0.4, cat: 'Veggie' },
  { name: 'Spinach', p: 2.9, c: 3.6, f: 0.4, cat: 'Veggie' }
];

export const calculateRemainingMacros = (targets, consumedMacros, recipes = []) => {
  const remP = Math.max(0, targets.targetProtein - consumedMacros.protein);
  const remC = Math.max(0, targets.targetCarbs - consumedMacros.carbs);
  const remF = Math.max(0, targets.targetFats - consumedMacros.fat);

  if (remP < 10 && remC < 10 && remF < 5) return null;

  // Try to find a recipe that fits into remaining macros
  const fittingRecipes = recipes.filter(r => 
    r.macros.p <= remP + 15 && 
    r.macros.c <= remC + 20 && 
    r.macros.f <= remF + 10
  );

  if (fittingRecipes.length > 0) {
    const randomRecipe = fittingRecipes[Math.floor(Math.random() * fittingRecipes.length)];
    return {
      type: 'recipe',
      data: randomRecipe
    };
  }

  // Fallback to ingredient combo if no recipe fits well
  const proteins = FOOD_DB.filter(f => f.cat.includes('Protein'));
  const carbs = FOOD_DB.filter(f => f.cat.includes('Carbs'));
  
  const p = proteins[Math.floor(Math.random() * proteins.length)];
  const c = carbs[Math.floor(Math.random() * carbs.length)];

  return {
    type: 'ingredients',
    data: [
      { name: p.name, amount: Math.round((remP / p.p) * 100), unit: p.unit || 'g' },
      { name: c.name, amount: Math.round((remC / c.c) * 100), unit: c.unit || 'g' }
    ]
  };
};
