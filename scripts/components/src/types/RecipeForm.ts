import { Ingredient } from "./Ingredient";
import { Step } from "./Step";
import { CuisineEnum } from "./CuisineEnum";
import { CategoryEnum } from "./CategoryEnum";
import { DietEnum } from "./DietEnum";

export interface RecipeForm {
  overview: {
    name: string;
    summary: string;
    prepTime: number | ""; // in minutes
    cookTime: number | ""; // in minutes
    difficulty: [boolean, boolean, boolean, boolean, boolean];
    cuisine: CuisineEnum | "";
    categories: CategoryEnum[];
    diet: DietEnum[];
  };
  ingredients: Ingredient[];
  steps: Step[];
}
