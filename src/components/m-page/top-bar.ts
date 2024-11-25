import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MStaticText, mStaticText, mTextType } from "../../core/mtext";
import { MBox, mBox } from "../m-box";

export type MPageTopBarOptions = {
  id?: string;
  style?: string;
};

export function mPageTopBar(options: MPageTopBarOptions): MIPageTopBar {
  const btn = new MPageTopBar(options.id);
  if (!options.style) {
    options.style = "m-primary";
  }
  btn.getElement().classList.add(options.style);
  return btn;
}

export interface MIPageTopBar extends MAppendableInterface, MPageTopBar {}

class MPageTopBar implements MAppendableInterface {
  protected _box: MBox;
  protected _title!: MStaticText;
  protected _leftButton?: MAppendableInterface;
  protected _actions?: MAppendableInterface[];
  private actionsBox!: MBox;
  constructor(id?: string) {
    this._box = mBox(id);
    this._box.addClassStyle("m-page__top-bar");
    this.title = "";
    this._box.appendChild(this._title());
    this.createActionsBox();
  }

  set title(value: string) {
    if (!this._title) {
      this.createTitle(value);
      return;
    }

    this._title.update(value);
  }
  get title() {
    if (!this._title) {
      return "";
    }
    return this._title.text;
  }

  set leftButton(value: MAppendableInterface | undefined) {
    if (!value) {
      return;
    }
    value.getElement().classList.add("m-page__top-bar__left-icon-button");
    if (this._leftButton) {
      this._box.getElement().removeChild(this._leftButton.getElement());
    }
    this._leftButton = value;
    this._box.appendOnTop(this._leftButton.getElement());
  }

  get leftButton() {
    return this._leftButton;
  }

  set actions(value: MAppendableInterface[] | undefined) {
    if (!value) {
      return;
    }
    if (this.actions) {
      this.actions.forEach((action) => {
        this.actionsBox.getElement().removeChild(action.getElement());
      });
    }
    value.forEach((action) => {
      action.getElement().classList.add("m-page__top-bar__action");
      this.actionsBox.appendChild(action.getElement());
    });
  }

  private createTitle(title: string): MPageTopBar {
    this._title = mStaticText(
      title,
      mTextType.h6,
      this._box.element.id + "-title"
    );
    this._box.appendChild(this._title());
    return this;
  }

  private createActionsBox(): MBox {
    this.actionsBox = mBox(this._box.element.id + "-actions-box");
    this.actionsBox.addClassStyle("m-page__top-bar__actions-box");
    this._box.appendChild(this.actionsBox);
  }

  getElement() {
    return this._box.getElement();
  }
}
