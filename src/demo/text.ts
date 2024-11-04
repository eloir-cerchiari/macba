import { mStaticText } from "../core/mtext";
import { effect } from "../core/signal";

export function demoText(app: HTMLDivElement, sigText: Signal<string>) {
  const text = mStaticText("Text");
  effect(() => {
    text.update(sigText());
  });

  app.appendChild(text().getElement());
}
