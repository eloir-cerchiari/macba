import { Signal, effect } from "../core/signal";
import { MObject } from "./m-object";

export class MInputCheckbox extends MObject {
  constructor(id?: string) {
    super("input", id);
    this.getElement().setAttribute("type", "checkbox");
  }

  setSignal(sig: Signal<boolean>) {
    this.element.addEventListener("change", (e) => {
      const newValue = (e.target as HTMLInputElement).checked;
      const lastValue = sig();
      if (lastValue === newValue) {
        return;
      }
      sig.set(newValue);
    });

    effect(() => {
      const checked = sig();
      const currentValue = (this.element as HTMLInputElement).checked;
      if (checked === currentValue) {
        return;
      }
      (this.element as HTMLInputElement).checked = checked;
    });
  }
}
