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

export function mPasswordInputLabel(
  label: string,
  sigText: Signal<string>,
  id?: string
): MTextInputLabel {
  const input = new MTextInputLabel(label, sigText, id);
  input.input.getElement().setAttribute("type", "password");
  return input;
}

export class MTextInputLabel implements MAppendableInterface {
  input: MInputText;
  label: MLabel;
  box: MBox;

  constructor(label: string, sigText: Signal<string>, id?: string) {
    this.input = new MInputText();
    this.input.setSignal(sigText);
    this.input.addClassStyle("m-text-input-label-input");
    this.input.getElement().setAttribute("placeholder", "");

    this.label = new MLabel();
    this.label.getElement().setAttribute("for", this.input.getElement().id);
    this.label.setValue(label);
    this.label.addClassStyle("m-text-input-label-label");

    this.box = new MBox();
    if (id) this.box.getElement().id = id;
    this.box.addClassStyle("m-text-input-label");

    this.box.appendChild(this.input);
    this.box.appendChild(this.label);
  }

  getElement() {
    return this.box.getElement();
  }
}
