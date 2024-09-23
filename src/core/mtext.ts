import { MObject } from "../base/mobject";

export enum mTextType {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  p = "p",
  span = "span",
}

export function mText(
  text: string,
  type: mTextType = mTextType.span,
  id?: string
) {
  const span = new MObject(type, id);
  span.element.innerText = text;
  function getElement() {
    return span;
  }
  getElement.update = (text: string) => {
    span.element.innerText = text;
    span.subscribers.forEach((subscriber) => {
      subscriber.element.innerText = text;
    });
  };
  return getElement;
}
