import { Ingredient } from "../../types";
import { FRACTIONS, NUMBERS } from "../../constants";

const fracRegexp = new RegExp(`[${FRACTIONS}]`, "g");

const isAmount = (line: string) => {
  const nums = line.replace(fracRegexp, "");
  return nums === "" || !Number.isNaN(Number(nums));
};

const endswithModifier = (line: string) => line.endsWith(",");

export const parseIngredient = (line: string): Ingredient => {
  const ingredient: Ingredient = {};

  let amountBuilder: string[] = [];
  let unitBuilder: string[] = [];
  let ingredientBuilder: string[] = [];
  const modifierBuilder: string[] = [];

  line.split(" ").forEach((part, i, arr) => {
    const remaining = arr.length - i - 1;
    if (!part) {
      return;
    }

    if (arr.length === 1) {
      // single ingredient with no unit, i.e. "salt"
      ingredient.ingredient = part;
      return;
    }

    if (arr.length === 1 && !isAmount(part)) {
      ingredient.unit = "1";
      ingredient.ingredient = part;
      return;
    }

    if (!ingredient.amount) {
      if (isAmount(part)) {
        amountBuilder.push(part);
        return;
      }
      ingredient.amount = amountBuilder.join(" ");
    }
    // NOTE: if it ends with a modifier or if it's the last one
    // it's a line without a unit, and this is
    if (!ingredient.unit && remaining > 0 && !endswithModifier(part)) {
      if (!unitBuilder.length) {
        unitBuilder.push(part);
        if (!/\d+-\w+/.test(part)) {
          ingredient.unit = unitBuilder.join(" ");
        }
        return;
      }
      unitBuilder.push(part);
      ingredient.unit = unitBuilder.join(" ");
      return;
    }

    if (!ingredient.ingredient) {
      if (endswithModifier(part)) {
        ingredientBuilder.push(part.replaceAll(",", ""));
        ingredient.ingredient = ingredientBuilder.join(" ");
        return;
      }
      ingredientBuilder.push(part);
      if (remaining === 0) {
        ingredient.ingredient = ingredientBuilder.join(" ");
        return;
      }
    }

    // if we get here, all other parts are filled, so it must
    // be more of the modifier.
    modifierBuilder.push(part);
    if (remaining === 0) {
      ingredient.modifier = modifierBuilder.join(" ");
    }
  });

  return ingredient;
};
