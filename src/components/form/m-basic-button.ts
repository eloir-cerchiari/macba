import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MButton } from "../../base/m-button";

export type mIconButtonOptions = {
  title: string;
  onClick: () => void;
  id?: string;
  style?: string;
};
export function mBasicButton(options: mIconButtonOptions): MBasicButton {
  const { title, onClick, id, style } = options;
  const btn = new MBasicButton(title, onClick, id, style);
  return btn;
}

export class MBasicButton implements MAppendableInterface {
  private readonly _button: MButton;
  private _title: string;

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
    this._button.text = value;
  }

  get button() {
    return this._button;
  }

  constructor(title: string, onClick: () => void, id?: string, style?: string) {
    this._title = title;
    this._button = new MButton({
      text: title,
      onClick,
      id,
    });

    this.button.addClassStyle("m-button");
    this.button.addClassStyle("m-basic-button");
    if (style) {
      this.button.addClassStyle(`m-basic-button--${style}`);
    }
  }
  getElement(): HTMLElement {
    return this.button.getElement();
  }
}
