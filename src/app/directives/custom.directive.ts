import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustom]'
})
export class CustomDirective {


  @HostBinding('style.backgroundColor') backgroundColor:string=''
  @HostBinding('style.padding') padding:string=''
  @HostBinding('style.color') color:string=''
  @HostBinding('style.transition') transition:string=''
  @HostListener('mouseenter') onmouseenter(){
    this.backgroundColor='gray';
    this.color='white'
    this.transition='1s'

    }

    @HostListener('mouseleave') onmouseleave(){
      this.backgroundColor='';
      this.color=''
      this.transition='1s'

      }

}
