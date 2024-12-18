import { mList, MList } from "../components/m-list";
import { mStaticText } from "../core/mtext";

const dataItems = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
  "Item 7",
  "Item 8",
  "Item 9",
  "Item 10",
];

export function demoListItem(app: HTMLDivElement): MList {
  const mlist = mList("list");

  dataItems.forEach((item) => {
    mlist.addItem(mStaticText(item)());
  });
  return mlist;
  // app.appendChild(mlist.getElement());
}
