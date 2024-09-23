export class ObjetoDestruivel {
  private value: number = 0;
  constructor(firstValue: number, updater: ObjPublisher) {
    updater.subscribe(this);
    this.value = firstValue;
  }

  updateValue(value: number) {
    console.log("Old value: ", this.value, "New value: ", value);
    this.value = value;
  }
}

export class ObjPublisher {
  private subscribers: ObjetoDestruivel[] = [];

  constructor() {}

  subscribe(obj: ObjetoDestruivel) {
    this.subscribers.push(obj);
  }

  updateSubscribers(value: number) {
    this.subscribers.forEach((subscriber) => subscriber.updateValue(value));
  }
}

const objPublisher = new ObjPublisher();
let obj1 = new ObjetoDestruivel(1, objPublisher);
let obj2 = new ObjetoDestruivel(2, objPublisher);

objPublisher.updateSubscribers(10);

obj1 = null;

objPublisher.updateSubscribers(20);
