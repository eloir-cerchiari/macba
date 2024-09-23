import { MAppendableInterface } from "./mAppendableInterface";
import { MObject } from "./mobject";

export class MUlList extends MObject {
  constructor(id?: string) {
    super("ul", id);
  }

  addListItem(list: MLiList): void {
    this.getElement().appendChild(list.getElement());
  }
}

export class MLiList extends MObject implements MAppendableInterface {
  constructor(id?: string) {
    super("li", id);
  }
  appendChild(child: HTMLElement | MObject): void {
    const childElement = child instanceof MObject ? child.element : child;

    this.element.appendChild(childElement);
  }

  setChild(child: HTMLElement | MObject): void {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.appendChild(child);
  }
}
