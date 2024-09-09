import { Component } from '@angular/core';
import { Book } from '../../Model/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../SERVICES/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-createbooks',
  templateUrl: './createbooks.component.html',
  styleUrl: './createbooks.component.css'
})
export class CreatebooksComponent {
  book: Book[] = [];
  bookform: FormGroup;
  isEditing: boolean = false;
  currentBookId: number | null = null;
  isLoading: boolean = false;  // Loading spinner flag
 url:string=''

  constructor(
    private booksser: BooksService,
    private formbuilder: FormBuilder,
    private router: Router,
    private activate: ActivatedRoute,
    private snackBar:MatSnackBar
  ) {
    this.bookform = this.formbuilder.group({
      Title: ['', Validators.required],
      Author: ['', Validators.required],
      Description: ['', Validators.required],
      imageUrl:['',Validators.required]
    });
  }

  ngOnInit(): void {


    const bookId = this.activate.snapshot.paramMap.get('id');
    if (bookId) {
      this.isEditing = true;
      this.currentBookId = +bookId;
      this.loadbooks(this.currentBookId);
    }
  }


  onslected(event: any): void {
    if (event.target.files) {
      const file = event.target.files[0];


   if(!file){
    this.bookform.patchValue({
      imageUrl: null
    });

    return
  }
    const allocatefile=['image/png','image/jpg','image/jpeg','image/avif']

    if(!allocatefile.includes(file.type)){
      this.snackBar.open('only JPG PNG JPEG file are allowed', 'Close', { duration: 5000 });
      this.bookform.patchValue({
        imageUrl: null
      });
      return

    }


    const filesize=2*1024*1024;

    if(file.size>filesize){
      this.snackBar.open('file size should not exceed than 2MB', 'Close', { duration: 5000 });
      this.bookform.patchValue({
        imageUrl: null
      });
      return
    }







      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.url = e.target.result;
        // Update the form with the image URL
        this.bookform.patchValue({
          imageUrl: this.url
        });
      };

      reader.readAsDataURL(file);
    }
  }





  loadbooks(id: number): void {
    this.isLoading = true;  // Start loading
    this.booksser.getbookbyID(id).subscribe((book: Book) => {
      this.bookform.patchValue({
        Title: book.Title,
        Author: book.Author,
        Description: book.Description,
        imageUrl:book.imageUrl
      });
      this.isLoading = false;  // Stop loading
    }, error => {
      this.isLoading = false;
      this.snackBar.open(error.message, 'Close', { duration: 5000 });
    }
);
  }



  addOrUpdateBook(): void {
    if (this.bookform.valid) {
      const newbook: Book = this.bookform.value;

      if (this.isEditing && this.currentBookId) {
        this.booksser.updatebook({ ...newbook, id: this.currentBookId }).pipe(
          switchMap(() => this.booksser.getbooks())).subscribe(() => {
            this.snackBar.open('updated successfully', 'Close', { duration: 5000 });
          this.router.navigate(['/list']);
        },
        error => {
          this.isLoading = false;
          this.snackBar.open(error.message, 'Close', { duration: 5000 });
        }
      );
      } else {
        this.booksser.Addbooks(newbook).pipe(
          switchMap(() => this.booksser.getbooks())).subscribe(() => {
            this.snackBar.open('Added successfully', 'Close', { duration: 5000 });

          this.router.navigate(['/list']);


        },
        error => {
          this.isLoading = false;
          this.snackBar.open(error.message, 'Close', { duration: 5000 });
        });
      }

      this.resetForm();
    }
  }

  ondelete(id: number): void {
    this.isLoading = true;  // Start loading
    this.booksser.deletebook(id).subscribe(() => {
      alert('Deleted');
      this.isLoading = false;  // Stop loading

    }, () => {
      this.isLoading = false;  // Stop loading on error
    });
  }

  resetForm(): void {
    this.bookform.reset();
    this.currentBookId = null;
    this.url=''
  }
}
