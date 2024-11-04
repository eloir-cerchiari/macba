import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MInputCheckbox } from "../../base/m-input-checkbox";
import { MLabel } from "../../base/m-label";
import { Signal } from "../../core/signal";
import { MBox } from "../m-box";

export function mCheckBoxLabel(
  label: string,
  sigValue: Signal<boolean>,
  id?: string
): MCheckBoxLabel {
  return new MCheckBoxLabel(label, sigValue, id);
}

export class MCheckBoxLabel implements MAppendableInterface {
  _input: MInputCheckbox;
  _label: MLabel;
  _box: MBox;

  constructor(label: string, sigValue: Signal<boolean>, id?: string) {
    this._input = new MInputCheckbox();
    this._input.setSignal(sigValue);
    this._input.addClassStyle("m-cb-lbl-input");

    this._label = new MLabel();
    this._label.getElement().setAttribute("for", this._input.getElement().id);
    this._label.setValue(label);
    this._label.addClassStyle("m-cb-lbl-label");

    this._box = new MBox();
    if (id) this._box.getElement().id = id;
    this._box.addClassStyle("m-cb-lbl");

    this._box.appendChild(this._input);
    this._box.appendChild(this._label);
  }

  getElement() {
    return this._box.getElement();
  }
}
