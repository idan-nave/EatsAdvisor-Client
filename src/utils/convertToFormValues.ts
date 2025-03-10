import { UserPreferencesServer } from "@api"; // or wherever it's defined

// Your form interfaces
interface Allergy {
  allergy: string;
}

interface FlavorRating {
  flavor: string;
  rating: number;
}

export interface FormValues {
  allergies: Allergy[];
  restrictions: string[];   // e.g., combine dietaryConstraints + specialPreferences
  flavorRatings: FlavorRating[];
  dishes: { name: string }[];
  personalPreference: string; // e.g., join specialPreferences or use your own logic
}

/**
 * Converts a UserPreferencesServer response to FormValues
 */
export default function convertToFormValues(
  serverData: UserPreferencesServer 
): FormValues {
  return {

    
    // Convert string[] to an array of { allergy: string }
    allergies: serverData.allergies.map((allergy: any) => ({ allergy })),

    // Decide how to handle restrictions. 
    // Here we combine dietaryConstraints and specialPreferences into one array
    restrictions: [
      ...serverData.dietaryConstraints,
      ...serverData.specialPreferences,
    ],

    // Convert flavorPreferences { [key: string]: number } to an array of { flavor, rating }
    flavorRatings: Object.entries(serverData.flavorPreferences).map(
      ([flavor, rating]) => ({
        flavor,
        rating,
      })
    ),

    // Convert specificDishes: string[] to dishes: { name: string }[]
    dishes: serverData.specificDishes.map((dish) => ({ name: dish })),

    // personalPreference can be derived from specialPreferences or set to an empty string
    personalPreference: serverData.specialPreferences.join(", "),
  };
}
