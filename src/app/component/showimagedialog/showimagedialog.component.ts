import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-showimagedialog',
  templateUrl: './showimagedialog.component.html',
  styleUrl: './showimagedialog.component.css'
})
export class ShowimagedialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data:{imageUrl:string}){

  }
}
