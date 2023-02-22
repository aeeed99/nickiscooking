import { Component, For } from "solid-js";
import { StepInput } from "./stepsInput";
import { RecipeForm } from "../../types";

export const StepsSection: Component<{
  recipe: RecipeForm;
  setRecipe: (newRecipe: RecipeForm) => void;
}> = ({ recipe, setRecipe }) => {
  const style = {
    display: "flex",
  };

  const appendStepInput = (text: string) => {
    const id = recipe.steps.length + 1;
    setRecipe({
      ...recipe,
      steps: [...recipe.steps, { text, id }],
    });
    return true;
  };
  const removeStep = (id: number) => {
    const updatedSteps = [...recipe.steps.slice(0, id), ...recipe.steps.slice(id+1)]
    return setRecipe({
      ...recipe,
      steps: updatedSteps,
    })
  }

  return (
    <div class="pa4 sans-serif black-80">
      <h2>Steps</h2>
      <span>
        <ol>
          <For each={recipe.steps}>
            {(step, i) => {
              const id = i();
              return <div style={style}>
                {" "}
                {i() + 1}. {step.text}{" "}
                <span
                style="cursor: pointer;"
                class="ph1"
                id={id.toString()}
                onClick={() => {
                  removeStep(i());
                }}
              >
                <i class="fa-regular fa-trash fa-xs"></i>
              </span>
              </div>
            }}
          </For>
        </ol>
        <div style={style}>
          <StepInput onDone={appendStepInput} />
        </div>
      </span>
    </div>
  );
};
