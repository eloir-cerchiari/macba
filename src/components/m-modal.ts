import { MAppendableInterface } from "../base/m-appendable-interface";
import { MDiv } from "../base/m-div";

export class MModal {
  _div: MDiv;
  private element!: HTMLElement;
  constructor(id?: string) {
    this.createElement(id);
  }

  private createElement(id?: string) {
    this._div = new MDiv(id);
    this.element = this._div.getElement();
    this.element.style.position = "fixed";
    this.element.style.top = "0";
    this.element.style.left = "0";
    this.element.style.width = "100%";
    this.element.style.height = "100%";
    this.element.style.backgroundColor = "rgba(0,0,0,0.4)";
    this.element.style.display = "flex";
  }

  show() {
    const body = document.querySelector("body");
    body?.appendChild(this._div.getElement());
  }

  destroy() {
    this._div.getElement().remove();
  }
}
