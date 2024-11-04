import { MObject } from "../base/m-object";
import { mCard } from "../components/m-card";
import { mStaticText } from "../core/mtext";
import { effect, Signal } from "../core/signal";

export function demoCard(
  app: HTMLDivElement,
  nameInput$: Signal<string>,
  counterInput$: Signal<string>,
  length: number
) {
  const cardContent = mStaticText("Card Content");

  effect(() => {
    const text = `Hello, ${nameInput$()} ${counterInput$()} !`;
    cardContent.update(text);
  });

  for (let i = 0; i < length; i++) {
    const card = mCard("card");

    card
      .title("Card Title")
      .content(cardContent().clone())
      .footer(mStaticText("Card Footer")());

    card.title(nameInput$());
    app.appendChild(card.getElement());
  }
}
