import { effect, Signal } from "../core/signal";
import { MAppendableInterface } from "../base/m-appendable-interface";

export class IfCtrl implements MAppendableInterface {
  private element: HTMLElement;
  private lastStatus = false;
  constructor(
    private condition: Signal<boolean>,
    private callback: () => HTMLElement
  ) {
    this.element = condition() ? callback() : document.createElement("span");

    this.lastStatus = this.condition();

    effect(() => {
      if (condition() !== this.lastStatus) {
        console.log("change");
        this.lastStatus = condition();
        this.updateVisibility();
      }
    });
  }

  private updateVisibility() {
    if (this.condition()) {
      const newElement = this.callback();
      this.element.replaceWith(newElement);
      this.element = newElement;
    } else {
      const spanElement = document.createElement("span");
      this.element.replaceWith(spanElement);
      this.element = spanElement;
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
