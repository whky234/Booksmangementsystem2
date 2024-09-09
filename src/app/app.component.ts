import { Component } from '@angular/core';
import { BooksService } from './SERVICES/books.service';
import { Book } from './Model/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from './SERVICES/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'booksmanagemensystem';
  searchResult: any;

constructor(private bookser:BooksService,private sanckBar:MatSnackBar){

}
book:Book[]=[]


}

