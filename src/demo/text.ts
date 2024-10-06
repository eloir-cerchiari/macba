import { mText } from "../core/mtext";
import { effect } from "../core/signal";

export function demoText(app: HTMLDivElement, sigText: Signal<string>) {
  const text = mText("Text");
  effect(() => {
    text.update(sigText());
  });

  app.appendChild(text().getElement());
}
