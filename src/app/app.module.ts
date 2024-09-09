import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatebooksComponent } from './component/createbooks/createbooks.component';
import { ListbooksComponent } from './component/listbooks/listbooks.component';
import { LoadingcomponentComponent } from './component/loadingcomponent/loadingcomponent.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {  MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ShowimagedialogComponent } from './component/showimagedialog/showimagedialog.component';
import { CustomDirective } from './directives/custom.directive';
import { Custom1Directive } from './directives/custom1.directive';
import { MatSortModule } from '@angular/material/sort';
import { ConfirmdeleteComponent } from './component/listbooks/confirmdelete/confirmdelete.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatebooksComponent,
    ListbooksComponent,
    LoadingcomponentComponent,
    ShowimagedialogComponent,
    CustomDirective,
    Custom1Directive,
    ConfirmdeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,





  ],
  providers: [provideHttpClient(), provideAnimationsAsync()],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
