export interface UserPreferences {
  allergies?: string[]
  dietaryConstraints?: string[]
  flavorPreferences?: Record<string, number>
  specificDishes?: string[]
  specialPreferences?: string[]
}
