import { MAppendableInterface } from "../../../base/m-appendable-interface";
import {
  mPasswordInputLabel,
  MTextInputLabel,
} from "../../../components/form/mtext-input-label";
// import { MBox } from "../../../components/m-box";
import { MCard } from "../../../components/m-card";
import { col } from "../../../components/grid/col";
import { row } from "../../../components/grid/row";
import { view } from "../../../components/grid/view";
import { signal } from "../../../core/signal";
// import { malert } from "../../../components/m-alert";
import { mPage, MPageInterface } from "../../../components/m-page/m-page";
// import { MButton } from "../../../base/m-button";
import { mBasicButton } from "../../../components/form/m-basic-button";
import { IfCtrl } from "../../../components/if-ctrl";

export class LoginPage implements MAppendableInterface {
  private page: MPageInterface;
  private showFormSignal = signal(false);
  constructor() {
    this.page = mPage({ id: "login-page" });

    this.page.appendChild(
      view({
        childs: [
          row({
            valign: "center",
            halign: "center",
            childs: [
              col({
                childs: [
                  new IfCtrl(this.showFormSignal, () => this.createCard()),
                ],
                gstr: "sm-11.md-6.lg-4",
              }),
            ],
          }),
        ],
      })
    );
    setTimeout(() => {
      this.showFormSignal.set(true);
    }, 2000);
  }

  private usernameSignal = signal("");
  private passwordSignal = signal("");

  private createCard(): HTMLElement {
    console.log("new card");
    const card = new MCard();
    card.title("Login");
    card.content(this.createForm());

    return card.getElement();
  }

  private createForm() {
    const box = col({
      dflex: true,

      childs: [
        new MTextInputLabel("Username", this.usernameSignal)!,
        mPasswordInputLabel("Password", this.passwordSignal)!,
        row({
          halign: "end",
          childs: [
            mBasicButton({
              title: "Login",
              onClick: () => {
                this.showFormSignal.set(false);
                setTimeout(() => {
                  this.showFormSignal.set(true);
                }, 2000);
              },
              style: "primary",
            }),
          ],
        }),
        row({}),
      ],
    });

    return box;
  }

  getElement(): HTMLElement {
    return this.page.getElement();
  }
}
