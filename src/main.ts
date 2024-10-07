import { signal } from "./core/signal.ts";
import { demoTwoWay } from "./demo/input.ts";
import { demoTwoWayTextInputLabel } from "./demo/demo-minput-label.ts";
import { demoForm } from "./demo/demo-form.ts";
import { demoMSelect } from "./demo/demo-m-select.ts";

const name = signal("Eloir");
const sigInput = signal("22");
name.set("Eloir Jr.");
const app = document.getElementById("app") as HTMLDivElement;
// demoCard(app, name, sigInput, 3);
// demoListItem(app);
// demoBox(app, name);
demoTwoWay(app);

demoTwoWayTextInputLabel(app);

demoForm(app);

demoMSelect(app);

setInterval(() => {
  name.set("Eloir Sr. " + Date.now());
}, 1000);

setInterval(() => {
  sigInput.set(Date.now().toString());
}, 5000);
