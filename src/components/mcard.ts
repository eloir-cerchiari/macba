import { MAppendableInterface } from "../base/mAppendableInterface";
import { MObject } from "../base/mobject";
import { mText, mTextType } from "../core/mtext";
import { MBox } from "./mbox";

export function mCard(id?: string) {
  return new MCard(id);
}

export class MCard implements MAppendableInterface {
  _box: MBox;
  cardTitle?: MBox;
  cardContent?: MBox;
  cardFooter?: MBox;

  constructor(id?: string) {
    this._box = new MBox(id);
    // add class to main box
    this._box.addClassStyle("m-card");
  }
  getElement(): HTMLElement {
    return this._box.getElement();
  }

  title(value: string | MObject): this {
    if (!this.cardTitle) {
      this.cardTitle = new MBox(this._box.element.id + "card-title");
      this.cardTitle.addClassStyle("m-card-title");
      this._box.appendChild(this.cardTitle);
    }

    if (typeof value === "string") {
      this.cardTitle.setChild(mText(value, mTextType.span)());
    }
    if (value instanceof MObject) {
      this.cardTitle.setChild(value);
    }
    return this;
  }

  content(content: MObject): this {
    if (!this.cardContent) {
      this.cardContent = new MBox(this._box.element.id + "card-content");
      this.cardContent.addClassStyle("m-card-content");
      this._box.appendChild(this.cardContent);
    }
    this.cardContent.setChild(content);
    return this;
  }

  footer(footer: MObject): this {
    if (!this.cardFooter) {
      this.createFooter();
    }
    this.cardFooter?.setChild(footer);
    return this;
  }
  private createFooter(): void {
    this.cardFooter = new MBox(this._box.element.id + "card-footer");
    this.cardFooter.addClassStyle("m-card-footer");
    this._box.appendChild(this.cardFooter);
  }
}
