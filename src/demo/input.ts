import { MInput } from "../core/minput";
import { Signal } from "../core/signal";

export function createInput(sigText: Signal<string>): MInput {
  const input = new MInput();
  input.setSignal(sigText);
  return input;
}
