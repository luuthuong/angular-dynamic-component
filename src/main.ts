import {
  Component,
  inject,
  ViewContainerRef,
  Injector,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import 'zone.js';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { BasicComponent } from './component-basic.component';
import { WithContentComponent } from './component-with-content.component';
import { WithInjectorComponent } from './component-with-injector.component';
import { COMPONENT_RENDER } from './services';
import { NgIf, NgComponentOutlet, AsyncPipe } from '@angular/common';
import { ComponentRenderer } from './types';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { VALUE_TOKEN } from './value-token';

enum ComponentType {
  BASIC,
  WITH_CONTENT,
  WITH_INJECTOR,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonToggle,
    MatButtonToggleGroup,
    NgIf,
    NgComponentOutlet,
    AsyncPipe,
    MatCardModule,
    MatButton,
  ],
  template: `
    <h1 class="text-3xl font-bold text-center">
      Dynamic render component Angular App
    </h1>
    <div class="flex justify-center">
      <mat-button-toggle-group (change)="selectionChange($event)">
        <mat-button-toggle [value]="componentType.BASIC">Basic</mat-button-toggle>
        <mat-button-toggle [value]="componentType.WITH_CONTENT">With Content</mat-button-toggle>
        <mat-button-toggle [value]="componentType.WITH_INJECTOR">With Injector</mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    
    @if (componentRenderer.componentChanged | async; as c){
      <ng-container 
        *ngComponentOutlet="
          c.component;
          inputs: c.inputs,
          content: c.content,
          injector: c.injector
        ">
      </ng-container>
    }

    <ng-template #cardTpl>
      <p>
          The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
          A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
          bred for hunting.
      </p>
    </ng-template>
  `,
  styles: [
    `
      :host{
        display: block;
        width: 75vw;
        margin: 0 auto;
      }
    `,
  ],
})
export class App implements OnInit {
  readonly componentType = ComponentType;

  readonly componentRenderer = inject(COMPONENT_RENDER);

  private readonly viewContainerRef = inject(ViewContainerRef);

  private readonly injector = inject(Injector);

  @ViewChild('cardTpl', { static: true, read: TemplateRef })
  cardTpl!: TemplateRef<any>;

  private components?: Record<ComponentType, ComponentRenderer<any>>;

  constructor() {}

  ngOnInit(): void {
    const contentTemplate = [
      this.viewContainerRef.createEmbeddedView(this.cardTpl, null).rootNodes,
    ];
    this.viewContainerRef.clear();

    this.components = {
      [ComponentType.BASIC]: {
        component: BasicComponent,
        inputs: {
          content:
            'Angular Signals is a system that granularly tracks how and where your state is used throughout an application, allowing the framework to optimize rendering updates.',
        } as ComponentRenderer<BasicComponent>['inputs'],
      },
      [ComponentType.WITH_CONTENT]: {
        component: WithContentComponent,
        content: contentTemplate,
      },
      [ComponentType.WITH_INJECTOR]: {
        component: WithInjectorComponent,
        injector: Injector.create({
          providers: [
            {
              provide: VALUE_TOKEN,
              useValue: 99999,
            },
          ],
          parent: this.injector,
        }),
      },
    };
  }

  selectionChange({ value }: MatButtonToggleChange) {
    this.componentRenderer.set(this.components![value as ComponentType]);
  }
}

bootstrapApplication(App, {
  providers: [provideAnimationsAsync(), provideRouter([])],
});
