import { assert, describe, expect, it } from "vitest";
import { parseIngredient } from "../../../../src/form/common/parseIngredient";

describe("ingredientParsing", () => {
  it("Parses amount and ingredient", () => {
    const result = parseIngredient("2 eggs");
    expect(result).toEqual({
      ingredient: "eggs",
      amount: "2",
    });
  });

  it("Parses with modifier", () => {
    const result = parseIngredient("10 eggs, beaten");
    expect(result).toEqual({
      ingredient: "eggs",
      amount: "10",
      modifier: "beaten",
    });
  });

  it("Parses with unit", () => {
    const result = parseIngredient("3 cloves garlic");
    expect(result).toEqual({
      ingredient: "garlic",
      amount: "3",
      unit: "cloves",
    });
  });

  it("Parses with unit and modifier", () => {
    const result = parseIngredient("1 cup milk, warmed, stirred and frothed");
    expect(result).toEqual({
      amount: "1",
      unit: "cup",
      ingredient: "milk",
      modifier: "warmed, stirred and frothed",
    });
  });

  describe("additional cases", () => {
    it('"1 15-oz can black beans"', () => {
      const result = parseIngredient("1 15-oz can black beans");
      expect(result).toEqual({
        amount: "1",
        unit: "15-oz can",
        ingredient: "black beans",
      });
    });
  });
});
