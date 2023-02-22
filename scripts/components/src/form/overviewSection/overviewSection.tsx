import { Component, For, createSignal, Show, JSX } from "solid-js";
import { RecipeForm, dietValues, categoryValues, cuisineValues } from "../../types";
import { DietEnum } from "../../types/DietEnum";
import { CategoryEnum } from "../../types/DietEnum";
import { DIFFICULTY_DESCRIPTIONS } from "../../constants";

export const OverviewSection: Component<{
  recipe: RecipeForm;
  setRecipe: (newRecipe: RecipeForm) => void;
}> = ({ recipe, setRecipe }) => {
  const [isOpen, setIsOpen] = createSignal<{
    diets: boolean;
    categories: boolean;
    cuisine: boolean;
  }>({ diets: false, categories: false, cuisine: false });

  const ShowItem = ({ item }) => (
    <div
      class="ba b--dashed bw1 pa2 br3 pointer bg-washed-blue light-blue bold tc"
      onClick={() => setIsOpen({ ...isOpen(), [item]: true })}
    >
      Add {item[0].toUpperCase() + item.slice(1)}
    </div>
  );

  const InputList: Component<{
    values: any[];
    name: "categories" | "diet" | "cuisine";
    multi?: boolean;
  }> = ({ values, name, multi = true }) => (
    <>
      <fieldset id={name} class="bn">
        <legend class="fw7 mb2">{name[0].toUpperCase() + name.slice(1)}</legend>
        <For each={values}>
          {(value: string) => (
            <div class="flex items-center mb2">
              <input
                style="cursor: pointer;"
                class="mr2"
                type={multi ? "checkbox" : "radio"}
                id={value}
                value={value}
                checked={recipe.overview[name].includes(value)}
                onClick={() => {
                  if (!["diet", "categories", "cuisine"].includes(name)) {
                    return;
                  }
                  if (recipe.overview[name].includes(value)) {
                    const newSelects = recipe.overview[name].filter(
                      (i: string) => i !== value
                    );
                    return setRecipe({
                      ...recipe,
                      overview: {
                        ...recipe.overview,
                        [name]: newSelects,
                      },
                    });
                  }
                  setRecipe({
                    ...recipe,
                    overview: {
                      ...recipe.overview,
                      [name]: [...recipe.overview[name], value],
                    },
                  });
                }}
              />
              <label for={value} class="lh-copy" style="cursor: pointer;">
                {value}
              </label>
            </div>
          )}
        </For>
      </fieldset>
    </>
  );

  return (
    <div class="pa4 sans-serif black-80 block">
      <h2>Overview</h2>
      <div class="measure">
        <label for="name" class="f6 b db mb2">
          Name
        </label>
        <input
          id="name"
          type="text"
          class="input-reset ba b--black-20 pa2 mb2 db w-100"
          value={recipe.overview.name}
          onInput={(e) =>
            setRecipe({
              ...recipe,
              overview: {
                ...recipe.overview,
                name: e.currentTarget.value,
              },
            })
          }
        ></input>
        <small id="name-desc" class="f6 black-60 db mb2">
          Name of the recipe
        </small>
      </div>
      <div class="pt4">
        <label for="summary" class="f6 b db mb2">
          Summary <span class="normal black-60">(optional)</span>
        </label>
        <textarea
          id="summary"
          maxLength="280"
          class="input-reset ba b--black-20 pa2 mb2 db w-80"
          style="display: block;"
          value={recipe.overview.summary}
          onInput={(e) =>
            setRecipe({
              ...recipe,
              overview: {
                ...recipe.overview,
                summary: e.currentTarget.value,
              },
            })
          }
        ></textarea>
        <small id="comment-desc" class="f6 black-60">
          A short summary about the dish. This is usually minimal or
          non-existent (no personal stories!)
        </small>
      </div>
      <div class="fl w-30 pt4">
        <label for="prep-time" class="f6 b db mb2">
          Prep time <span class="normal black-60">(optional)</span>
        </label>
        <input
          id="prep-time"
          class="input-reset ba b--black-20 pa2 mb2 db w-30"
          type="number"
          min="0"
          value={recipe.overview.prepTime}
          onInput={(e) =>
            setRecipe({
              ...recipe,
              overview: {
                ...recipe.overview,
                prepTime: Number(e.currentTarget.value),
              },
            })
          }
        ></input>
      </div>
      <div class="fl w-70 pt4">
        <label for="cook-time" class="f6 b db mb2">
          Cook time <span class="normal black-60">(optional)</span>
        </label>
        <input
          id="cook-time"
          class="input-reset ba b--black-20 pa2 mb2 db w-11"
          type="number"
          min="0"
          max="999"
          value={recipe.overview.cookTime}
          onInput={(e) =>
            setRecipe({
              ...recipe,
              overview: {
                ...recipe.overview,
                cookTime: Number(e.currentTarget.value),
              },
            })
          }
        ></input>
      </div>
      <div class="h4">
        <div class="fl w-30 pa2">
          <div class="f6 b db mb2">
            Difficulty <span class="normal black-60">Select a dot</span>
          </div>
          <For each={recipe.overview.difficulty}>
            {(filled, i) => (
              <i
                class="fa-solid fa-circle f4"
                style={
                  (!filled ? "color: #ccc;" : "") +
                  "cursor: pointer; padding: 1px"
                }
                onClick={() => {
                  const p = i() + 1;
                  const { difficulty } = recipe.overview;
                  if (difficulty[i()] && !difficulty[i() + 1]) {
                    setRecipe({
                      ...recipe,
                      overview: {
                        ...recipe.overview,
                        difficulty: [false, false, false, false, false],
                      },
                    });
                  } else {
                    setRecipe({
                      ...recipe,
                      overview: {
                        ...recipe.overview,
                        difficulty: [0 < p, 1 < p, 2 < p, 3 < p, 4 < p],
                      },
                    });
                  }
                }}
              ></i>
            )}
          </For>
        </div>
        <div class="fl w-70 ph3 h4">
          {() => {
            const difficultyLevel = recipe.overview.difficulty.reduce(
              (a, b) => a + Number(b),
              0
            );
            if (difficultyLevel) {
              return (
                <div class="normal black-60 f6">
                  {DIFFICULTY_DESCRIPTIONS[difficultyLevel - 1]}
                </div>
              );
            }
          }}
        </div>
      </div>
      <div class="fl w-100">
        <div class="fl w-third pa2">
          <Show when={isOpen().diets} fallback={<ShowItem item="diets" />}>
            <InputList name="diet" values={dietValues} />
          </Show>
        </div>
        <div class="fl w-third pa2">
          <Show
            when={isOpen().categories}
            fallback={<ShowItem item="categories" />}
          >
            <InputList name="categories" values={categoryValues}></InputList>
          </Show>
        </div>
        <div class="fl w-third pa2">
          <Show when={isOpen().cuisine} fallback={<ShowItem item="cuisine" />}>
            <InputList name="cuisine" values={cuisineValues}></InputList>
          </Show>
        </div>
      </div>
    </div>
  );
};
