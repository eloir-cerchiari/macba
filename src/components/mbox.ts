import { MBoxOption, MDiv } from "../base/mdiv";

export class MBox extends MDiv {
  constructor(id?: string, option?: MBoxOption) {
    super(id, option);
  }
}

export function mBox(id?: string, option?: MBoxOption) {
  return new MBox(id, option);
}
