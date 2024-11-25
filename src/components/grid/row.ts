import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MDiv } from "../../base/m-div";

export function row({
  id,
  childs,
  v,
  h,
}: {
  id?: string;
  childs?: MAppendableInterface[];
  v?: string;
  h?: string;
}) {
  const div = new MDiv(id);
  div.addClassStyle("row");
  childs?.forEach((child) => {
    div.appendChild(child);
  });

  if (v) {
    switch (v) {
      case "start":
        div.getElement().style.alignItems = "flex-start";
        break;
      case "end":
        div.getElement().style.alignItems = "flex-end";
        break;
      case "center":
        div.getElement().style.alignItems = "center";
        break;
      case "baseline":
        div.getElement().style.alignItems = "baseline";
        break;
      case "stretch":
        div.getElement().style.alignItems = "stretch";
        break;
      default:
        div.getElement().style.alignItems = "flex-start";
        break;
    }
  }
  if (h) {
    switch (h) {
      case "start":
        div.getElement().style.justifyContent = "flex-start";
        break;
      case "end":
        div.getElement().style.justifyContent = "flex-end";
        break;
      case "center":
        div.getElement().style.justifyContent = "center";
        break;
      case "space-between":
        div.getElement().style.justifyContent = "space-between";
        break;
      case "space-around":
        div.getElement().style.justifyContent = "space-around";
        break;
      case "space-evenly":
        div.getElement().style.justifyContent = "space-evenly";
        break;
      default:
        div.getElement().style.justifyContent = "flex-start";
        break;
    }
  }
  return div;
}