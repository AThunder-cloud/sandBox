import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './common/component/nav/nav.component';
import { HomeComponent } from './feature/home/home.component';
import { LoaderComponent } from './common/component/loader/loader.component';
import { SideBarComponent, SliderElement } from './common/component/side-bar/side-bar.component';
import { NotesComponent } from './feature/notes/notes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';

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
    AppRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule,
    ButtonModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
