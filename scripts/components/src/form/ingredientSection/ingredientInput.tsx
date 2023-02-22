import { mergeProps, type Component, createSignal } from "solid-js";
import {
  createFormControl,
  createFormGroup,
  type IFormControl,
} from "solid-forms";
import { replaceFraction } from "../common";
import { Ingredient } from "../../types";

const style = {
  "min-width": "15em",
  display: "inline-block",
};

const randomPlaceholder = () => {
  const placeholders: [string, string, string, string][] = [
    ["1 1/2", "cup", "walnuts", "chopped"],
    ["3", "", "eggs", "beaten"],
    ["1", "15-oz can", "black beans", ""],
  ];
  const selected = Math.floor(Math.random() * placeholders.length);
  return placeholders[selected];
};

const inputsStyle = {
  display: "inline",
};

export const IngredientInput: Component<{
  control?: IFormControl<string>;
  name?: string;
  placeholder?: string;
  onDone?: (ingredient: Ingredient) => boolean;
}> = (args) => {
  // here we provide a default form control in case the user doesn't supply one
  const props = mergeProps({ control: createFormControl("") }, args);
  const group = createFormGroup({
    amount: createFormControl(""),
    unit: createFormControl(""),
    ingredient: createFormControl(""),
    modifier: createFormControl(""),
  });

  const [selectedPart, setSelectedPart] = createSignal<
    "amount" | "unit" | "ingredient" | "modifier" | null
  >(null);

  /** Attests to submit the ingredient field via callback for the
   *  parent to add to the running list of ingredients.
   *  Clears its own field if the ingredients were successfully updated.
   *  which gives the impression that it's the start of the "next" ingredient.
   */
  const processIngredient = () => {
    console.log('processing...')
    const newIngredient: Ingredient = {
      amount: group.controls.amount.value,
      ingredient: group.controls.ingredient.value,
      unit: group.controls.unit.value,
      modifier: group.controls.modifier.value,
    }
    const didUpdate = props.onDone?.(newIngredient);
    if (didUpdate) {
      group.controls.amount.setValue("");
      group.controls.ingredient.setValue("");
      group.controls.unit.setValue("");
      group.controls.modifier.setValue("");
    }
  };

  const onKeypress = (e) => {
    if (e.key?.toLowerCase() === "enter") {
      e.preventDefault();
      processIngredient();
      document.getElementById("kitchendb-input-amount")?.focus();
    }
  };

  const [amountSample, unitSample, ingredientSample, modifierSample] =
    randomPlaceholder();

  return (
    <div
      class="f5 pa3 b--dashed b--light-silver br3 bg-washed-blue b--light-blue"
      classList={{
        "is-invalid": !!props.control.errors,
        "is-touched": props.control.isTouched,
        "is-required": props.control.isRequired,
        "is-disabled": props.control.isDisabled,
      }}
    >
      <label for="amount" class="f6 db mb2">
        <span class={selectedPart() === "amount" ? "b" : ""}>Quantity</span> /{" "}
        <span class={selectedPart() === "unit" ? "b" : ""}>Unit</span> /{" "}
        <span class={selectedPart() === "ingredient" ? "b" : ""}>
          Ingredient
        </span>{" "}
        / <span class={selectedPart() === "modifier" ? "b" : ""}>Modifier</span>
      </label>
      <input
        style={inputsStyle}
        id="kitchendb-input-amount"
        class="input-reset ba b--black-20 pa2 mb2 db w-10"
        type="text"
        aria-describedby="name-desc"
        value={group.controls.amount.value}
        placeholder={amountSample}
        onFocus={() => setSelectedPart("amount")}
        onKeyPress={onKeypress}
        onInput={(e) =>
          group.controls.amount.setValue(replaceFraction(e.currentTarget.value))
        }
      ></input>
      <input
        style={{
          ...inputsStyle,
          "font-size": group.controls.unit.value.length > 5 ? "75%" : "100%",
          height: "100%",
        }}
        id="unit"
        class="input-reset ba b--black-20 pa2 mb2 db w-10"
        type="text"
        value={group.controls.unit.value}

        aria-describedby="name-desc"
        placeholder={unitSample}
        onFocus={() => setSelectedPart("unit")}
        onKeyPress={onKeypress}
        onInput={(e) => group.controls.unit.setValue(e.currentTarget.value)}
      ></input>
      <input
        style={inputsStyle}
        id="ingredient"
        class="input-reset ba b--black-20 pa2 mb2 db w-20"
        type="text"
        value={group.controls.ingredient.value}
        aria-describedby="name-desc"
        placeholder={ingredientSample}
        onFocus={() => setSelectedPart("ingredient")}
        onKeyPress={onKeypress}
        onInput={(e) =>
          group.controls.ingredient.setValue(e.currentTarget.value)
        }
      ></input>
      ,{" "}
      <input
        style={inputsStyle}
        id="modifier"
        class="input-reset ba b--black-20 pa2 mb2 db w-40"
        type="text"
        value={group.controls.modifier.value}
        aria-describedby="name-desc"
        placeholder={modifierSample}
        onFocus={() => setSelectedPart("modifier")}
        onKeyPress={onKeypress}
        onInput={(e) => group.controls.modifier.setValue(e.currentTarget.value)}
      ></input>
    </div>
  );
};
