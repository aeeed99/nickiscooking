import { Show, For, mergeProps, type Component } from "solid-js";
import { createFormControl, type IFormControl } from "solid-forms";
import { replaceFraction } from "./common/replaceFraction";

const style = {
  "max-width": "4em",
  display: "inline-block",
};

export const UnitInput: Component<{
  control?: IFormControl<string>;
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
}> = (args) => {
  // here we provide a default form control in case the user doesn't supply one
  const props = mergeProps(
    { control: createFormControl(""), type: "text" },
    args
  );

  return (
    <div
      classList={{
        "is-invalid": !!props.control.errors,
        "is-touched": props.control.isTouched,
        "is-required": props.control.isRequired,
        "is-disabled": props.control.isDisabled,
      }}
    >
      <Show when={props.label}>
        <label for={props.name}>{props.label}</label>
      </Show>
      <input
        name={props.name}
        type={props.type}
        value={props.control.value}
        placeholder={props.placeholder}
        width="30"
        oninput={(e) => {
          props.control.setValue(replaceFraction(e.currentTarget.value));
        }}
        onblur={() => props.control.markTouched(true)}
        required={props.control.isRequired}
        disabled={props.control.isDisabled}
        style={style}
      />

      <Show when={props.control.isTouched && !props.control.isValid}>
        <For each={Object.values(props.control.errors ?? {})}>
          {(errorMsg: string) => <small>{errorMsg}</small>}
        </For>
      </Show>
    </div>
  );
};
