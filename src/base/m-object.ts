import { idGenerator } from "../utils/id-generator";

export class MObject {
  element: HTMLElement | HTMLInputElement;
  subscribers: Set<MObject> = new Set();

  constructor(elementType: string, private id?: string) {
    this.element = document.createElement(elementType);
    if (!this.id) {
      this.id = idGenerator();
    }
    this.element.id = this.id;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  addClassStyle(className: string) {
    this.element.classList.add(className);
  }

  clone() {
    const newElement = this.element.cloneNode(true) as HTMLElement;
    const newMObject = new MObject(newElement.tagName.toLowerCase());
    newMObject.element = newElement;

    this.subscribers.add(newMObject);
    return newMObject;
  }
}
