import { describe, it, expect } from 'vitest';
import { calculateRemainingMacros } from '../utils/nutrition';

describe('calculateRemainingMacros', () => {
  it('should return a success message if all targets are met', () => {
    const targets = { targetProtein: 150, targetCarbs: 200, targetFats: 70 };
    const consumedMacros = { protein: 150, carbs: 200, fat: 70 };
    
    const result = calculateRemainingMacros(targets, consumedMacros);
    expect(result).toBe("You've already hit your targets!");
  });

  it('should calculate the correct amount of food to reach targets', () => {
    const targets = { targetProtein: 150, targetCarbs: 200, targetFats: 70 };
    const consumedMacros = { protein: 100, carbs: 100, fat: 50 };
    
    const result = calculateRemainingMacros(targets, consumedMacros);
    
    // Remaining: 50g Protein, 100g Carbs
    // Chicken Breast (mainP) has 31g Protein per 100g
    // 50 / 31 * 100 = 161.29 -> 161g
    // White Rice (mainC) has 28g Carbs per 100g
    // 100 / 28 * 100 = 357.14 -> 357g
    
    expect(result).toEqual([
      { name: 'Chicken Breast', amount: 161, unit: 'g' },
      { name: 'White Rice (cooked)', amount: 357, unit: 'g' }
    ]);
  });

  it('should handle zero consumed macros', () => {
    const targets = { targetProtein: 150, targetCarbs: 200, targetFats: 70 };
    const consumedMacros = { protein: 0, carbs: 0, fat: 0 };
    
    const result = calculateRemainingMacros(targets, consumedMacros);
    
    expect(result).toEqual([
      { name: 'Chicken Breast', amount: 484, unit: 'g' }, // 150/31 * 100
      { name: 'White Rice (cooked)', amount: 714, unit: 'g' } // 200/28 * 100
    ]);
  });
});
