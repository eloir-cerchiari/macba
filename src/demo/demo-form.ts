import { mCheckBoxLabel } from "../components/m-checkbox-label";
import { MTextInputLabel } from "../components/mtext-input-label";
import { signal } from "../core/signal";
import { demoSwitch } from "./demo-switch";

export function demoForm(app: HTMLDivElement) {
  const oneSignal = signal("");
  const mTextInputLabel1 = new MTextInputLabel("Nome", oneSignal);
  const mTextInputLabel2 = new MTextInputLabel("Nome", oneSignal);
  const mTextInputLabel3 = new MTextInputLabel("Nome", oneSignal);

  const mcbLabel = mCheckBoxLabel("Aceito os termos", signal(false));
  const mcbLabel2 = mCheckBoxLabel("Aceito os termos", signal(false));
  app.appendChild(mTextInputLabel1.getElement());
  app.appendChild(mTextInputLabel2.getElement());
  app.appendChild(mTextInputLabel3.getElement());
  app.appendChild(mcbLabel.getElement());
  app.appendChild(mcbLabel2.getElement());
  demoSwitch(app);
}
