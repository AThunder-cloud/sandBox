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
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipModule } from 'primeng/chip';
import { RippleModule } from 'primeng/ripple';
import { DialogModule} from 'primeng/dialog';
import { LoginComponent } from './common/component/login/login.component'
import { AvatarModule } from 'primeng/avatar';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
// Firebase modules
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environment/environment'; // Ensure this file exists

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotesComponent,
    HomeComponent,
    LoaderComponent,
    SideBarComponent,
    SliderElement,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    TooltipModule,
    ColorPickerModule,
    InputTextareaModule,
    ChipModule,
    RippleModule,
    DialogModule,
    AvatarModule,
    PaginatorModule,
    AccordionModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // Provide Auth Service
    provideAuth(() => getAuth()),
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
