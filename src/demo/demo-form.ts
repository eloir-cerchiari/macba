import { mCheckBoxLabel } from "../components/m-checkbox-label";
import { mSelectLabel, MSelectLabel } from "../components/m-select-label";
import { MTextInputLabel } from "../components/mtext-input-label";
import { effect, signal } from "../core/signal";
import { demoSwitch } from "./demo-switch";

export function demoForm(app: HTMLDivElement) {
  const oneSignal = signal("");
  const mTextInputLabel1 = new MTextInputLabel("Nome", oneSignal);
  const mTextInputLabel2 = new MTextInputLabel("Nome", oneSignal);
  const mTextInputLabel3 = new MTextInputLabel("Nome", oneSignal);

  const mcbLabel = mCheckBoxLabel("Aceito os termos", signal(false));
  const mcbLabel2 = mCheckBoxLabel("Aceito os termos", signal(false));

  const options = [
    { value: "", text: "" },
    { value: "1", text: "teste 1" },
    { value: "2", text: "teste do 2" },
    { value: "3", text: "outro teste 3" },
  ];
  const sig = signal({ value: "", text: "" });
  const selectLabel = mSelectLabel({
    label: "Selecione",
    sigValue: sig,
    options,
  });

  effect(() => {
    console.log("value", sig());
  });

  app.appendChild(mTextInputLabel1.getElement());
  app.appendChild(mTextInputLabel2.getElement());
  app.appendChild(mTextInputLabel3.getElement());
  app.appendChild(mcbLabel.getElement());
  app.appendChild(mcbLabel2.getElement());
  app.appendChild(selectLabel.getElement());

  demoSwitch(app);
}
