import { MAppendableInterface } from "../base/m-appendable-interface";
import { mIconButton } from "../components/form/m-icon-button";
import { mPage } from "../components/m-page/m-page";
import { demoForm } from "./demo-form";

export function demoPage(app: HTMLDivElement): MAppendableInterface {
  const titleBar = {
    title: "Main Page - Title bar",
    leftButton: mIconButton({
      icon: "menu",
      onClick: () => {},
      id: "main-button",
      style: "m-primary",
    }).button,
    actions: [
      mIconButton({
        icon: "search",
        onClick: () => {},
        id: "search-button",
        style: "m-primary",
      }).button,
      mIconButton({
        icon: "more_vert",
        onClick: () => {},
        id: "more-button",
        style: "m-primary",
      }).button,
    ],
  };

  const page = mPage({
    id: "main-page",
    titleBar,
    mainContent: demoForm(),
  });
  return page;
  // app.appendChild(page.getElement());
}
