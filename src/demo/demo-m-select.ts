import { MSelect } from "../base/m-select";
import { signal } from "../core/signal";

export function demoMSelect(app: HTMLDivElement) {
  const value = signal({ value: "2", text: "Option 2" });
  const options = [
    { value: "1", text: "Option 1" },
    { value: "2", text: "Option 2" },
    { value: "3", text: "Option 3" },
    { value: "4", text: "Option 4" },
    { value: "5", text: "Option 5" },
  ];

  const select = new MSelect(options);
  app.appendChild(select.getElement());

  select.setSignal(value);

  const options2 = [
    { value: "1", text: "Option 1" },
    { value: "2", text: "Option 2" },
    { value: "3", text: "Option 3" },
    { value: "4", text: "Option 4" },
    { value: "5", text: "Option 5" },
  ];

  const select2 = new MSelect(options2);
  app.appendChild(select.getElement());

  select2.setSignal(value);
  app.appendChild(select2.getElement());
}
