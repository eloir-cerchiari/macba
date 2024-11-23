import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MDiv } from "../../base/m-div";
type colOptions = {
  id?: string;
  sm?: number;
  smOfst?: number;
  md?: number;
  mdOfst?: number;
  lg?: number;
  lgOfst?: number;
  col?: number;
  ofst?: number;
  align?: string;
  childs?: MAppendableInterface[];
};

export function col(options?: colOptions) {
  const div = new MDiv(options?.id);

  options?.childs?.forEach((child) => {
    div.appendChild(child);
  });

  if (options?.sm) {
    div.addClassStyle("sm-" + options.sm);
  }
  if (options?.smOfst) {
    div.addClassStyle("sm-ofst" + options.smOfst);
  }
  if (options?.md) {
    div.addClassStyle("md-" + options.md);
  }
  if (options?.mdOfst) {
    div.addClassStyle("md-ofst" + options.mdOfst);
  }
  if (options?.lg) {
    div.addClassStyle("lg-" + options.lg);
  }
  if (options?.lgOfst) {
    div.addClassStyle("lg-ofst" + options.lgOfst);
  }
  if (options?.col) {
    div.addClassStyle("col-" + options.col);
  }
  if (options?.ofst) {
    div.addClassStyle("ofst" + options.ofst);
  }

  return div;
}
