import { db } from './firebase';
import { collection, getDocs, addDoc, query, limit } from 'firebase/firestore';
import { RECIPES_DB } from '../data/recipes';

export const getRecipes = async () => {
  try {
    const recipesRef = collection(db, 'recipes');
    const snapshot = await getDocs(recipesRef);
    
    if (snapshot.empty) {
      // If DB is empty, we might want to seed it or return the local ones
      console.log('No recipes found in Firestore');
      return [];
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const seedRecipes = async () => {
  try {
    const recipesRef = collection(db, 'recipes');
    const existingSnapshot = await getDocs(recipesRef);
    const existingNames = new Set(existingSnapshot.docs.map(doc => doc.data().name.en));

    console.log('Syncing recipes to Firestore...');
    let addedCount = 0;
    
    for (const recipe of RECIPES_DB) {
      if (!existingNames.has(recipe.name.en)) {
        const { id, ...recipeData } = recipe;
        await addDoc(recipesRef, recipeData);
        addedCount++;
      }
    }
    
    if (addedCount > 0) {
      console.log(`Added ${addedCount} new recipes!`);
    } else {
      console.log('Database is already up to date.');
    }
  } catch (error) {
    console.error('Error seeding recipes:', error);
  }
};
