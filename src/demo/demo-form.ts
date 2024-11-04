import { mCheckBoxLabel } from "../components/form/m-checkbox-label";
import { mSelectLabel, MSelectLabel } from "../components/form/m-select-label";
import { MTextInputLabel } from "../components/form/mtext-input-label";
import { mBox } from "../components/m-box";
import { signal } from "../core/signal";

export function demoForm() {
  const box = mBox();
  const oneSignal = signal("as");
  const mTextInputLabel1 = new MTextInputLabel("Nome", oneSignal);
  const mTextInputLabel2 = new MTextInputLabel("Nome", oneSignal);
  const mTextInputLabel3 = new MTextInputLabel("Nome", oneSignal);

  const cbLblValue = signal(false);
  const mcbLabel = mCheckBoxLabel("Aceito os termos", cbLblValue);
  const mcbLabel2 = mCheckBoxLabel("Aceito os termos", cbLblValue);

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

  box.appendChild(mTextInputLabel1.getElement());
  box.appendChild(mTextInputLabel2.getElement());
  box.appendChild(mTextInputLabel3.getElement());
  box.appendChild(mcbLabel.getElement());
  box.appendChild(mcbLabel2.getElement());
  box.appendChild(selectLabel.getElement());
  return box;
}
