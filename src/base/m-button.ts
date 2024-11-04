import { MObject } from "./m-object";

export class MButton extends MObject {
  private buttonText: string = "";

  get text() {
    return this.buttonText;
  }
  set text(value) {
    this.buttonText = value;
    this.element.innerHTML = value;
  }

  constructor({
    id,
    text,
    onClick,
  }: {
    id?: string;
    text?: string;
    onClick?: () => void;
  }) {
    super("button", id);
    if (text) {
      this.text = text;
    }
    if (onClick) {
      this.onClick(onClick);
    }
  }

  onClick(cb: () => void) {
    this.element.addEventListener("click", cb);
  }
}
