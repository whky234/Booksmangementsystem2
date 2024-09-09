import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatebooksComponent } from './component/createbooks/createbooks.component';
import { ListbooksComponent } from './component/listbooks/listbooks.component';

const routes: Routes = [
  {
    path:'create',component:CreatebooksComponent
  },

  {
    path:'list',component:ListbooksComponent
  },

  {
    path:'list/edit/:id',component:CreatebooksComponent
  },
  {
    path:'',redirectTo:'list',pathMatch:'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
