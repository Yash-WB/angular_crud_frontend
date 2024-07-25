import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: UserComponent},
  { path: 'adduser', component:FormComponent },
  { path: 'adduser/:id', component:FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
