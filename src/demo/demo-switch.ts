import { mSwitch } from "../components/form/m-switch";
import { signal } from "../core/signal";
import { demoText } from "./text";

export function demoSwitch(app: HTMLDivElement) {
  const sigValue = signal(false);

  const switcher = mSwitch(sigValue);

  app.appendChild(switcher.getElement());

  demoText(app, sigValue);
}
