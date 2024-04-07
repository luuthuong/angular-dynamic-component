import { Injector } from '@angular/core';

export type ComponentRenderer<T> = {
  component: new (...args: any) => T;
  inputs?: {
    [x in keyof T]?: T[x];
  };
  content?: any[][];
  injector?: Injector;
};