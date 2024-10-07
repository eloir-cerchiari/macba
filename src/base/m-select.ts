import { effect, Signal } from "../core/signal";
import { MObject } from "./m-object";

export type MSelectOption = {
  value: string;
  text: string;
};

export class MSelect extends MObject {
  private options: MSelectOption[] = [];
  constructor(options?: MSelectOption[], id?: string) {
    super("select", id);
    if (options) {
      this.setOptions(options);
    }
  }

  setOptions(options: MSelectOption[]) {
    this.options = options;
    this.options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.text = option.text;
      this.element.appendChild(optionElement);
    });
  }

  setSignal(sig: Signal<MSelectOption | string>) {
    this.element.addEventListener("change", (e) => {
      const newValue = (e.target as HTMLSelectElement).value;
      const lastValue = sig();

      const valLastValue =
        typeof lastValue === "string" ? lastValue : lastValue.value;
      if (valLastValue === newValue) {
        return;
      }
      if (typeof lastValue === "string") {
        sig.set(newValue);
      } else {
        const option = this.options.find((option) => option.value === newValue);
        if (!option) {
          return;
        }
        sig.set(option);
      }
    });

    effect(() => {
      const sigVal = sig();
      const value = typeof sigVal === "string" ? sigVal : sigVal.value;

      const currentValue = (this.element as HTMLSelectElement).value;
      if (value === currentValue) {
        return;
      }
      (this.element as HTMLSelectElement).value = value;
    });
  }
}
