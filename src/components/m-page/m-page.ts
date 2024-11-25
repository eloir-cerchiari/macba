import { MAppendableInterface } from "../../base/m-appendable-interface";
import { MButton } from "../../base/m-button";
import { MBox, mBox } from "../m-box";
import { MIPageTopBar, mPageTopBar } from "./top-bar";

export type MPageOptions = {
  id?: string;
  titleBar?: {
    title?: string;
    leftButton?: MButton;
    actions?: MAppendableInterface[];
  };
  mainContent?: MAppendableInterface;
};

export function mPage({ id, titleBar, mainContent }: MPageOptions): MPage {
  return new MPage({ id, titleBar, mainContent });
}

export interface MPageInterface extends MPage {}

class MPage implements MAppendableInterface {
  private props!: {
    fullPageBox: MBox;
    titleBar?: MIPageTopBar;
  };

  set titleBar(value: MIPageTopBar) {
    this.props.titleBar = value;
  }

  get titleBar(): MIPageTopBar {
    if (!this.props.titleBar) this.createTitleBar();
    return this.props.titleBar!;
  }

  constructor({ id, titleBar, mainContent }: MPageOptions) {
    this.createFullPage(id);
    if (titleBar) {
      this.createTitleBar(titleBar);
    }
    if (mainContent) {
      this.props.fullPageBox.appendChild(mainContent.getElement());
    }
  }

  private createFullPage(id?: string): MBox {
    this.props = { fullPageBox: mBox(id) };
    this.props.fullPageBox.addClassStyle("m-page__m-page-full-page");
    return this.props.fullPageBox;
  }

  private createTitleBar(titleBar?: {
    title?: string;
    leftButton?: MButton;
    actions?: MAppendableInterface[];
  }): MIPageTopBar {
    const id = this.props.fullPageBox.getElement().id + "-title-bar";
    this.props.titleBar = mPageTopBar({ id });

    if (titleBar) {
      const { title, leftButton, actions } = titleBar;

      if (title) {
        this.props.titleBar.title = title;
      }

      if (leftButton && this.props.titleBar) {
        this.props.titleBar.leftButton = leftButton;
      }

      if (actions && this.props.titleBar) {
        this.props.titleBar.actions = actions;
      }
    }

    this.props.fullPageBox.appendChild(this.props.titleBar);

    return this.props.titleBar;
  }

  getElement() {
    return this.props.fullPageBox.getElement();
  }

  appendChild(child: MAppendableInterface) {
    this.getElement().appendChild(child.getElement());
  }
}
