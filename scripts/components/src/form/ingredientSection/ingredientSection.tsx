import { type Component } from "solid-js";
import { For } from "solid-js";
import { IngredientInput } from "./ingredientInput";
import { renderIngredient } from "../../ingredientParsing";
import { Ingredient, RecipeForm } from "../../types";
import { parseIngredient } from "../common/parseIngredient";

export const IngredientSection: Component<{
  recipe: RecipeForm;
  setRecipe: CallableFunction;
}> = ({ recipe, setRecipe }) => {
  let ingredientId = 0;

  const createIngredient = (ingredient: Partial<Ingredient>) => {
    if (!ingredient.ingredient) {
      return false;
    }
    console.log({ ingredient });
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ingredient]
    });
    return true;
  }

  const removeIngredient = (id: number) => {
    const updatedIngredientList = recipe.ingredients.filter(
      (ing) => ing.id !== id
    );
  };

  return (
    <div class="pa4 mt6 sans-serif black-80 w-100">
      <h2>Ingredients</h2>
      <div class="pa3">
        <For each={recipe.ingredients}>
          {(ingredient) => (
            <div>
              {renderIngredient(ingredient)} &nbsp;
              <span
                style="cursor: pointer;"
                onClick={() => {
                  removeIngredient(ingredient.id);
                }}
              >
                <i class="fa-regular fa-trash fa-xs"></i>
              </span>
            </div>
          )}
        </For>
      </div>
      <div>
          {" "}
          <IngredientInput onDone={createIngredient} />
        </div>
    </div>
  );
};

window._componentEditRecipe = IngredientSection;
export default IngredientSection;
