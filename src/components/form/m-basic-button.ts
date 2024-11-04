import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MButton } from "../../base/m-button";

export function mIconButton(icon: string, onClick: () => void, id?: string) {
  return new MIconButton(icon, onClick);
}

export class MIconButton implements MAppendableInterface {
  private readonly _button: MButton;
  private _icon: string;

  get icon() {
    return this._icon;
  }

  set icon(value) {
    this._icon = value;
    this._button.text = value;
  }

  get button() {
    return this._button;
  }

  constructor(icon: string, onClick: () => void, id?: string) {
    this._icon = icon;
    this._button = new MButton({
      text: icon,
      onClick,
      id,
    });

    this.button.addClassStyle("m-button");
    this.button.addClassStyle("m-icon-button");
    this.button.addClassStyle("micons");
  }
  getElement(): HTMLElement {
    return this.button.getElement();
  }
}
