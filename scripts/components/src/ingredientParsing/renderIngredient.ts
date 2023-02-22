import { JSXElement } from "solid-js";
import { Ingredient } from "../types";

export const renderIngredient = (ingredient: Ingredient): JSXElement => {
  const result = ingredient.amount ? [ingredient.amount] : [];
  if (ingredient.unit) {
    result.push(ingredient.unit);
  }
  result.push(ingredient.ingredient + (ingredient.modifier ? "," : ""));
  if (ingredient.modifier) {
    result.push(ingredient.modifier.replace(",", ""));
  }
  return result.join(" ");
};
