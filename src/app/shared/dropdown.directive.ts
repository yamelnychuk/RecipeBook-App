import { Directive, ElementRef, HostBinding, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toogleMenu(){
    this.isOpen = !this.isOpen;
  }
  // isClicked: boolean = false;

  // constructor(private element: ElementRef, private renderer: Renderer2) { }

  // @HostListener('click') toggleMenu(){
  //   this.isClicked = !this.isClicked;
  //   console.log('clicked');
  //   if(this.isClicked){
  //     this.renderer.addClass(this.element.nativeElement, 'open');
  //   } else {
  //     this.renderer.removeClass(this.element.nativeElement, 'open');
  //   }
  // }
}
