import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
const routes: Routes = [
  {path:'', redirectTo:'/user/registration', pathMatch: 'full'},
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }