import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [

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
