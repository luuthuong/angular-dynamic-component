import { Component, Input, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChip } from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';

type CountAction = 'increase' | 'decrease' | 'reset';

@Component({
  selector: 'component-basic',
  standalone: true,
  imports: [MatButton, MatIcon, MatChip, MatIconButton],
  template: `
      <h4 class="text-center">
        Basic component
      </h4>
      <p>{{ content }}</p>
      <div class="flex justify-center ">
        <mat-chip class="h-[40px]">
          {{ current }}
        </mat-chip>
      </div>
      <div class="flex justify-center gap-x-1 mt-2">
          @for(action of actions; track action){
            <button mat-icon-button [color]="action.color" (click)="actionEvents[action.action]()">
              <mat-icon>{{ action.icon }}</mat-icon>
            </button>
          }
      </div>
    `,
})
export class BasicComponent {
  @Input()
  content: string = '';

  private readonly count = signal(0);

  get current() {
    return this.count();
  }

  readonly actions: {
    action: CountAction;
    icon: string;
    color: ThemePalette;
  }[] = [
    {
      action: 'increase',
      icon: 'arrow_upward',
      color: 'warn',
    },
    {
      action: 'decrease',
      icon: 'arrow_downward',
      color: 'primary',
    },
    {
      action: 'reset',
      icon: 'restart_alt',
      color: 'accent',
    },
  ];

  readonly actionEvents: Record<CountAction, () => void> = {
    decrease: () => {
      this.count.update((v) => v - 1);
    },
    increase: () => {
      this.count.update((v) => v + 1);
    },
    reset: () => {
      this.count.set(0);
    },
  };
}
