import { Directive, Renderer2, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appCourseBorder]'
})
export class CourseBorderDirective implements OnInit {

  @Input('appCourseBorder') creationDate: number;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    if (this.creationDate <= Date.now() && this.creationDate >= Date.now() - 14 * 24 * 60 * 60 * 1000) {
      this.renderer.addClass(this.el.nativeElement, 'green-border');
    } else if (this.creationDate > Date.now()) {
      this.renderer.addClass(this.el.nativeElement, 'blue-border');
    }
  }

}
