import { Component, OnInit } from '@angular/core';
import { LoaderService } from './common/service/loader.service';
import { CommonEventService } from './common/service/common-event.service';
import { AuthService } from './common/service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'sandBox';
  showLoader:boolean=false;
  
  constructor(
    private loaderService:LoaderService,
    private cmevnt:CommonEventService,
    public authService: AuthService,
  ){}

  ngOnInit(): void {
    this.loaderService.showLoader$.subscribe((val) => {this.showLoader=val})
  }
  collapse(){
    this.cmevnt.collapse();
  }
}
