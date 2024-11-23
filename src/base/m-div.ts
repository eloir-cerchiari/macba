import { MAppendableInterface } from "./m-appendable-interface";
import { MObject } from "./m-object";

export interface MBoxOption {
  width?: string;
  height?: string;
  backgroundColor?: string;
  border?: {
    width?: string;
    style?: string;
    color?: string;
  };
  flex?: {
    direction?: string;
    wrap?: string;
    justifyContent?: string;
    alignItems?: string;
    alignContent?: string;
    gap?: string;
  };
}

// wrap div in a class
export class MDiv extends MObject implements MAppendableInterface {
  private option: MBoxOption = {};

  constructor(id?: string, option?: MBoxOption) {
    super("div", id);
    this.setOption(option || {});
  }

  getElement(): HTMLElement {
    return this.element;
  }

  appendOnTop(child: HTMLElement | MObject | MAppendableInterface) {
    const firstChild = this.element.firstChild;
    if (!firstChild) {
      return this.appendChild(child);
    }
    if (child instanceof MObject) {
      this.element.insertBefore(child.element, firstChild);
      return;
    }

    if (child instanceof HTMLElement) {
      this.element.insertBefore(child, firstChild);
      return;
    }

    if (child.getElement) {
      this.element.insertBefore(child.getElement(), firstChild);
      return;
    }
  }

  appendChild(child: HTMLElement | MObject | MAppendableInterface) {
    if (child instanceof MObject) {
      this.element.appendChild(child.element);
      return;
    }

    if (child instanceof HTMLElement) {
      this.element.appendChild(child);
      return;
    }

    if (child.getElement) {
      this.element.appendChild(child.getElement());
      return;
    }
    return this;
  }

  setChild(child: HTMLElement | MObject) {
    // remove all children
    // TODO: check if this is the best way to do it, maybo only need set innerHTML to ""
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    // append new child
    this.appendChild(child);
  }

  setOption(option: MBoxOption) {
    const style = this.element.style;

    this.option = option;
    this.element.style.width = this.option.width || style.width;
    this.element.style.height = this.option.height || style.height;
    this.element.style.backgroundColor =
      this.option.backgroundColor || style.backgroundColor;
    this.element.style.borderWidth =
      this.option.border?.width || style.borderWidth;
    this.element.style.borderStyle =
      this.option.border?.style || style.borderStyle;
    this.element.style.borderColor =
      this.option.border?.color || style.borderColor;

    const flex = this.option.flex;

    if (flex && Object.values(flex).every((v) => v !== undefined)) {
      this.element.style.display = "flex";
      this.element.style.flexDirection = flex.direction || style.flexDirection;
      this.element.style.flexWrap = flex.wrap || style.flexWrap;
      this.element.style.justifyContent =
        flex.justifyContent || style.justifyContent;
      this.element.style.alignItems = flex.alignItems || style.alignItems;
      this.element.style.alignContent = flex.alignContent || style.alignContent;
      this.element.style.gap = flex.gap || style.gap;
    }
  }
}
