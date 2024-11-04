import { MLiList, MUlList } from "../base/m-ul-li-list";
import { MObject } from "../base/m-object";
import { MAppendableInterface } from "../base/m-appendable-interface";

export function mList(id?: string) {
  return new MList(id);
}

export class MList implements MAppendableInterface {
  _ul: MUlList;

  constructor(id?: string) {
    this._ul = new MUlList(id);
    this._ul.addClassStyle("m-list");
  }

  getElement(): HTMLElement {
    return this._ul.getElement();
  }

  addItem(obj: MObject): MList {
    const item = new MLiList();
    item.getElement().classList.add("m-list-item");
    item.appendChild(obj);
    this._ul.addListItem(item);
    return this;
  }

  addItems(objs: MObject[]): MList {
    objs.forEach((obj) => {
      this.addItem(obj);
    });
    return this;
  }
}
