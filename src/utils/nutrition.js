export const FOOD_DB = [
  { name: 'Chicken Breast', p: 31, c: 0, f: 3.6, cat: 'Protein' },
  { name: 'Salmon', p: 20, c: 0, f: 13, cat: 'Protein/Fat' },
  { name: 'Eggs (2 units)', p: 13, c: 1, f: 11, cat: 'Protein/Fat' },
  { name: 'Greek Yogurt', p: 10, c: 4, f: 0, cat: 'Protein' },
  { name: 'White Rice (cooked)', p: 2.7, c: 28, f: 0.3, cat: 'Carbs' },
  { name: 'Potato (boiled)', p: 2, c: 17, f: 0.1, cat: 'Carbs' },
  { name: 'Oats', p: 13, c: 66, f: 7, cat: 'Carbs' },
  { name: 'Avocado', p: 2, c: 9, f: 15, cat: 'Fat/Carbs' },
  { name: 'Olive Oil (1 tbsp)', p: 0, c: 0, f: 14, cat: 'Fat' },
  { name: 'Broccoli', p: 2.8, c: 7, f: 0.4, cat: 'Veggie' },
  { name: 'Walnuts', p: 15, c: 14, f: 65, cat: 'Fat' }
];

export const calculateRemainingMacros = (targets, consumedMacros) => {
  const remP = Math.max(0, targets.targetProtein - consumedMacros.protein);
  const remC = Math.max(0, targets.targetCarbs - consumedMacros.carbs);
  const remF = Math.max(0, targets.targetFats - consumedMacros.fat);

  if (remP < 5 && remC < 5 && remF < 5) return "You've already hit your targets!";

  const mainP = FOOD_DB.find(f => f.cat === 'Protein' || f.cat === 'Protein/Fat');
  const mainC = FOOD_DB.find(f => f.cat === 'Carbs');

  const gramsP = Math.round((remP / mainP.p) * 100);
  const gramsC = Math.round((remC / mainC.c) * 100);

  return [
    { name: mainP.name, amount: gramsP, unit: 'g' },
    { name: mainC.name, amount: gramsC, unit: 'g' }
  ];
};
