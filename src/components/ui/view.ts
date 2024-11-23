import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MDiv } from "../../base/m-div";

export function view({
  id,
  childs,
}: {
  id?: string;
  childs?: MAppendableInterface[];
}) {
  const div = new MDiv(id);
  div.addClassStyle("container");
  childs?.forEach((child) => {
    div.appendChild(child);
  });

  return div;
}
