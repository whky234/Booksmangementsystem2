import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Book } from '../Model/book';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

 Api_url='https://66cc29154290b1c4f19c2541.mockapi.io/api/books'
  constructor(private http:HttpClient,private snack:MatSnackBar) {

  }

  getbooks() :Observable<Book[]>{
  return this.http.get<Book[]>(`${this.Api_url}/books`).pipe(
    map(data => data || []),
    // catchError(this.handleError)
  );
  }

  getbookbyID(id:number):Observable<Book>{
   return this.http.get<Book>(`${this.Api_url}/books/${id}`).pipe(
    // catchError(error => this.handleError(error))
  );

  }
  Addbooks(book:Book) :Observable<Book[]>{
    return this.http.post<Book[]>(`${this.Api_url}/books`,book).pipe(
      catchError(error => this.handleError(error))
    );

  }

  updatebook(book:Book): Observable<Book>{
    return this.http.put<Book>(`${this.Api_url}/books/${book.id}`,book).pipe(
      catchError(error => this.handleError(error))
    );

  }

  deletebook(id:number):Observable<void>{
    return this.http.delete<void>(`${this.Api_url}/books/${id}`).pipe(
      // catchError(error => this.handleError(error))
    );

  }



  public handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something went wrong, please try again later.';

    if (error.status === 404) {
      errorMessage = 'The requested resource was not found.';
    } else if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }

    // Show error message using MatSnackBar
    this.snack.open(errorMessage, 'Close', {
      duration: 5000,
    });

    return throwError(() => new Error(errorMessage));
  }
}



