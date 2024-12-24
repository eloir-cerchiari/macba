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
  dflex?: boolean;
  gap?: number;
  childs?: MAppendableInterface[];
  /**
   *
   * string of concatenated options
   *
   * @example
   * sm-11.md-6.lg-4.mdOfst-3.lgOfst-4.col-6.ofst-3.align-center
   */
  gstr?: string;
};

export function col(options?: colOptions) {
  const div = new MDiv(options?.id);

  options?.childs?.forEach((child) => {
    div.appendChild(child);
  });
  if (options?.gstr) {
    gridToOptions(options.gstr, options);
  }

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
  if (options?.dflex) {
    div.addClassStyle("col-flex");
  }
  if (options?.align) {
    div.addClassStyle("align-" + options.align);
  }
  if (options?.gap) {
    div.addClassStyle("gap-" + options.gap);
  }

  return div;
}

function gridToOptions(grid: string, options: colOptions) {
  const gridOptions = grid.split(".");
  gridOptions.forEach((option) => {
    const [key, value] = option.split("-");
    (options as any)[key] = parseInt(value);
  });
  return options;
}
