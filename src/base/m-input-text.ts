import { MObject } from "./m-object";
import { Signal, effect } from "../core/signal";

export class MInputText extends MObject {
  constructor(id?: string) {
    super("input", id);
    this.getElement().setAttribute("type", "text");
  }

  setSignal(sig: Signal<string>) {
    this.element.addEventListener("input", (e) => {
      const newValue = (e.target as HTMLInputElement).value;
      const lastValue = sig();
      if (lastValue === newValue) {
        return;
      }
      sig.set(newValue);
    });

    effect(() => {
      const text = sig();
      const currentValue = (this.element as HTMLInputElement).value;
      if (text === currentValue) {
        return;
      }
      (this.element as HTMLInputElement).value = text;
    });
  }
}
