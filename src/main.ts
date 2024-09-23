import "./style.css";
import { mText } from "./core/mtext.ts";
import { effect, signal } from "./core/signal.ts";
import { MBox } from "./components/mbox.ts";
import { demoCard } from "./demo/card.ts";
import { demoListItem } from "./demo/listItem.ts";
import { createInput } from "./demo/input.ts";

const app = document.querySelector<HTMLDivElement>("#app")!;

const name = signal("Eloir");

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
const cardContent = mText("Card Content");

const sigInput = signal("22");

// test signal
effect(() => {
  const text = `Hello, ${name()} ${sigInput()} !`;
  cardContent.update(text);

  box.setChild(mText(text)());
});

name.set("Eloir Jr.");

setInterval(() => {
  name.set("Eloir Sr. " + Date.now());
}, 200);

setInterval(() => {
  sigInput.set(Date.now().toString());
}, 5000);

demoCard(app, name, cardContent, 3);

const input = createInput(sigInput);
app.appendChild(input.getElement());

const demoItem = demoListItem();
app.appendChild(demoItem.getElement());
