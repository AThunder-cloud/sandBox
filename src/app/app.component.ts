import { Component, OnInit } from '@angular/core';
import { LoaderService } from './common/service/loader.service';
import { CommonEventService } from './common/service/common-event.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sandBox';
  showLoader:boolean=false;
  
  constructor(
    private loaderService:LoaderService,
    private cmevnt:CommonEventService,
    private primengConfig: PrimeNGConfig
  ){}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loaderService.showLoader$.subscribe((val) => {this.showLoader=val})
  }
  collapse(){
    this.cmevnt.collapse();
  }
}
