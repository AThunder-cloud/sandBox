import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonEventService } from '../../services/common-event.service';
import { LoaderService } from '../../services/loader.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { ToastModule } from 'primeng/toast';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  imports: [
    LoaderComponent,
    NavComponent,
    RouterOutlet,
    SideBarComponent,
    ToastModule
  ],
})
export class MainLayoutComponent implements OnInit{
  private loaderService:LoaderService = inject(LoaderService);
  private cmevnt:CommonEventService = inject(CommonEventService);
  public authService:AuthService = inject(AuthService);

  public title = 'sandBox';
  public showLoader:boolean=false;
  
  constructor(){}

  ngOnInit(): void {
    this.loaderService.showLoader$.subscribe((val) => {this.showLoader=val})
  }
  collapse(){
    this.cmevnt.collapse();
  }
}
