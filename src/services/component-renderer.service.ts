import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentRenderer } from '../types';

export const COMPONENT_RENDER = new InjectionToken(
  'app.component-renderer-service',
  {
    providedIn: 'root',
    factory: () => {
      const $component = new BehaviorSubject<
        ComponentRenderer<any> | undefined
      >(undefined);

      const set = <T>(component: ComponentRenderer<T>) => {
        $component.next(component);
      };

      return {
        current: $component.getValue(),
        componentChanged: $component.asObservable(),
        set,
      };
    },
  }
);
