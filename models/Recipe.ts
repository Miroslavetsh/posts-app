export default interface IRecipe {
  uri: string
  label: string
  image: string
  images: string
  source: string
  url: string
  shareAs: string
  calories: number
  totalWeight: number
  cuisineType: Array<string>
  mealType: Array<string>
  dishType: Array<string>
}
