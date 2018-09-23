import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[bgColor]'
})
export class HighlightDirective implements OnChanges {
  defaultColor =  'yellow';
  @Input() bgColor: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }
}
