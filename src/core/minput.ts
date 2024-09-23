import { MObject } from "../base/mobject";
import { effect, Signal } from "./signal";

export class MInput extends MObject {
  constructor(id?: string) {
    super("input", id);
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
