import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MInputText } from "../../base/m-input-text";
import { MLabel } from "../../base/m-label";
import { Signal } from "../../core/signal";
import { MBox } from "../m-box";

export function mTextInputLabel(
  label: string,
  sigText: Signal<string>,
  id?: string
): MTextInputLabel {
  return new MTextInputLabel(label, sigText, id);
}

export class MTextInputLabel implements MAppendableInterface {
  _input: MInputText;
  _label: MLabel;
  _box: MBox;

  constructor(label: string, sigText: Signal<string>, id?: string) {
    this._input = new MInputText();
    this._input.setSignal(sigText);
    this._input.addClassStyle("m-text-input-label-input");
    this._input.getElement().setAttribute("placeholder", "");

    this._label = new MLabel();
    this._label.getElement().setAttribute("for", this._input.getElement().id);
    this._label.setValue(label);
    this._label.addClassStyle("m-text-input-label-label");

    this._box = new MBox();
    if (id) this._box.getElement().id = id;
    this._box.addClassStyle("m-text-input-label");

    this._box.appendChild(this._input);
    this._box.appendChild(this._label);
  }

  getElement() {
    return this._box.getElement();
  }
}
