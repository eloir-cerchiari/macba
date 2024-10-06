import { MAppendableInterface } from "./m-appendable-interface";
import { MObject } from "./m-object";

export class MLabel extends MObject implements MAppendableInterface {
  constructor(id?: string, text?: string) {
    super("label", id);
    this.setValue(text || "");
  }

  setValue(text: string) {
    this.element.textContent = text;
  }
}
