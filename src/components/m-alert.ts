import { MDiv } from "../base/m-div";
import { mStaticText, mTextType } from "../core/mtext";
import { MIconButton } from "./form/m-icon-button";

type malertType = {
  title?: string;
  message?: string;
  type?: "error" | "warning" | "info";
  id?: string;
  duration?: number;
  dismissible?: boolean;
};
export function malert({
  message,
  type,
  id,
  duration,
  dismissible,
}: malertType) {
  const div = new MDiv(id);
  div.addClassStyle("m-alert");
  div.addClassStyle(`m-alert-${type}`);

  const dismiss = () => {
    div.addClassStyle("m-alert--removed");
    div.getElement().addEventListener("transitionend", () => {
      div.getElement().remove();
    });
  };

  if (message) {
    const messageText = mStaticText(message, mTextType.p, id + "-message");
    div.appendChild(messageText());
  }
  if (dismissible) {
    const btnClose = new MIconButton(
      "close",
      () => {
        dismiss();
      },
      id + "-close"
    );
    btnClose.button.addClassStyle("m-alert__close");
    div.appendChild(btnClose);
  }

  if (duration) {
    const timeout = setTimeout(() => {
      dismiss();
      clearTimeout(timeout);
    }, duration);
  }

  return div;
}
