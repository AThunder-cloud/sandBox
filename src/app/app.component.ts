import { Component, OnInit } from '@angular/core';
import { LoaderService } from './common/service/loader.service';

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
  ){}

  ngOnInit(): void {
    this.loaderService.showLoader$.subscribe((val) => {this.showLoader=val})
    console.log(this.showLoader);
  }
}
