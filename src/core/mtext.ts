import { MObject } from "../base/m-object";
import { effect, Signal } from "./signal";

export enum mTextType {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  p = "p",
  span = "span",
}

export interface MStaticText {
  (): MText;
  update(value: string): void;
  text: string;
}

export function mStaticText(
  text: string,
  type: mTextType = mTextType.span,
  id?: string
) {
  const span = new MText(text, type, id);
  function value() {
    return span;
  }
  value.update = (text: string) => {
    span.element.innerText = text;
    span.subscribers.forEach((subscriber) => {
      subscriber.element.innerText = text;
    });
  };

  Object.defineProperty(value, "text", {
    get: () => span.element.innerText,
    set: (text: string) => {
      value.update(text);
    },
    enumerable: true,
    configurable: true,
  });
  return value as MStaticText;
}

export class MText extends MObject {
  constructor(text: string, type: mTextType = mTextType.span, id?: string) {
    super(type, id);
    this.element.innerText = text;
  }

  update(text: string) {
    this.element.innerText = text;
    this.subscribers.forEach((subscriber) => {
      subscriber.element.innerText = text;
    });
  }

  setSignal(sig: Signal<string>) {
    effect(() => {
      const text = sig();
      const currentValue = this.element.innerText;
      if (text === currentValue) {
        return;
      }
      this.update(text);
    });
  }
}
