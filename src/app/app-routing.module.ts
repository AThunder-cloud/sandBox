import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './feature/notes/notes.component';
import { HomeComponent } from './feature/home/home.component';

const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'feature/notes',component:NotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
