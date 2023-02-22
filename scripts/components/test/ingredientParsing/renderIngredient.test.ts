import { assert, describe, expect, it } from "vitest";

import { renderIngredient } from "../../src/ingredientParsing/renderIngredient";

describe("renderIngredient", () => {
  it("Renders ingredient", () => {
    const result = renderIngredient({
      amount: "2",
      ingredient: "eggs",
    });
    expect(result).toBe("2 eggs");
  });

  it("Renders with modifier", () => {
    const result = renderIngredient({
      amount: "2",
      ingredient: "eggs",
      modifier: "beaten",
    });
    expect(result).toBe("2 eggs beaten");
  });
});
