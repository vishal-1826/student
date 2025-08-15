import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
   path: 'addstudent', 
   loadComponent: () => import('./addstudent/addstudent.component').then(m => m.AddstudentComponent),
   pathMatch: 'full'
  },

{
    path: 'edit/:id',
    loadComponent: () => import('./edit/edit.component').then(m => m.EditComponent),
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
