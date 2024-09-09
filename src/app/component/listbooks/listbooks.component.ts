import { Book } from './../../Model/book';
import { Component, ComponentFactoryResolver, viewChild, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../SERVICES/books.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../SERVICES/loading.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ShowimagedialogComponent } from '../showimagedialog/showimagedialog.component';
import { MatDialog } from '@angular/material/dialog';
import { not } from 'rxjs/internal/util/not';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ConfirmdeleteComponent } from './confirmdelete/confirmdelete.component';

@Component({
  selector: 'app-listbooks',
  templateUrl: './listbooks.component.html',
  styleUrl: './listbooks.component.css'
})
export class ListbooksComponent {
  book:Book[]=[];
  isLoading = false;

  displayedColumns: string[] = ['id', 'Title', 'Author', 'Description','imageUrl','actions'];
  dataSource:MatTableDataSource<Book> = new MatTableDataSource<Book>();

  isConfirmVisible = false;
  bookIdToDelete: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('confirmDeleteContainer',{read:ViewContainerRef}) confirmdeletecontainer!:ViewContainerRef

isconirm:boolean=false;
  constructor(private booksser:BooksService,private router:Router,
    private dialog:MatDialog,
    private snackbar:MatSnackBar,
  private factoryresolver:ComponentFactoryResolver){

  }

  url:string=''
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
this.getbook();
// this.addbook();
// this.deletebook(16)

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort
  }




  getbook():void{
    this.isLoading=true
    this.booksser.getbooks().subscribe((res) => {
      this.book=res;
      this.dataSource.data=this.book;

      console.log(res)
      this.isLoading=false;
     }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, 'Close', { duration: 5000 });
    }
);
  }


  onedit(id:number):void{
  this.router.navigate(['/list/edit',id])
  }

  ondelete(id: number): void {
    this.bookIdToDelete = id;
    // this.isConfirmVisible = true;
    this.showconfirmdeletedialog()
  }

  handleConfirmDelete(): void {
    if (this.bookIdToDelete !== null) {
      this.booksser.deletebook(this.bookIdToDelete).subscribe(
        () => {
          this.snackbar.open('Book deleted successfully', 'Close', { duration: 3000 });
          this.getbook();
          this.bookIdToDelete = null;
        },
        (error) => {
          this.snackbar.open(error.message, 'Close', { duration: 5000 });
        }
      );
    }
    // this.isConfirmVisible = false;
    this.confirmdeletecontainer.clear()
  }

  handleCancelDelete(): void {
    // this.isConfirmVisible = false;
    // this.bookIdToDelete = null;
    this.confirmdeletecontainer.clear()
  }

  showconfirmdeletedialog(){
    this.confirmdeletecontainer.clear();

    const componentfactory=this.factoryresolver.resolveComponentFactory(ConfirmdeleteComponent);
    const componentref=this.confirmdeletecontainer.createComponent(componentfactory);
    componentref.instance.onConfirm=this.handleConfirmDelete.bind(this);
    componentref.instance.onCancel=this.handleCancelDelete.bind(this);

  }


  openImageDialog(imageUrl: string): void {
    this.dialog.open(ShowimagedialogComponent, {
      data: { imageUrl },
      width: '500px', // Adjust width as needed
      height:'500px',

    });
  }


}
