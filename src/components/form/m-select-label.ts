import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MLabel } from "../../base/m-label";
import { MSelect, MSelectOption } from "../../base/m-select";
import { Signal } from "../../core/signal";
import { MBox } from "../m-box";

export function mSelectLabel({
  label,
  sigValue,
  options,
  id,
}: {
  label: string;
  sigValue: Signal<MSelectOption | string>;
  options: MSelectOption[];
  id?: string;
}): MSelectLabel {
  const select = new MSelectLabel(label, sigValue, id);
  select._select.setOptions(options);

  return select;
}

export class MSelectLabel implements MAppendableInterface {
  _select: MSelect;
  _label: MLabel;
  _box: MBox;

  constructor(
    label: string,
    sigValue: Signal<MSelectOption | string>,
    id?: string
  ) {
    this._select = new MSelect();
    this._select.setSignal(sigValue);
    this._select.addClassStyle("m-select-lbl-select");

    this._label = new MLabel();
    this._label.getElement().setAttribute("for", this._select.getElement().id);
    this._label.setValue(label);
    this._label.addClassStyle("m-select-lbl-label");

    this._box = new MBox();
    if (id) this._box.getElement().id = id;
    this._box.addClassStyle("m-select-lbl");

    this._box.appendChild(this._select);
    this._box.appendChild(this._label);
  }

  getElement() {
    return this._box.getElement();
  }
}
