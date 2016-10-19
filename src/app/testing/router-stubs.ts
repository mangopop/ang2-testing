import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})

//  the RouterLink directive expects an object with a button property indicating the mouse button that was pressed. The directive throws an error if the event object doesn't do this correctly.

export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
    // console.log(this.linkParams);
  }
}