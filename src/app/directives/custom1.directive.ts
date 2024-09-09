import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustom1]'
})
export class Custom1Directive {

  @HostBinding('style.scale') scale:string=''
  @HostBinding('style.transition') transition:string=''


  @HostListener('mouseenter') onmouseenter(){


    this.scale='1.5'
    this.transition='.5s'

    }

    @HostListener('mouseleave') onmouseleave(){
      this.scale=''
       this.transition='.5s'


      }

}
