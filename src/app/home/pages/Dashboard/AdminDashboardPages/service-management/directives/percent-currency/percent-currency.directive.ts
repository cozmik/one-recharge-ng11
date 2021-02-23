import {AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appPercentCurrency]'
})
export class PercentCurrencyDirective implements AfterViewInit{

  @Input() appPercentCurrency: boolean | number | string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }


  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    const containerSpan = this.renderer.createElement('span');
    if (this.appPercentCurrency || this.appPercentCurrency === 'currency'){
      const curr = this.renderer.createText('₦');
      this.renderer.appendChild(containerSpan, curr);
      this.renderer.insertBefore(element.parentNode, containerSpan, element);
    } else {
      const per = this.renderer.createText('%');
      this.renderer.appendChild(containerSpan, per);
      this.renderer.appendChild(element, containerSpan);
    }
  }
}
