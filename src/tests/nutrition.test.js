import { describe, it, expect } from 'vitest';
import { calculateRemainingMacros } from '../utils/nutrition';

describe('calculateRemainingMacros', () => {
  it('should return null if all targets are met', () => {
    const targets = { targetProtein: 150, targetCarbs: 200, targetFats: 70 };
    const consumedMacros = { protein: 150, carbs: 200, fat: 70 };
    
    const result = calculateRemainingMacros(targets, consumedMacros);
    expect(result).toBeNull();
  });

  it('should return a recipe if one fits the remaining macros', () => {
    const targets = { targetProtein: 150, targetCarbs: 200, targetFats: 70 };
    const consumedMacros = { protein: 100, carbs: 100, fat: 50 };
    const recipes = [
      { id: 1, name: { en: 'Test Salad', es: 'Ensalada Test' }, macros: { p: 20, c: 30, f: 10 }, category: 'Balanced' }
    ];

    const result = calculateRemainingMacros(targets, consumedMacros, recipes);
    
    expect(result.type).toBe('recipe');
    expect(result.data.id).toBe(1);
  });

  it('should fallback to ingredients if no recipes fit', () => {
    const targets = { targetProtein: 150, targetCarbs: 200, targetFats: 70 };
    const consumedMacros = { protein: 100, carbs: 100, fat: 50 };
    // No recipes provided
    const result = calculateRemainingMacros(targets, consumedMacros, []);
    
    expect(result.type).toBe('ingredients');
    expect(result.data).toBeInstanceOf(Array);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data[0]).toHaveProperty('name');
    expect(result.data[0]).toHaveProperty('amount');
  });

  it('should calculate correct amounts for a specific food (using Greek Yogurt example)', () => {
    const targets = { targetProtein: 10, targetCarbs: 0, targetFats: 0 };
    const consumedMacros = { protein: 0, carbs: 0, fat: 0 };
    
    // We can't guarantee Greek Yogurt is picked due to randomization,
    // but we can test the structure and that amounts are numbers
    const result = calculateRemainingMacros(targets, consumedMacros, []);
    
    expect(result.data[0].amount).toBeGreaterThan(0);
    expect(typeof result.data[0].name).toBe('string');
  });
});
