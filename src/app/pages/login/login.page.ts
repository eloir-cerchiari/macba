import { MAppendableInterface } from "../../../base/m-appendable-interface";
import { MTextInputLabel } from "../../../components/form/mtext-input-label";
import { MBox } from "../../../components/m-box";
import { MCard } from "../../../components/m-card";
import { col } from "../../../components/grid/col";
import { row } from "../../../components/grid/row";
import { view } from "../../../components/grid/view";
import { signal } from "../../../core/signal";
import { malert } from "../../../components/m-alert";
import { mPage, MPageInterface } from "../../../components/m-page/m-page";
import { MButton } from "../../../base/m-button";
import { mBasicButton } from "../../../components/form/m-basic-button";

export class LoginPage implements MAppendableInterface {
  private page: MPageInterface;

  constructor() {
    this.page = mPage({ id: "login-page" });
    this.page.appendChild(
      view({
        childs: [
          row({
            v: "center",
            h: "center",
            childs: [
              col({
                childs: [this.createCard()],
                grid: "sm-11.md-6.lg-4",
              }),
            ],
          }),
        ],
      })
    );
  }

  private usernameSignal = signal("");
  private passwordSignal = signal("");

  private createCard(): MCard {
    const card = new MCard();
    card.title("Login");
    card.content(this.createForm());

    return card;
  }

  private createForm() {
    const box = new MBox();
    box.appendChild(new MTextInputLabel("Username", this.usernameSignal))!;
    box.appendChild(new MTextInputLabel("Password", this.passwordSignal))!;
    box.appendChild(
      row({
        h: "end",
        childs: [
          mBasicButton({
            title: "Login",
            onClick: () => alert("login"),
            style: "primary",
          }),
        ],
      })
    );
    box.appendChild(
      malert({
        message: "Invalid username or password",
        type: "error",
        dismissible: true,
      })
    );

    return box;
  }

  getElement(): HTMLElement {
    return this.page.getElement();
  }
}
