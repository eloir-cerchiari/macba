import { MBox } from "../components/m-box.ts";
import { mStaticText } from "../core/mtext.ts";
import { effect, Signal } from "../core/signal";

export function demoBox(app: HTMLDivElement, signalUpdates: Signal<string>) {
  const box = new MBox("box", {
    width: "200px",
    height: "100px",
    border: {
      width: "1px",
      style: "solid",
      color: "yellow",
    },
    flex: {
      direction: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  effect(() => {
    const text = `Hello, ${signalUpdates()} !`;

    box.setChild(mStaticText(text)());
  });

  app.appendChild(box.getElement());
}
