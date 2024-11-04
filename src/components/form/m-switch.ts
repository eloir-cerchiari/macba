import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MInputCheckbox } from "../../base/m-input-checkbox";
import { Signal } from "../../core/signal";
import { MBox } from "../m-box";

export function mSwitch(sigValue: Signal<boolean>, id?: string): MSwitch {
  return new MSwitch(sigValue, id);
}

export class MSwitch implements MAppendableInterface {
  _input: MInputCheckbox;
  _box: MBox;

  constructor(sigValue: Signal<boolean>, id?: string) {
    this._input = new MInputCheckbox();
    this._input.setSignal(sigValue);
    this._input.addClassStyle("m-switch-input");

    this._box = new MBox();
    if (id) this._box.getElement().id = id;
    this._box.addClassStyle("m-switch");

    this._box.appendChild(this._input);
  }

  getElement() {
    return this._box.getElement();
  }
}
