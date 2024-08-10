import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './common/component/nav/nav.component';
import { HomeComponent } from './feature/home/home.component';
import { LoaderComponent } from './common/component/loader/loader.component';
import { SideBarComponent, SliderElement } from './common/component/side-bar/side-bar.component';
import { NotesComponent } from './feature/notes/notes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotesComponent,
    HomeComponent,
    LoaderComponent,
    SideBarComponent,
    SliderElement
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
