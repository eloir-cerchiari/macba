import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MButton } from "../../base/m-button";

export type mIconButtonOptions = {
  icon: string;
  onClick: () => void;
  id?: string;
  style?: string;
};
export function mIconButton(options: mIconButtonOptions): MIconButton {
  const { icon, onClick, id, style } = options;
  const btn = new MIconButton(icon, onClick, id);
  btn.button.addClassStyle(style || "m-primary");
  return btn;
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
