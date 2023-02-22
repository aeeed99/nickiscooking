import { createFormControl, IFormControl } from "solid-forms";
import { Component, mergeProps } from "solid-js";

/** A single "step" in an ingredient.
 * @param control - Use for form control
 * @param onDone - callback for when text has been entered.
 */
export const StepInput: Component<{
  control?: IFormControl<string>;
  onDone?: (value: string) =>  boolean;
}> = (args) => {
  const props = mergeProps({ control: createFormControl("") }, args);

  const handleKeyPress = (e: any) => {
    if (e.key.toLowerCase() === "enter" && props.onDone) {
      e.preventDefault();
      const didUpdate = props.onDone(props.control.value);
      if (didUpdate) {
        props.control.setValue("");
      }
    }
  };

  return (
    <div>
      <label for="step" class="f6 b db mb2">
        <span class="normal black-60">
          Press <code>Enter</code> when finished with each step.
        </span>
      </label>
      <textarea
        id="step"
        name="comment"
        class="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
        aria-describedby="comment-desc"
        value={props.control.value}
        rows="1"
        cols="70"
        style="resize: none;"
        onKeyPress={handleKeyPress}
        onInput={(e) => props.control.setValue(e.currentTarget.value)}
      ></textarea>
    </div>
  );
};
