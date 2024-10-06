import { MInputText } from "../base/m-input-text";
import { effect, signal, Signal } from "../core/signal";
import { demoText } from "./text";

export function demoInput(app: HTMLDivElement, sigText: Signal<string>) {
  const input = new MInputText();
  input.setSignal(sigText);
  app.appendChild(input.getElement());
}

export function demoTwoWay(app: HTMLDivElement) {
  const who = signal("tes");

  effect(() => {
    let newName = who();
    if (newName.length > 2) {
      // keep only first and last char, another are replaced by *
      newName =
        newName[0] +
        "*".repeat(newName.length - 2) +
        newName[newName.length - 1];
    }
    if (newName !== who()) who.set(newName);
  });

  demoInput(app, who);
  demoText(app, who);
}
