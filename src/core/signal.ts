/**
 * @description A simple reactive library for creating signals, computed values, and effects like angular.
 * @thanks Corbin Crutchley
 */

let ListenerComputed: (() => void) | null = null;

let ListenerEffect: (() => void) | null = null;

export interface Signal<T> {
  (): T;
  set(value: T): void;
}

export function signal<T>(value: T): Signal<T> {
  let _value: T = value;
  const subscribers = new Set<() => void>();

  function getValue() {
    if (ListenerComputed) {
      subscribers.add(ListenerComputed);
    }
    if (ListenerEffect) {
      subscribers.add(ListenerEffect);
    }
    return _value;
  }

  getValue.set = (value: T) => {
    _value = value;
    subscribers.forEach((fn) => fn());
  };

  return getValue;
}

export function computed<T>(fn: () => T) {
  let value!: T;
  ListenerComputed = () => {
    value = fn();
  };

  value = fn();

  ListenerComputed = null;

  function getValue() {
    return value;
  }

  return getValue;
}

export function effect<T>(fn: () => T) {
  ListenerEffect = fn;
  fn();
  ListenerEffect = null;
}
