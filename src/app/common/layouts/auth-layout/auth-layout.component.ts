import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonEventService } from '../../services/common-event.service';
import { LoaderService } from '../../services/loader.service';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  imports: [
    RouterOutlet,
    ToastModule
  ],
})
export class AuthLayoutComponent implements OnInit {
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
