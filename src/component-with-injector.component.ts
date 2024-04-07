import { Component, inject } from '@angular/core';
import { VALUE_TOKEN } from './value-token';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'component-with-injector',
  standalone: true,
  imports: [MatChip],
  template: `
      <h4 class="text-center">
        With injection component
      </h4>
      <p class="flex justify-center gap-x-2 items-center text-2xl">
        <span>Token value:</span> 
        <mat-chip>{{value ?? 'No exist'}}</mat-chip>
      </p>
    `,
})
export class WithInjectorComponent {
  value = inject(VALUE_TOKEN, { optional: true });
}
