import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './feature/notes/notes.component';
import { HomeComponent } from './feature/home/home.component';
import { AuthGuard } from './common/service/auth.guard';
import { LoginComponent } from './common/component/login/login.component';

const routes: Routes = [
  {path:'' , component:HomeComponent,canActivate: [AuthGuard]},
  {path:'feature/notes',component:NotesComponent},
  {path:'login', component: LoginComponent},
  {path:'**', redirectTo:"/"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
