import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";


@Component(
  {
    selector: 'component-with-content',
    standalone: true,
    imports:[
      MatCardModule,
      MatButton
    ],
    template: `
      <h4 class="text-center">
        With content component
      </h4>
      <ng-content></ng-content>
    `,
    styles:[

    ]
  }
)
export class WithContentComponent{

}