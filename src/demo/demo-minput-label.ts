import { MTextInputLabel } from "../components/form/mtext-input-label";
import { signal } from "../core/signal";
import { demoText } from "./text";

export function demoTwoWayTextInputLabel(app: HTMLDivElement) {
  const who = signal("tes");

  const mtextInputLabel = new MTextInputLabel("Meu Nome é", who);

  app.appendChild(mtextInputLabel.getElement());
  demoText(app, who);
}
