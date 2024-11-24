import { MAppendableInterface } from "../../../base/m-appendable-interface";
import { MTextInputLabel } from "../../../components/form/mtext-input-label";
import { MBox } from "../../../components/m-box";
import { MCard } from "../../../components/m-card";
import { col } from "../../../components/ui/col";
import { mPage, MPageInterface } from "../../../components/ui/m-page";
import { row } from "../../../components/ui/row";
import { view } from "../../../components/ui/view";
import { signal } from "../../../core/signal";

export class LoginPage implements MAppendableInterface {
  private page: MPageInterface;

  constructor() {
    this.page = mPage({ id: "login-page" });
    this.page.appendChild(this.createCard().getElement());
  }

  private usernameSignal = signal("");
  private passwordSignal = signal("");

  private createCard() {
    const card = new MCard();
    card.title("Login");
    card.content(this.createForm());
    const panel = view({
      childs: [
        row({
          v: "center",
          h: "center",
          childs: [
            col({
              childs: [card],
              grid: "sm-11.md-6.lg-4",
            }),
          ],
        }),
      ],
    });
    return panel;
  }

  private createForm() {
    const box = new MBox();
    box.appendChild(new MTextInputLabel("Username", this.usernameSignal))!;
    box.appendChild(new MTextInputLabel("Password", this.passwordSignal))!;

    return box;
  }

  getElement(): HTMLElement {
    return this.page.getElement();
  }
}
