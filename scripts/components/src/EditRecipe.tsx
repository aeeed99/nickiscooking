import { type Component } from "solid-js";
import { createStore } from "solid-js/store";
import { IngredientSection } from "./form/ingredientSection";
import { StepsSection } from "./form/stepsSection/stepsSection";
import { RecipeForm } from "./types";
import { OverviewSection } from "./form/overviewSection/overviewSection";

export const NewRecipe: Component<{}> = () => {
  const [recipe, setRecipe] = createStore<RecipeForm>({
    overview: {
      name: "",
      summary: "",
      prepTime: "",
      cookTime: "",
      difficulty: [false, false, false, false, false],
      cuisine: "",
      categories: [],
      diet: [],
    },
    ingredients: [],
    steps: [],
  });

  const processRecipe = () => {
    console.log({recipe: JSON.stringify(recipe)});
  }

  return (
    <div class="f5">
      <OverviewSection recipe={recipe} setRecipe={setRecipe}></OverviewSection>
      <IngredientSection recipe={recipe} setRecipe={setRecipe} />
      <StepsSection recipe={recipe} setRecipe={setRecipe} />
      <div 
        class="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue fg-white near-white sans-serif pointer"
        onClick={processRecipe}
      >Review</div>
    </div>
  );
};

window._componentEditRecipe = NewRecipe;
export default NewRecipe;
