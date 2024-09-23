import { MObject } from "../base/mobject";
import { mCard } from "../components/mcard";
import { mText } from "../core/mtext";
import { Signal } from "../core/signal";

export function demoCard(
  app: HTMLDivElement,
  name: Signal<string>,
  cardContentMText: () => MObject,
  length: number
) {
  for (let i = 0; i < length; i++) {
    const card = mCard("card");

    card
      .title("Card Title")
      .content(cardContentMText().clone())
      .footer(mText("Card Footer")());

    card.title(name());
    app.appendChild(card.getElement());
  }
}
