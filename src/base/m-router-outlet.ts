import { MAppendableInterface } from "./m-appendable-interface";

export function mRouterOutlet(): MAppendableInterface {
  return {
    getElement: () => {
      return document.createElement("div");
    },
  };
}
